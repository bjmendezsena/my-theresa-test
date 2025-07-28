import { HttpResponse, ResponseResolver } from 'msw';
import { discoverMoviesMock } from '@/tests/mocks';

export const discoverMoviesHandler: ResponseResolver = () => {
  return HttpResponse.json(discoverMoviesMock, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
