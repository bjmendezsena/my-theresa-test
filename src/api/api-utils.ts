export const queryKeys = {
  allCategories: () => ['categories'] as const,
  discoverMovies: (filter: any) => ['movies', filter] as const,
  getMovie: (movieId: string) => ['movie', movieId] as const,
};
