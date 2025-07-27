import { RouteObject, useRoutes } from 'react-router-dom';
import { MoviePage, HomePage, NotFoundPage } from '@/pages';

export const routes: RouteObject[] = [
  {
    index: true,
    Component: HomePage,
  },
  {
    Component: MoviePage,
    path: '/movie/:id',
  },
  {
    Component: NotFoundPage,
    path: '*',
  },
];

export const Router = () => {
  return useRoutes(routes);
};
