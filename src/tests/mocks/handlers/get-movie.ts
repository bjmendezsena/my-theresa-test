import { HttpResponse, ResponseResolver } from 'msw';
import { getMovieMock } from '@/tests/mocks';

export const getMovieHandler: ResponseResolver = () => {
  return HttpResponse.json(getMovieMock, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
