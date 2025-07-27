import './MovieMeta.scss';

interface MovieMetaProps {
  releaseDate: Date;
  runtime?: number;
  voteAverage: number;
  className?: string;
}

export const MovieMeta = ({
  releaseDate,
  runtime,
  voteAverage,
  className = '',
}: MovieMetaProps) => {
  return (
    <div className={`movie-meta ${className}`}>
      <span className="movie-meta__release-date">
        {new Date(releaseDate).getFullYear()}
      </span>
      {runtime && (
        <>
          <span className="movie-meta__separator">•</span>
          <span className="movie-meta__runtime">
            {Math.floor(runtime / 60)}h {runtime % 60}m
          </span>
        </>
      )}
      <span className="movie-meta__separator">•</span>
      <span className="movie-meta__rating">⭐ {voteAverage.toFixed(1)}/10</span>
    </div>
  );
};
