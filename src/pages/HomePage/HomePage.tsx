import { useMemo } from 'react';
import {
  useGetCategories,
  CategoryCarousel,
  MAX_CATEGORIES,
} from '@/features/categories';
import { prefetchHomeData } from './utils';

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
HomePage.displayName = 'HomePage';
HomePage.prefetch = prefetchHomeData;
