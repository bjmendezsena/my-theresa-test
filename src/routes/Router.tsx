import { Routes, Route } from 'react-router-dom';
import { MoviePage, HomePage, NotFoundPage } from '@/pages';

export const Router = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/movie/:id" element={<MoviePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
