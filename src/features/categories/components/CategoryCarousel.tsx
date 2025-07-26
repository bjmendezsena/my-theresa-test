import { Link } from 'react-router-dom';
import { Category } from '@/features/categories';
import { useDiscoverMovies } from '@/features/movies';
import './CategoryCarousel.scss';

const imageW = 'w200';
const imageBaseUrl = `https://image.tmdb.org/t/p/${imageW}/`;

export interface CategoryCarouselProps {
  category: Category;
}

export const CategoryCarousel = ({ category }: CategoryCarouselProps) => {
  const { data } = useDiscoverMovies({
    genres: [category.id],
  });

  const { results = [] } = data || {};

  return (
    <div className="carousel">
      <div className="carousel">
        <h2 className="carousel__title">{category.name}</h2>
        <div className="carousel__items">
          {results.map(movie => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="carousel__items__item"
            >
              <img
                className="carousel__items__item__image"
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="carousel__items__item__info">
                <p>{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
        {results.length === 0 && <p>No movies found in this category.</p>}
      </div>
    </div>
  );
};
