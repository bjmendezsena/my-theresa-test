export const queryKeys = {
  allCategories: () => ['categories'] as const,
  discoverMovies: (filter: any) => ['categories', filter] as const,
};
