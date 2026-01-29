import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

// Lazy load route components for code splitting
const Homepage = lazy(() => import("./homepage"));
const Contact = lazy(() => import("./contact"));
const PrivacyPolicy = lazy(() => import("./terms-and-privacy"));
const RefundReturnPage = lazy(() => import("./refund-return"));
const ProductsPage = lazy(() => import("./products-page"));
const ProductDetailPage = lazy(() => import("./product-detail"));
const CartPage = lazy(() => import("./cart-page"));
const CheckoutPage = lazy(() => import("./checkout-page"));

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center pt-[66px] md:pt-[80px]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-return" element={<RefundReturnPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
