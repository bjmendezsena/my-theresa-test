import { describe, it, expect } from 'vitest';
import { getMovieMock } from '@/tests/mocks';
import { getMovie } from '@/api';

describe('getCategories', () => {
  it('should return categories', async () => {
    const response = await getMovie('12345');

    expect(response).toEqual(getMovieMock);
  });
});
