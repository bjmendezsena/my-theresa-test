import { useQuery, queryOptions } from '@tanstack/react-query';
import { QueryConfig, apiClient } from '@/lib';
import { MovieItem, MoviesFilter } from '@/types';
import { queryKeys } from '@/api/api-utils';

const url = '/discover/movie';

export type GetMoviesByCategoryResponse = {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
};

export const discoverMovies = ({ genres = [] }: MoviesFilter) => {
  return apiClient.get<unknown, GetMoviesByCategoryResponse>(url, {
    params: {
      with_genres: genres.join(','),
    },
  });
};

type UseDiscoverMoviesParams = {
  genres?: number[];
  config?: QueryConfig<typeof discoverMovies>;
};

export const discoverMoviesQueryOptions = ({
  genres = [],
  config,
}: UseDiscoverMoviesParams = {}) => {
  return queryOptions({
    queryFn: () => discoverMovies({ genres }),
    queryKey: queryKeys.discoverMovies({ genres }),
    ...config,
  });
};

export const useDiscoverMovies = ({
  genres = [],
  config,
}: UseDiscoverMoviesParams = {}) => {
  return useQuery(discoverMoviesQueryOptions({ genres, config }));
};
