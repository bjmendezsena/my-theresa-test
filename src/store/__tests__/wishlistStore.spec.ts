import { expect, describe, test, beforeEach } from '@/tests/utils';
import { WishlistItem } from '@/types';
import { wishlistStore } from '@/store';

describe('wishlistStore', () => {
  const mockItem: WishlistItem = {
    id: 1,
    title: 'Test Movie',
    overview: 'Overview of the test movie',
    posterPath: '/path/to/poster.jpg',
    rating: 5,
    releaseDate: '2023-01-01',
  };

  const mockItem2: WishlistItem = {
    id: 2,
    title: 'Test Movie 2',
    overview: 'Overview of the second test movie',
    posterPath: '/path/to/poster2.jpg',
    rating: 4.5,
    releaseDate: '2023-02-01',
  };

  beforeEach(() => {
    wishlistStore.setState({ items: [] });
  });

  test('initial state is empty', () => {
    const state = wishlistStore.getState();
    expect(state.items).toEqual([]);
    expect(state.items).toHaveLength(0);
  });

  test('adds item to wishlist', () => {
    let state = wishlistStore.getState();
    expect(state.items).toHaveLength(0);

    state.addItem(mockItem);

    state = wishlistStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockItem);
  });

  test('removes item from wishlist', () => {
    wishlistStore.setState({
      items: [mockItem],
    });

    let state = wishlistStore.getState();
    expect(state.items).toHaveLength(1);

    state.removeItem(mockItem.id);

    state = wishlistStore.getState();
    expect(state.items).toHaveLength(0);
  });

  test('toggleItem adds item when not in wishlist', () => {
    let state = wishlistStore.getState();
    expect(state.items).toHaveLength(0);

    state.toggleItem(mockItem);

    state = wishlistStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockItem);
  });

  test('toggleItem removes item when already in wishlist', () => {
    wishlistStore.setState({
      items: [mockItem],
    });

    let state = wishlistStore.getState();
    expect(state.items).toHaveLength(1);

    state.toggleItem(mockItem);

    state = wishlistStore.getState();
    expect(state.items).toHaveLength(0);
  });

  test('adds multiple items to wishlist', () => {
    let state = wishlistStore.getState();

    state.addItem(mockItem);
    state = wishlistStore.getState();
    expect(state.items).toHaveLength(1);

    state.addItem(mockItem2);
    state = wishlistStore.getState();
    expect(state.items).toHaveLength(2);

    expect(state.items).toContain(mockItem);
    expect(state.items).toContain(mockItem2);
  });

  test('removeItem only removes specific item', () => {
    wishlistStore.setState({
      items: [mockItem, mockItem2],
    });

    let state = wishlistStore.getState();
    expect(state.items).toHaveLength(2);

    state.removeItem(mockItem.id);

    state = wishlistStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockItem2);
    expect(state.items).not.toContain(mockItem);
  });

  test('does not add duplicate items', () => {
    let state = wishlistStore.getState();

    state.addItem(mockItem);
    state = wishlistStore.getState();
    state.addItem(mockItem);
    state = wishlistStore.getState();

    expect(state.items).toHaveLength(2);
  });

  test('removeItem does nothing when item does not exist', () => {
    wishlistStore.setState({
      items: [mockItem],
    });

    let state = wishlistStore.getState();
    expect(state.items).toHaveLength(1);

    state.removeItem(999);

    state = wishlistStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockItem);
  });
});
