import { useQuery, queryOptions } from '@tanstack/react-query';
import { QueryConfig, apiClient } from '@/lib';
import { DetailedMovie } from '@/features/movies';
import { queryKeys } from '@/features/categories/api/api-utils';

const url = '/movie';

export const getMovie = (movieId: string) => {
  return apiClient.get<unknown, DetailedMovie>(`${url}/${movieId}`);
};

export const getMovieQueryOptions = (
  movieId: string,
  config?: QueryConfig<typeof getMovie>
) => {
  return queryOptions({
    queryFn: () => getMovie(movieId),
    queryKey: queryKeys.getMovie(movieId),
    enabled: !!movieId,
    ...config,
  });
};

export const useGetMovie = (
  movieId: string,
  config?: QueryConfig<typeof getMovie>
) => {
  return useQuery(getMovieQueryOptions(movieId, config));
};
