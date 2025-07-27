import type { Request, Response, NextFunction, Express } from 'express';
import fs from 'fs/promises';
import path, { dirname } from 'path';
import express from 'express';
import { DehydratedState } from '@tanstack/react-query';
import compression from 'compression';
import serveStatic from 'serve-static';
import { createServer as createViteServer, type ViteDevServer } from 'vite';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const resolve = (p: string): string => path.resolve(__dirname, p);

type RenderFunctionReturn = {
  appHtml: string;
  dehydratedState?: DehydratedState;
};
interface ServerConfig {
  vite?: ViteDevServer;
  render: (url: string) => Promise<RenderFunctionReturn>;
  template: string;
}

class ServerError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'ServerError';
  }
}

async function loadTemplate(): Promise<string> {
  const templatePath = isProd
    ? resolve('client/index.html')
    : resolve('index.html');

  try {
    return await fs.readFile(templatePath, 'utf-8');
  } catch (error) {
    throw new ServerError(
      `Failed to load template from ${templatePath}: ${error}`,
      500
    );
  }
}

async function loadProductionRenderer(): Promise<
  (url: string) => Promise<RenderFunctionReturn>
> {
  const possiblePaths = [
    path.join(__dirname, './server/entry-server.js'),
    path.join(__dirname, './dist/server/entry-server.js'),
    path.join(__dirname, './build/server/entry-server.js'),
  ];

  for (const buildPath of possiblePaths) {
    try {
      const serverModule = await import(buildPath);
      if (serverModule.render) {
        console.log(`✅ Loaded production renderer from: ${buildPath}`);
        return serverModule.render;
      }
    } catch (error) {
      console.warn(
        `⚠️  Failed to load from ${buildPath}:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  throw new ServerError('No valid production server module found', 500);
}

async function loadDevelopmentRenderer(
  vite: ViteDevServer
): Promise<(url: string) => Promise<RenderFunctionReturn>> {
  const devBuildPath = path.join(__dirname, './src/entry-server.tsx');

  try {
    const serverModule = await vite.ssrLoadModule(devBuildPath);
    if (!serverModule.render) {
      throw new Error('render function not found in development module');
    }
    return serverModule.render;
  } catch (error) {
    throw new ServerError(`Failed to load development renderer: ${error}`, 500);
  }
}

async function loadRenderFunction(
  vite?: ViteDevServer
): Promise<(url: string) => Promise<RenderFunctionReturn>> {
  if (isProd) {
    return await loadProductionRenderer();
  } else {
    return await loadDevelopmentRenderer(vite!);
  }
}

async function setupViteDevServer(): Promise<ViteDevServer | undefined> {
  if (isProd) return undefined;

  try {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      logLevel: isTest ? 'error' : 'info',
      root: process.cwd(),
      optimizeDeps: {
        include: [],
        force: false,
      },
    });

    console.log('✅ Vite dev server initialized');
    return vite;
  } catch (error) {
    throw new ServerError(`Failed to create Vite dev server: ${error}`, 500);
  }
}

function setupStaticAssets(app: Express): void {
  const assetsDir = resolve('public');
  const staticMiddleware = express.static(assetsDir, {
    maxAge: isProd ? '1y' : '0',
    etag: true,
    lastModified: true,
  });

  app.use(staticMiddleware);
  app.use('/public', staticMiddleware);

  if (isProd) {
    app.use(
      compression({
        filter: (req, res) => {
          if (req.headers['x-no-compression']) {
            return false;
          }
          return compression.filter(req, res);
        },
        level: 6,
        threshold: 1024,
      })
    );

    app.use(
      serveStatic(resolve('client'), {
        index: false,
        maxAge: '1d',
        etag: true,
      })
    );
  }
}

function setupSSRHandler(app: Express, config: ServerConfig): void {
  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;
    const startTime = Date.now();

    try {
      let template = config.template;

      if (!isProd && config.vite) {
        template = await config.vite.transformIndexHtml(url, template);
      }

      const { appHtml, dehydratedState } = await config.render(url);
      const html = template
        .replace('<!--app-html-->', appHtml)
        .replace(
          '<!--dehydrated-state-->',
          `<script>window.__REACT_QUERY_STATE__=${JSON.stringify(dehydratedState || {})}</script>`
        );

      res.set({
        'Content-Type': 'text/html; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        ...(isProd && {
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'Cache-Control': 'public, max-age=300', // 5 minutes
        }),
      });

      const renderTime = Date.now() - startTime;
      console.log(`📄 Rendered ${url} in ${renderTime}ms`);

      res.status(200).end(html);
    } catch (error: any) {
      console.error(`❌ SSR Error for ${url}:`, error);

      if (!isProd && config.vite) {
        config.vite.ssrFixStacktrace(error);
      }

      next(error);
    }
  });
}

function setupErrorHandler(app: Express): void {
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || 500;
    const message = isProd ? 'Internal Server Error' : error.message;

    console.error('🚨 Server Error:', {
      url: req.originalUrl,
      method: req.method,
      error: error.message,
      stack: error.stack,
    });

    if (res.headersSent) {
      return next(error);
    }

    res.status(statusCode).json({
      error: message,
      ...((!isProd || isTest) && {
        stack: error.stack,
        details: error,
      }),
    });
  });

  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not Found',
      path: req.originalUrl,
    });
  });
}

async function createServer(): Promise<Express> {
  console.log(
    `🚀 Starting server in ${isProd ? 'production' : 'development'} mode...`
  );

  try {
    const app = express();

    if (isProd) {
      app.set('trust proxy', 1);
    }

    const vite = await setupViteDevServer();
    if (vite) {
      app.use(vite.middlewares);
    }

    setupStaticAssets(app);

    const [template, render] = await Promise.all([
      loadTemplate(),
      loadRenderFunction(vite),
    ]);

    const config: ServerConfig = { vite, render, template };

    setupSSRHandler(app, config);

    setupErrorHandler(app);

    console.log('✅ Server configuration completed');
    return app;
  } catch (error) {
    console.error('💥 Failed to create server:', error);
    process.exit(1);
  }
}

async function startServer(): Promise<void> {
  try {
    const app = await createServer();

    const server = app.listen(PORT, HOST, () => {
      console.log(`🌟 Server running at http://${HOST}:${PORT}`);
      console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔧 Process ID: ${process.pid}`);
    });

    const gracefulShutdown = (signal: string) => {
      console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

      server.close(err => {
        if (err) {
          console.error('❌ Error during server shutdown:', err);
          process.exit(1);
        }

        console.log('✅ Server shut down gracefully');
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error('⏰ Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    process.on('uncaughtException', error => {
      console.error('💥 Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
