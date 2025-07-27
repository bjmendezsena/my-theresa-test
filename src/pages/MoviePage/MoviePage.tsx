import { Link, useParams } from 'react-router-dom';
import {
  useGetMovie,
  Hero,
  MoviePoster,
  MovieInfo,
  BackButton,
  IMAGE_BASE_URL,
} from '@/features/movies';
import { prefetchMovieData } from './utils';
import './MoviePage.scss';

export const MoviePage = () => {
  const { id: movieId = '' } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError } = useGetMovie(movieId);

  if (isLoading) {
    return (
      <div className="movie-page__loading">
        <div className="movie-page__spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="movie-page__error">
        <h2>Error loading movie details</h2>
        <p>Please try again later.</p>
        <Link to="/" className="movie-page__back-link">
          Go to Home Page
        </Link>
      </div>
    );
  }

  const backgroundImage = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : undefined;

  const posterSrc = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : undefined;

  return (
    <div className="movie-page">
      <div className="movie-page__container">
        <Hero
          backgroundImage={backgroundImage}
          title={movie.title}
          tagline={movie.tagline}
          className="movie-page__hero"
        >
          <BackButton to="/">← Back to Home</BackButton>
        </Hero>

        <div className="movie-page__content">
          <div className="movie-page__main">
            <div className="movie-page__poster-container">
              <MoviePoster src={posterSrc} alt={`${movie.title} poster`} />
            </div>

            <MovieInfo movie={movie} />
          </div>
        </div>
      </div>
    </div>
  );
};

MoviePage.displayName = 'MoviePage';
MoviePage.prefetch = prefetchMovieData;
