import { create } from 'zustand';
import type { Product } from '../types/product';
import { fetchProducts as fetchProductsApi } from '../api/products';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

type SetState = (partial: Partial<ProductsState> | ((state: ProductsState) => Partial<ProductsState>)) => void;

export const useProductsStore = create<ProductsState>((set: SetState) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await fetchProductsApi();
      set({ products, loading: false });
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to load products',
      });
    }
  },
}));
