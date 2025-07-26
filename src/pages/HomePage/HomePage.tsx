import { useMemo } from 'react';
import { useGetCategories, CategoryCarousel } from '@/features/categories';

export const HomePage = () => {
  const { data } = useGetCategories();

  const { genres = [] } = data || {};

  const threeGenres = useMemo(() => {
    return genres.slice(0, 3);
  }, [genres]);

  return (
    <div>
      {threeGenres.map(category => (
        <CategoryCarousel key={category.id} category={category} />
      ))}
    </div>
  );
};
