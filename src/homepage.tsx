import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { Product } from "./types/product";
import { useProductsStore } from "./store/productsStore";
import { ProductCard } from "./components/ProductCard";
import { BooksEmptyState } from "./components/BooksEmptyState";

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

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="w-full h-full flex flex-col pt-[66px] md:pt-[80px]">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row min-h-[85vh] mx-10 md:mx-[130px] items-center justify-center md:justify-between gap-8 bg-white py-10">
        <div className="text-black flex flex-col gap-6 md:gap-8 items-center justify-center md:items-start max-w-2xl">
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl md:text-left leading-tight text-center">
            Accelerating your business through innovative IT Solutions
          </h1>

          <p className="text-center md:text-left text-lg text-gray-700 leading-relaxed">
            Your trusted source for general merchandise and digital goods. We
            provide quality products and excellent service to meet all your
            needs.
          </p>

          <p className="text-center md:text-left text-gray-600 leading-relaxed">
            Our highly skilled development teams specialized in Java, PHP,
            React, Angular and AWS help you accelerate your business via modern
            custom software solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              to="/products"
              className="text-base font-semibold text-white bg-primary rounded-full px-8 py-4 hover:bg-primaryHover flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Books
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              to="/contact-us"
              className="text-base font-semibold text-primary border-2 border-primary rounded-full px-8 py-4 hover:bg-primary/10 flex items-center justify-center gap-2 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="w-full md:w-[600px] flex-shrink-0">
          <img
            src="https://blacksourcemedia.com/wp-content/uploads/2023/01/black-business-people.jpg"
            alt="Business team"
            className="w-full h-[400px] md:h-[600px] object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </section>

      {/* Services/Features Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16 md:py-20 px-10 md:px-[130px]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We deliver excellence through innovation, quality, and
            customer-focused solutions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Quick and reliable shipping to get your products to you when you
                need them.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600">
                Curated selection of high-quality books and digital goods from
                trusted sources.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Support
              </h3>
              <p className="text-gray-600">
                Our team of IT experts is ready to help you with any questions
                or support needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="bg-white py-14 md:py-20 px-10 md:px-[130px]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">
              Featured Books
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of bestsellers and must-read
              titles
            </p>
          </div>

          {loading && products.length === 0 ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error && products.length === 0 ? (
            <BooksEmptyState onRetry={fetchProducts} />
          ) : products.length === 0 ? (
            <BooksEmptyState onRetry={fetchProducts} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {featuredProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:text-primaryHover transition-colors"
                >
                  View all books
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* IT Consultation Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-20 px-10 md:px-[130px]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 text-primary font-semibold mb-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <span>IT Consultation Services</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Expert IT Consultation to Accelerate Your Business
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                Need guidance on your technology strategy? Our experienced IT
                consultants are here to help you navigate the digital landscape
                and make informed decisions that drive growth.
              </p>

              <div className="space-y-4 mt-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Technology Strategy
                    </h3>
                    <p className="text-gray-600">
                      Develop comprehensive IT roadmaps aligned with your
                      business objectives
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Cloud Solutions
                    </h3>
                    <p className="text-gray-600">
                      Expert guidance on AWS, Azure, and cloud migration
                      strategies
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Custom Development
                    </h3>
                    <p className="text-gray-600">
                      Specialized in Java, PHP, React, Angular, and modern web
                      technologies
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/contact-us"
                  className="inline-flex items-center gap-2 text-base font-semibold text-white bg-primary rounded-full px-8 py-4 hover:bg-primaryHover transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get IT Consultation
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right side - Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl p-8 md:p-12">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Secure</h4>
                    <p className="text-sm text-gray-600">
                      Enterprise-grade security
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg mt-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Fast</h4>
                    <p className="text-sm text-gray-600">Rapid deployment</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Scalable
                    </h4>
                    <p className="text-sm text-gray-600">Grows with you</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg mt-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Support
                    </h4>
                    <p className="text-sm text-gray-600">24/7 expert help</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primaryHover py-16 md:py-20 px-10 md:px-[130px]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Browse our extensive collection of books and digital products today
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-base font-semibold bg-white text-primary rounded-full px-8 py-4 hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Shop Now
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
