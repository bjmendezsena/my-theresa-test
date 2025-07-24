import React from "react";
import { renderToString } from "react-dom/server";
import path, { dirname } from "path";
import { App } from "@/client/App";

export interface RenderOptions {
  title?: string;
  clientScriptPath?: string;
}

export function renderApp(options: RenderOptions = {}): string {
  const {
    title = "React SSR with Fastify",
    clientScriptPath = "/assets/main.js",
  } = options;

  // Renderizar la aplicación React a string
  const appHtml = renderToString(<App />);

  // Generar el HTML completo
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background-color: #ffffff;
          }
          #root {
            min-height: 100vh;
          }
        </style>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script type="module" src="${clientScriptPath}"></script>
      </body>
    </html>
  `;
}
