import { create } from 'zustand';
import type { Product } from '../types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  /** Total number of items (sum of quantities) */
  itemCount: () => number;
  /** Sum of (price * quantity) for all items */
  total: () => number;
}

type SetState = (partial: Partial<CartState> | ((state: CartState) => Partial<CartState>)) => void;
type GetState = () => CartState;

export const useCartStore = create<CartState>((set: SetState, get: GetState) => ({
  items: [],

  addItem: (product: Product, quantity = 1) => {
    set((state: CartState) => {
      const existing = state.items.find((i: CartItem) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i: CartItem) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, { product, quantity }] };
    });
  },

  removeItem: (productId: number) => {
    set((state: CartState) => ({
      items: state.items.filter((i: CartItem) => i.product.id !== productId),
    }));
  },

  increaseQuantity: (productId: number) => {
    set((state: CartState) => ({
      items: state.items.map((i: CartItem) =>
        i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i
      ),
    }));
  },

  decreaseQuantity: (productId: number) => {
    set((state: CartState) => ({
      items: state.items
        .map((i: CartItem) =>
          i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i: CartItem) => i.quantity > 0),
    }));
  },

  clearCart: () => set({ items: [] }),

  itemCount: () =>
    get().items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0),

  total: () =>
    get().items.reduce((sum: number, i: CartItem) => sum + i.product.price * i.quantity, 0),
}));
