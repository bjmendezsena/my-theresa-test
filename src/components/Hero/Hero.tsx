import { ReactNode } from 'react';
import './Hero.scss';

interface HeroProps {
  backgroundImage?: string;
  title: string;
  tagline?: string;
  children?: ReactNode;
  className?: string;
}

export const Hero = ({
  backgroundImage,
  title,
  tagline,
  children,
  className = '',
}: HeroProps) => {
  const heroStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
      }
    : {
        background:
          'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
      };

  return (
    <div className={`hero ${className}`} style={heroStyle}>
      <div className="hero__content">
        {children}
        <h1 className="hero__title">{title}</h1>
        {tagline && <p className="hero__tagline">{tagline}</p>}
      </div>
    </div>
  );
};
