import _merge from 'lodash/merge';
import {
  renderWithProviders,
  expect,
  describe,
  test,
  act,
} from '@/tests/utils';
import { MovieCard, MovieCardProps } from '@/components';
import { wishlistStore } from '@/store';
import { WishlistItem } from '@/types';

const item: WishlistItem = {
  id: 1,
  overview: 'overview',
  posterPath: 'path/to/poster.jpg',
  rating: 5,
  releaseDate: '2023-01-01',
  title: 'Test Movie',
};
const defaultProps: MovieCardProps = {
  ...item,
  voteAverage: item.rating,
  showWishlistButton: true,
};

describe(`<${MovieCard.name}/>`, () => {
  const getComponent = (props: Partial<MovieCardProps> = {}) =>
    renderWithProviders(<MovieCard {..._merge(defaultProps, props)} />);

  test('renders correctly', () => {
    const { container } = getComponent();
    expect(container).toMatchSnapshot();
  });

  test('adds item to wishlist on click', () => {
    const { getByRole } = getComponent();
    const addButton = getByRole('button', { name: /add to wishlist/i });

    act(() => {
      addButton.click();
    });

    const wishlistItems = wishlistStore.getState().items;
    expect(wishlistItems).toHaveLength(1);
    expect(wishlistItems[0]).toEqual(item);
  });
});
