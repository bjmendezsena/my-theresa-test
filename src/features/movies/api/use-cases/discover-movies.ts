import { useQuery } from '@tanstack/react-query';
import { QueryConfig, apiClient } from '@/lib';
import { Movie, MoviesFilter } from '@/features/movies';
import { queryKeys } from '@/features/categories/api/api-utils';

const url = '/discover/movie?with_genres=18';

export type GetMoviesByCategoryResponse = {
  page: number;
  results: Movie[];
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

export const useDiscoverMovies = ({
  genres = [],
  config,
}: UseDiscoverMoviesParams = {}) => {
  return useQuery({
    queryFn: () => discoverMovies({ genres }),
    queryKey: queryKeys.discoverMovies({ genres }),
    ...config,
  });
};
