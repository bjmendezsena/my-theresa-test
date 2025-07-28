import { describe, it, expect } from 'vitest';
import { discoverMoviesMock } from '@/tests/mocks';
import { discoverMovies } from '@/api';

describe('getCategories', () => {
  it('should return categories', async () => {
    const response = await discoverMovies({ genres: [] });

    expect(response).toEqual(discoverMoviesMock);
  });
});
