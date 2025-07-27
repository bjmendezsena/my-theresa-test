import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { getQueryClient } from '@/lib';
import { App } from '@/App';

declare global {
  interface Window {
    __REACT_QUERY_STATE__?: unknown;
  }
}

const container = document.getElementById('app');
const queryClient = getQueryClient();
const FullApp = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={window.__REACT_QUERY_STATE__ || {}}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HydrationBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);

if (import.meta.hot || !container?.innerText) {
  const root = createRoot(container!);
  root.render(<FullApp />);
} else {
  hydrateRoot(container!, <FullApp />);
}
