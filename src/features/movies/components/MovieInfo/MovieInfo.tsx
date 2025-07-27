import { useCallback, useMemo } from 'react';
import { useWishlist } from '@/features/wishlist';
import {
  DetailedMovie,
  GenreList,
  MovieOverview,
  MovieMeta,
  WishlistButton,
} from '@/features/movies';
import { WishlistItem } from '@/features/wishlist';
import './MovieInfo.scss';

interface MovieInfoProps {
  movie: DetailedMovie;
  className?: string;
}

export const MovieInfo = ({ movie, className = '' }: MovieInfoProps) => {
  const { items, toggleItem } = useWishlist();

  const isInWishlist = useMemo(
    () => items.some(item => item.id === movie.id),
    [items, movie.id]
  );

  const onAddToWishlist = useCallback(() => {
    const wishlistItem: WishlistItem = {
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      overview: movie.overview,
      rating: movie.vote_average,
    };
    toggleItem(wishlistItem);
  }, [toggleItem]);

  return (
    <div className={`movie-info ${className}`}>
      <MovieMeta
        releaseDate={movie.release_date}
        runtime={movie.runtime}
        voteAverage={movie.vote_average}
      />

      <GenreList genres={movie.genres} />

      <MovieOverview overview={movie.overview} />

      <div className="movie-info__actions">
        <WishlistButton isInWishlist={isInWishlist} onClick={onAddToWishlist} />
      </div>
    </div>
  );
};
