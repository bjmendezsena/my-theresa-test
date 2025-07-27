import { QueryClient } from '@tanstack/react-query';

export type PrefetchFunction = (
  queryClient: QueryClient,
  params?: Record<string, any>
) => Promise<{
  queryClient: QueryClient;
  queryData?: any;
}>;
