import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/store';
import './Header.scss';

export const Header = () => {
  const { items } = useWishlist();

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__brand">
          <div className="header__logo">
            <div className="header__logo-icon">
              <span className="header__logo-film">🎬</span>
            </div>
            <div className="header__logo-text">
              <span className="header__logo-name">CineScope</span>
              <span className="header__logo-tagline">Movie Discovery</span>
            </div>
          </div>
        </Link>

        <div className="header__actions">
          <Link to={'/whishlist'} className="header__wishlist-btn">
            <span className="header__wishlist-icon">
              <Heart />
            </span>
            <span className="header__wishlist-count">{items.length}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
