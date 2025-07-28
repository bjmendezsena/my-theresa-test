import {
  renderWithProviders,
  waitFor,
  describe,
  it,
  expect,
} from '@/tests/utils';
import { FavouriteMoviesGrid } from '@/components';
import { wishlistStore } from '@/store';
import { WishlistItem } from '@/types';

describe(`<${FavouriteMoviesGrid.name}/>`, () => {
  const getComponent = () => renderWithProviders(<FavouriteMoviesGrid />);

  it('renders correctly when wishlist is empty', () => {
    const { container } = getComponent();
    expect(container).toMatchSnapshot();
  });

  it('renders movies when wishlist has items', async () => {
    const { getByText } = getComponent();
    await waitFor(() => {
      expect(getByText('No movies in your wishlist yet')).toBeInTheDocument();
    });
  });
    it('displays the correct count of movies in wishlist', async () => {
        const item: WishlistItem = {
        id: 1,
        overview: 'overview',
        posterPath: 'path/to/poster.jpg',
        rating: 5,
        releaseDate: '2023-01-01',
        title: 'Test Movie',
        };

        wishlistStore.setState({
        items: [item],
        });

        const { getByText } = getComponent();
        await waitFor(() => {
        expect(getByText('My Wishlist')).toBeInTheDocument();
        expect(getByText('1 movie')).toBeInTheDocument();
        });
    });
});
