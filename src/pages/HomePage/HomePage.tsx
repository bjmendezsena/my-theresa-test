import { useGetCategories, CategoryCarousel } from '@/features/categories';
import { prefetchHomeData } from './utils';

export const HomePage = () => {
  const { data } = useGetCategories();

  const { genres = [] } = data || {};

  return (
    <div>
      {genres.map(category => (
        <CategoryCarousel key={category.id} category={category} />
      ))}
    </div>
  );
};
HomePage.displayName = 'HomePage';
HomePage.prefetch = prefetchHomeData;
