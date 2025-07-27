import './MoviePoster.scss';

interface MoviePosterProps {
  src?: string;
  alt: string;
  className?: string;
}

export const MoviePoster = ({ src, alt, className = '' }: MoviePosterProps) => {
  return (
    <div className={`movie-poster ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="movie-poster__image" />
      ) : (
        <div className="movie-poster__placeholder">
          <span className="movie-poster__placeholder-text">No Image</span>
        </div>
      )}
    </div>
  );
};
