import { useEffect } from "react";
import type { Product } from "./types/product";
import { useProductsStore } from "./store/productsStore";
import { ProductCard } from "./components/ProductCard";

/**
 * Books listing: responsive grid of book cards from Google Books API.
 * Fetches books on mount and stores in global state.
 */
export default function ProductsPage() {
  const { products, loading, error, fetchProducts } = useProductsStore();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading && products.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col pt-[66px] md:pt-[80px] items-center justify-center px-10">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">Loading books...</p>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col pt-[66px] md:pt-[80px] items-center justify-center px-10">
        <p className="text-red-600">{error}</p>
        <button
          type="button"
          onClick={() => fetchProducts()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primaryHover"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col pt-[66px] md:pt-[80px]">
      <section className="flex bg-primary/10 flex-col-reverse md:flex-row min-h-[40vh] px-10 md:px-[130px] py-12 items-center justify-center md:justify-between gap-5">
        <div className="text-black flex flex-col gap-6 items-center justify-center md:items-start">
          <h1 className="font-medium md:font-semibold text-[40px] sm:text-[40px] md:text-[50px] leading-snug text-center md:text-left text-blue-950">
            Find the right book for you
          </h1>
          <p className="text-center md:text-left text-blue-950 max-w-md">
            Browse our book catalog and add books to your cart.
          </p>
        </div>
        <img
          src="https://i.insider.com/6123e7b3493203001845811d?width=1136&format=jpeg"
          alt=""
          className="w-full h-[200px] md:h-[280px] md:w-[450px] object-cover rounded-xl shadow-lg"
        />
      </section>

      <section className="flex-1 w-full px-10 md:px-[130px] py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
