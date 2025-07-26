import { Routes, Route } from "react-router-dom";
import { CategoryPage, HomePage, NotFoundPage } from "@/pages";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='/category' element={<CategoryPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
