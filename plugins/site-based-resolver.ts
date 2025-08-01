import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

interface SiteBasedResolverOptions {
  siteId?: string;
  extensions?: string[];
  fallbackOrder?: string[];
}

function findSiteSpecificFile(
  basePath: string,
  siteId: string | undefined,
  extensions: string[],
  fallbackOrder: string[]
): string | null {
  for (const ext of extensions) {
    const searchOrder: string[] = [];

    if (siteId) {
      searchOrder.push(`${basePath}.${siteId}.${ext}`);
    }

    searchOrder.push(`${basePath}.${ext}`);

    if (!siteId) {
      for (const fallback of fallbackOrder) {
        searchOrder.push(`${basePath}.${fallback}.${ext}`);
      }
    }

    for (const filePath of searchOrder) {
      if (fs.existsSync(filePath)) {
        return filePath;
      }
    }
  }

  return null;
}
export function siteBasedResolver(
  options: SiteBasedResolverOptions = {}
): Plugin {
  const siteId = options.siteId;
  const extensions = options.extensions || [
    'tsx',
    'ts',
    'jsx',
    'js',
    'scss',
    'css',
  ];
  const fallbackOrder = options.fallbackOrder || ['mt', 'yoox'];

  return {
    name: 'site-based-resolver',
    enforce: 'pre',
    resolveId(id, importer) {
      if (!importer || id.startsWith('node:') || id.startsWith('\0')) {
        return null;
      }

      // Resolver rutas absolutas y relativas
      let resolvedPath: string;

      if (id.startsWith('@/')) {
        // Alias @/ apunta a src/
        resolvedPath = path.resolve(process.cwd(), 'src', id.slice(2));
      } else if (id.startsWith('./') || id.startsWith('../')) {
        // Paths relativos
        resolvedPath = path.resolve(path.dirname(importer), id);
      } else {
        return null;
      }

      // Si ya tiene extensión, no procesar
      if (path.extname(resolvedPath)) {
        return null;
      }

      // Buscar archivo específico del site
      const found = findSiteSpecificFile(
        resolvedPath,
        siteId,
        extensions,
        fallbackOrder
      );

      if (found) {
        return found;
      }

      return null;
    },
  };
}

/**
 * Función helper para configurar el plugin
 */
export function createSiteConfig(siteId?: string) {
  return {
    siteId: siteId || undefined,
    extensions: ['tsx', 'ts', 'jsx', 'js', 'scss', 'css'],
    fallbackOrder: ['mt', 'yoox'],
  };
}
