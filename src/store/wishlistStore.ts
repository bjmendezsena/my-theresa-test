import { createStore, useStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WishlistItem } from '@/features/wishlist';

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

interface WishlistStore extends WishlistState {
  addItem: (item: WishlistItem) => void;
  removeItem: (id: number) => void;
  toggleItem: (item: WishlistItem) => void;
}

export const wishlistStore = createStore<WishlistStore>()(
  persist(
    set => ({
      ...initialState,
      addItem: item =>
        set(state => ({
          items: [...state.items, item],
        })),
      removeItem: id =>
        set(state => ({
          items: state.items.filter(item => item.id !== id),
        })),
      toggleItem: item =>
        set(state => {
          const exists = state.items.some(i => i.id === item.id);
          if (exists) {
            return { items: state.items.filter(i => i.id !== item.id) };
          }
          return { items: [...state.items, item] };
        }),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useWishlist = () => useStore(wishlistStore);
