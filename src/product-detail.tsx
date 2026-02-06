import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductsStore } from "./store/productsStore";
import { useCartStore } from "./store/cartStore";
import { fetchProductById } from "./api/products";
import type { Product } from "./types/product";
import { formatPrice } from "./utils/currency";

/**
 * Book detail page. Loads book from store or Google Books API by id.
 */
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : NaN;
  const products = useProductsStore((s: { products: Product[] }) => s.products);
  const addItem = useCartStore(
    (s: { addItem: (p: Product, q?: number) => void }) => s.addItem
  );

  const [product, setProduct] = useState<Product | null>(
    () => products.find((p: Product) => p.id === productId) ?? null
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

  const displayTitle = product.subtitle
    ? `${product.title}: ${product.subtitle}`
    : product.title;

  return (
    <div className="w-full min-h-screen flex flex-col pt-[66px] md:pt-[80px] bg-gray-50">
      <div className="max-w-7xl mx-auto w-full px-10 md:px-[130px] py-10">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to books
        </Link>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-10">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-md aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={product.image}
                  alt={displayTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Book Details */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Title */}
                <h1 className="font-bold text-3xl md:text-4xl text-gray-900 mb-3 leading-tight">
                  {product.title}
                </h1>
                {product.subtitle && (
                  <h2 className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
                    {product.subtitle}
                  </h2>
                )}

                {/* Authors */}
                {product.authors && product.authors.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">
                      Author{product.authors.length > 1 ? "s" : ""}
                    </p>
                    <p className="text-lg text-gray-800 font-medium">
                      {product.authors.join(", ")}
                    </p>
                  </div>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
                  {product.publishedDate && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-600">
                        {product.publishedDate}
                      </span>
                    </div>
                  )}
                  {product.pageCount && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span className="text-gray-600">
                        {product.pageCount} pages
                      </span>
                    </div>
                  )}
                </div>

                {/* Categories */}
                {product.categories && product.categories.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2">Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {product.categories.slice(0, 3).map((category, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    About this book
                  </h3>
                  <p className="text-gray-700 leading-relaxed line-clamp-6">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price and Add to Cart */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <p className="font-bold text-3xl text-primary">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full text-base font-semibold text-white bg-primary rounded-full px-8 py-4 hover:bg-primaryHover transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
