import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { Product } from "./types/product";
import { useProductsStore } from "./store/productsStore";
import { ProductCard } from "./components/ProductCard";

/**
 * Homepage: hero + featured products from API (first 8).
 * Products loaded in store by ProductsPage or on first visit here.
 */
const Homepage = () => {
  const { products, loading, error, fetchProducts } = useProductsStore();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (products.length === 0 && !loading && !error) {
      fetchProducts();
    }
  }, [products.length, loading, error, fetchProducts]);

  const featuredProducts = products.slice(0, 8);

  return (
    <div className="w-full h-full flex flex-col pt-[66px] md:pt-[80px]">
      <section className="flex flex-col-reverse md:flex-row h-[90vh] md:h-[85vh] mx-10 md:mx-[130px] items-center justify-center md:justify-between gap-5 bg-white">
        <div className="text-black flex flex-col gap-9 md:gap-12 items-center justify-center md:items-start">
          <h1 className="font-medium md:font-semibold text-[30px] sm:text-[40px] md:text-[50px] md:text-left w-full md:w-[530px] leading-snug md:leading-[62px] text-center">
            Accelerating your business through innovative IT Solutions
          </h1>

          <p className="text-center md:text-left mt-[-30px] w-[450px] md:w-[600px]">
            Our highly skilled development teams specialized in Java, PHP,
            React, Angular and AWS help you accelerate your business via modern
            custom software solutions.
          </p>

          <Link
            to="/products"
            className="text-base font-medium text-white bg-primary rounded-full px-7 md:px-12 py-4 hover:bg-primaryHover flex items-center justify-center gap-3"
          >
            Explore Books
          </Link>
        </div>

        <img
          src="https://blacksourcemedia.com/wp-content/uploads/2023/01/black-business-people.jpg"
          alt=""
          className="w-full h-[300px] md:h-[500px] md:w-[600px] object-cover rounded-xl shadow-lg"
        />
      </section>

      <section className="flex w-full flex-col md:flex-row items-center justify-center md:justify-between gap-5 bg-primary/30 py-14 md:py-20 px-10 md:px-[130px]">
        <div className="w-full">
          <h2 className="font-semibold text-2xl text-gray-900 mb-8 text-center md:text-left">
            Featured books
          </h2>
          {loading && products.length === 0 ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error && products.length === 0 ? (
            <p className="text-red-600 text-center py-8">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          {products.length > 0 && (
            <div className="mt-8 text-center md:text-left">
              <Link
                to="/products"
                className="text-base font-medium text-primary hover:underline"
              >
                View all books →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
