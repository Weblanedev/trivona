/**
 * Normalized product type used across the app.
 * Represents a book/product with consistent fields.
 * Maps from Google Books API responses.
 */
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  authors?: string[];
  categories?: string[];
  publishedDate?: string;
  pageCount?: number;
  subtitle?: string;
}
