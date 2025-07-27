import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchRoutes } from 'react-router-dom';
import { QueryClientProvider, dehydrate } from '@tanstack/react-query';
import { routes } from '@/routes';
import { getQueryClient } from '@/lib';
import { App } from './App';
import './index.scss';

export async function render(url: string) {
  const matches = matchRoutes(routes, url);
  const queryClient = getQueryClient();
  if (matches) {
    await Promise.all(
      matches.map(async ({ route, params }) => {
        // @ts-expect-error
        if (route.Component && route.Component.prefetch) {
          // @ts-expect-error
          await route.Component.prefetch(queryClient, params);
        }
      })
    );
  }
  const dehydratedState = dehydrate(queryClient);

  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
  return {
    appHtml,
    dehydratedState,
  };
}
