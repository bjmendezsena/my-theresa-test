import { useMemo } from 'react';
import {
  useGetCategories,
  CategoryCarousel,
  getCategoriesQueryOptions,
  MAX_CATEGORIES,
} from '@/features/categories';
import { discoverMoviesQueryOptions } from '@/features/movies';
import { PrefetchFunction } from '@/types';

export const HomePage = () => {
  const { data } = useGetCategories();

  const { genres = [] } = data || {};

  const threeGenres = useMemo(() => {
    return genres.slice(0, MAX_CATEGORIES);
  }, [genres]);

  return (
    <div>
      {threeGenres.map(category => (
        <CategoryCarousel key={category.id} category={category} />
      ))}
    </div>
  );
};

const prefetchFunction: PrefetchFunction = async queryClient => {
  await queryClient.prefetchQuery(getCategoriesQueryOptions());
  const queryData = queryClient.getQueryData(
    getCategoriesQueryOptions().queryKey
  );
  const threeGenres = queryData?.genres?.slice(0, MAX_CATEGORIES) || [];
  await Promise.all(
    threeGenres.map(genre =>
      queryClient.prefetchQuery(
        discoverMoviesQueryOptions({ genres: [genre.id] })
      )
    )
  );

  const threeGenresData = threeGenres.map(genre =>
    queryClient.getQueryData(
      discoverMoviesQueryOptions({ genres: [genre.id] }).queryKey
    )
  );

  queryClient.setQueryData(
    getCategoriesQueryOptions().queryKey,
    (oldData: any) => ({
      ...oldData,
      genres: threeGenres.map((genre, index) => ({
        ...genre,
        movies: threeGenresData[index]?.results || [],
      })),
    })
  );

  return { queryData, queryClient };
};

HomePage.prefetch = prefetchFunction;
