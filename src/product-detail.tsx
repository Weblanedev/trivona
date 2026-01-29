import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductsStore } from "./store/productsStore";
import { useCartStore } from "./store/cartStore";
import { fetchProductById } from "./api/products";
import type { Product } from "./types/product";

/**
 * Book detail page. Loads book from store or Google Books API by id.
 */
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : NaN;
  const products = useProductsStore((s: { products: Product[] }) => s.products);
  const addItem = useCartStore(
    (s: { addItem: (p: Product, q?: number) => void }) => s.addItem,
  );

  const [product, setProduct] = useState<Product | null>(
    () => products.find((p: Product) => p.id === productId) ?? null,
  );
  const [loading, setLoading] = useState(!product && !Number.isNaN(productId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (product || Number.isNaN(productId)) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchProductById(productId)
      .then((p) => {
        if (!cancelled) setProduct(p ?? null);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load product");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [productId, product]);

  if (Number.isNaN(productId)) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col pt-[66px] md:pt-[80px] items-center justify-center px-10">
        <p className="text-gray-600">Invalid book.</p>
        <Link to="/products" className="mt-4 text-primary hover:underline">
          Back to books
        </Link>
      </div>
    );
  }

  if (loading && !product) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col pt-[66px] md:pt-[80px] items-center justify-center px-10">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col pt-[66px] md:pt-[80px] items-center justify-center px-10">
        <p className="text-red-600">{error ?? "Book not found."}</p>
        <Link to="/products" className="mt-4 text-primary hover:underline">
          Back to books
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => addItem(product, 1);

  return (
    <div className="w-full min-h-screen flex flex-col pt-[66px] md:pt-[80px]">
      <div className="max-w-6xl mx-auto w-full px-10 md:px-[130px] py-10">
        <Link
          to="/products"
          className="inline-flex items-center text-gray-600 hover:text-primary mb-8"
        >
          ← Back to books
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-square w-full max-w-md bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-2xl md:text-3xl text-gray-900 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>
            <p className="font-bold text-2xl text-primary mb-8">
              ${product.price.toFixed(2)}
            </p>
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full md:w-auto text-base font-medium text-white bg-primary rounded-full px-8 py-3 hover:bg-primaryHover transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
