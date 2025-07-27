import './MovieOverview.scss';

interface MovieOverviewProps {
  overview: string;
  title?: string;
  className?: string;
}

export const MovieOverview = ({
  overview,
  title = 'Overview',
  className = '',
}: MovieOverviewProps) => {
  if (!overview) {
    return null;
  }

  return (
    <div className={`movie-overview ${className}`}>
      <h3 className="movie-overview__title">{title}</h3>
      <p className="movie-overview__description">{overview}</p>
    </div>
  );
};
