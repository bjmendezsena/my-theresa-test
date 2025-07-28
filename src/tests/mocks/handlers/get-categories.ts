import { HttpResponse, ResponseResolver } from 'msw';
import { getCategoriesMock } from '@/tests/mocks';

export const getCategoriesHandler: ResponseResolver = () => {
  return HttpResponse.json(getCategoriesMock, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
