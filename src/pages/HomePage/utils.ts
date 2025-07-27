import { PrefetchFunction } from '@/types';
import { getCategoriesQueryOptions } from '@/features/categories';
import { discoverMoviesQueryOptions } from '@/features/movies';

export const prefetchHomeData: PrefetchFunction = async queryClient => {
  await queryClient.prefetchQuery(getCategoriesQueryOptions());

  const queryData = queryClient.getQueryData(
    getCategoriesQueryOptions().queryKey
  );

  const { genres = [] } = queryData || {};

  await Promise.all(
    genres.map(genre =>
      queryClient.prefetchQuery(
        discoverMoviesQueryOptions({ genres: [genre.id] })
      )
    )
  );

  const threeGenresData = genres.map(genre =>
    queryClient.getQueryData(
      discoverMoviesQueryOptions({ genres: [genre.id] }).queryKey
    )
  );

  queryClient.setQueryData(
    getCategoriesQueryOptions().queryKey,
    (oldData: any) => ({
      ...oldData,
      genres: genres.map((genre, index) => ({
        ...genre,
        movies: threeGenresData[index]?.results || [],
      })),
    })
  );

  return { queryData, queryClient };
};
