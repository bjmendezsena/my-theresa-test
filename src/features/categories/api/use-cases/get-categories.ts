import { useQuery, queryOptions } from '@tanstack/react-query';
import { QueryConfig, apiClient } from '@/lib';
import { Category } from '@/features/categories';
import { queryKeys } from '@/features/categories/api/api-utils';

const url = '/genre/movie/list';

export type GetCategoriesResponse = {
  genres: Category[];
};

export const getCategories = () => {
  return apiClient.get<unknown, GetCategoriesResponse>(url);
};

export const getCategoriesQueryOptions = (
  config?: QueryConfig<typeof getCategories>
) => {
  return queryOptions({
    queryFn: () => getCategories(),
    queryKey: queryKeys.allCategories(),
    ...config,
  });
};

export const useGetCategories = (
  config?: QueryConfig<typeof getCategories>
) => {
  return useQuery(getCategoriesQueryOptions(config));
};
