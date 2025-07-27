import { useState, useRef, useEffect } from 'react';
import { Category } from '@/features/categories';
import { useDiscoverMovies } from '@/features/movies';
import { IMAGE_BASE_URL, MovieCard } from '@/features/movies';
import './CategoryCarousel.scss';

export interface CategoryCarouselProps {
  category: Category;
}

export const CategoryCarousel = ({ category }: CategoryCarouselProps) => {
  const { data } = useDiscoverMovies({
    genres: [category.id],
  });

  const { results = [] } = data || {};
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollAmount = 300; // Amount to scroll in pixels

  const updateScrollButtons = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollLeft = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Initial check
    updateScrollButtons();

    // Listen for scroll events
    carousel.addEventListener('scroll', updateScrollButtons);

    // Listen for resize events
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      carousel.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [results]);

  if (results.length === 0) {
    return (
      <div className="category-carousel">
        <h2 className="category-carousel__title">{category.name}</h2>
        <p className="category-carousel__empty">
          No movies found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="category-carousel">
      <h2 className="category-carousel__title">{category.name}</h2>

      <div className="category-carousel__container">
        <button
          className={`category-carousel__nav-btn category-carousel__nav-btn--left ${
            !canScrollLeft ? 'category-carousel__nav-btn--disabled' : ''
          }`}
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <span className="category-carousel__nav-icon">‹</span>
        </button>

        <div
          ref={carouselRef}
          className="category-carousel__items"
          onScroll={updateScrollButtons}
        >
          {results.map(movie => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={`${IMAGE_BASE_URL}${movie.poster_path}`}
              releaseDate={movie.release_date?.toString()}
              voteAverage={movie.vote_average}
              overview={movie.overview}
              className="category-carousel__item"
            />
          ))}
        </div>

        <button
          className={`category-carousel__nav-btn category-carousel__nav-btn--right ${
            !canScrollRight ? 'category-carousel__nav-btn--disabled' : ''
          }`}
          onClick={scrollRight}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <span className="category-carousel__nav-icon">›</span>
        </button>
      </div>
    </div>
  );
};
