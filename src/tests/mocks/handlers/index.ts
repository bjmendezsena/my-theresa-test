import { http } from 'msw';
import { discoverMoviesHandler } from './discover-movies';
import { getCategoriesHandler } from './get-categories';
import { getMovieHandler } from './get-movie';

export const handlers = (baseUrl: string) => {
  return [
    http.get(`${baseUrl}/discover/movie`, discoverMoviesHandler),
    http.get(`${baseUrl}/movie/:id`, getMovieHandler),
    http.get(`${baseUrl}/genre/movie/list`, getCategoriesHandler),
  ];
};
