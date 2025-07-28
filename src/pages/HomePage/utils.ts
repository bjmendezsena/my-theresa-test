import { PrefetchFunction } from '@/types';
import { getCategoriesQueryOptions, discoverMoviesQueryOptions } from '@/api';

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

  genres.map(genre =>
    queryClient.getQueryData(
      discoverMoviesQueryOptions({ genres: [genre.id] }).queryKey
    )
  );

  return { queryData, queryClient };
};
