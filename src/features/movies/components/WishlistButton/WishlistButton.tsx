import { ReactNode } from 'react';
import './WishlistButton.scss';

interface WishlistButtonProps {
  onClick: () => void;
  isInWishlist?: boolean;
  className?: string;
  children?: ReactNode;
}

export const WishlistButton = ({
  onClick,
  isInWishlist = false,
  className = '',
  children,
}: WishlistButtonProps) => {
  return (
    <button
      className={`wishlist-button ${isInWishlist ? 'wishlist-button--active' : ''} ${className}`}
      onClick={onClick}
    >
      <span className="wishlist-button__icon">{isInWishlist ? '♥' : '♡'}</span>
      {children || 'Add to Wishlist'}
    </button>
  );
};
