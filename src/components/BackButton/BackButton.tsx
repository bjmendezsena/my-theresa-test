import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import './BackButton.scss';

interface BackButtonProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const BackButton = ({
  to,
  children,
  className = '',
}: BackButtonProps) => {
  return (
    <Link to={to} className={`back-button ${className}`} role="button">
      {children}
    </Link>
  );
};
