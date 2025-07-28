import { ReactElement, PropsWithChildren, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RootProvider } from '@/provider';

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: true,
    },
  },
});

export const AllProviders = ({ children }: PropsWithChildren) => {
  return (
    <MemoryRouter>
      <RootProvider>
        <QueryClientProvider client={testQueryClient}>
          {children}
        </QueryClientProvider>
      </RootProvider>
    </MemoryRouter>
  );
};

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions
) => render(ui, { wrapper: AllProviders, ...options });

export const renderHookWithProviders = (callback: any, options?: any) => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AllProviders>{children}</AllProviders>
  );
  return renderHook(callback, { wrapper, ...options });
};
export { default as userEvent } from '@testing-library/user-event';
export * from '@testing-library/react';
export * from 'vitest';
