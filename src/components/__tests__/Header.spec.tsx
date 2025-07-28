import { renderWithProviders, expect, describe, test } from '@/tests/utils';
import { Header } from '@/components';
import { wishlistStore } from '@/store';
import { WishlistItem } from '@/types';

describe(`<${Header.name}/>`, () => {
  const getComponent = () => renderWithProviders(<Header />);
  test('renders correctly', () => {
    const { container } = getComponent();
    expect(container).toMatchSnapshot();
  });

  test('renders wishlist button with 0 count', () => {
    const { getByText } = getComponent();
    expect(getByText('0')).toBeInTheDocument();
  });
  test('renders wishlist button with correct 1 count', () => {
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

    const { getByText: getByTextUpdated } = getComponent();
    expect(getByTextUpdated('1')).toBeInTheDocument();
  });
});
