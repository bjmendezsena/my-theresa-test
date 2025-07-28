import { PrefetchFunction } from '@/types';
import { getMovieQueryOptions } from '@/api';

export const prefetchMovieData: PrefetchFunction = async (
  queryClient,
  params
) => {
  const movieId = params?.id || '';

  await queryClient.prefetchQuery(getMovieQueryOptions(movieId));
  const queryData = queryClient.getQueryData(
    getMovieQueryOptions(movieId).queryKey
  );
  return { queryData, queryClient };
};
