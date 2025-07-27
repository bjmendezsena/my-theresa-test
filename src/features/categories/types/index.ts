import { MovieItem } from '@/features/movies';

export type Category = {
  id: number;
  name: string;
  movies: MovieItem[];
};
