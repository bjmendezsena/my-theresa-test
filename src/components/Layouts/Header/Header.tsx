import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  return (
    <div className="header__container">
      <Link to="/" className="header__title">
        My Theresa Test
      </Link>
    </div>
  );
};
