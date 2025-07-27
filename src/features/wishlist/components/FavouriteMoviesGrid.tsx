import { MovieCard } from '@/features/movies';
import { useWishlist } from '@/features/wishlist';
import './FavouriteMoviesGrid.scss';

export const FavouriteMoviesGrid = () => {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="favourite-movies-grid">
        <div className="favourite-movies-grid__empty">
          <div className="favourite-movies-grid__empty-icon">❤️</div>
          <h3 className="favourite-movies-grid__empty-title">
            No movies in your wishlist yet
          </h3>
          <p className="favourite-movies-grid__empty-description">
            Start adding movies to your wishlist to see them here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="favourite-movies-grid">
      <div className="favourite-movies-grid__header">
        <h2 className="favourite-movies-grid__title">My Wishlist</h2>
        <span className="favourite-movies-grid__count">
          {items.length} {items.length === 1 ? 'movie' : 'movies'}
        </span>
      </div>

      <div className="favourite-movies-grid__grid">
        {items.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.posterPath}
            releaseDate={movie.releaseDate?.toString()}
            voteAverage={movie.rating}
            overview={movie.overview}
            className="favourite-movies-grid__item"
            showWishlistButton
          />
        ))}
      </div>
    </div>
  );
};
