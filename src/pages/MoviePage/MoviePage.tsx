import { Link, useParams } from 'react-router-dom';
import { PrefetchFunction } from '@/types';
import {
  useGetMovie,
  getMovieQueryOptions,
  IMAGE_BASE_URL,
} from '@/features/movies';

export const MoviePage = () => {
  const { id: movieId = '' } = useParams<{ id: string }>();
  const { data: movie, isLoading, isError } = useGetMovie(movieId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading movie details.</div>;
  }

  return (
    <div
      className="movie-page"
      style={{
        backgroundImage: `url(${IMAGE_BASE_URL}${movie?.poster_path})`,
      }}
    >
      {movie?.title}
      <p>Explore our exclusive categories and collections.</p>
      <p>Discover the latest trends and styles.</p>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

const prefetchFunction: PrefetchFunction = async (queryClient, params) => {
  const movieId = params?.id || '';

  await queryClient.prefetchQuery(getMovieQueryOptions(movieId));
  const queryData = queryClient.getQueryData(
    getMovieQueryOptions(movieId).queryKey
  );
  return { queryData, queryClient };
};

MoviePage.prefetch = prefetchFunction;
