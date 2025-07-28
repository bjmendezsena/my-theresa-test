import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/features/wishlist';
import { IMAGE_BASE_URL } from '@/features/movies';
import type { WishlistItem } from '@/features/wishlist';
import './MovieCard.scss';

export interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  releaseDate?: string;
  voteAverage?: number;
  overview?: string;
  className?: string;
  showWishlistButton?: boolean;
}

export const MovieCard = ({
  id,
  title,
  posterPath,
  releaseDate = '',
  voteAverage = 0,
  overview = '',
  className = '',
  showWishlistButton = false,
}: MovieCardProps) => {
  const { items, toggleItem } = useWishlist();

  const formatReleaseYear = (date?: string) => {
    if (!date) return '';
    return new Date(date).getFullYear();
  };

  const formatRating = (rating?: number) => {
    if (!rating) return '';
    return rating.toFixed(1);
  };

  const isInWishlist = items.some(item => item.id === id);

  const handleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigation to movie detail
    e.stopPropagation();

    const wishlistItem: WishlistItem = {
      id,
      title,
      posterPath,
      releaseDate: releaseDate,
      overview: overview,
      rating: voteAverage,
    };

    toggleItem(wishlistItem);
  };

  return (
    <Link
      to={`/movie/${id}`}
      className={`movie-card ${className}`}
      aria-label={`View details for ${title}`}
    >
      <div className="movie-card__poster">
        <img
          className="movie-card__poster-image"
          src={`${IMAGE_BASE_URL}${posterPath}`}
          alt={`${title} poster`}
          loading="lazy"
        />
        {voteAverage && (
          <div className="movie-card__rating">
            <span className="movie-card__rating-icon">⭐</span>
            <span className="movie-card__rating-value">
              {formatRating(voteAverage)}
            </span>
          </div>
        )}

        {showWishlistButton && (
          <button
            className={`movie-card__wishlist-btn ${
              isInWishlist ? 'movie-card__wishlist-btn--active' : ''
            }`}
            onClick={handleWishlistClick}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label={
              isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
            }
          >
            <span className="movie-card__wishlist-icon">
              {isInWishlist ? '❤️' : '🤍'}
            </span>
          </button>
        )}
      </div>

      <div className="movie-card__content">
        <h3 className="movie-card__title" title={title}>
          {title}
        </h3>
        {releaseDate && (
          <p className="movie-card__year">{formatReleaseYear(releaseDate)}</p>
        )}
        {overview && (
          <p className="movie-card__overview">
            {overview.length > 100 ? `${overview.slice(0, 97)}...` : overview}
          </p>
        )}
      </div>
    </Link>
  );
};
