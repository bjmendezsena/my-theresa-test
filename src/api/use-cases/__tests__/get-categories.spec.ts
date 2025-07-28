import { describe, it, expect } from 'vitest';
import { getCategoriesMock } from '@/tests/mocks';
import { getCategories } from '@/api';

describe('getCategories', () => {
  it('should return categories', async () => {
    const response = await getCategories();
    expect(response).toEqual(getCategoriesMock);
  });
});
