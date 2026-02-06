import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartStore, type CartItem } from "./store/cartStore";
import { formatPrice } from "./utils/currency";

/**
 * Cart page: product list, quantity controls, subtotal and total.
 */
export default function CartPage() {
  const { items, increaseQuantity, decreaseQuantity, removeItem, total } =
    useCartStore();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (items.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col pt-[66px] md:pt-[80px] items-center justify-center px-10">
        <h1 className="font-semibold text-2xl text-gray-900 mb-4">
          Your cart is empty
        </h1>
        <Link
          to="/products"
          className="text-base font-medium text-white bg-primary rounded-full px-6 py-3 hover:bg-primaryHover"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const subtotal = total();
  const shipping = 0; // UI only
  const cartTotal = subtotal + shipping;

  return (
    <div className="w-full min-h-screen flex flex-col pt-[66px] md:pt-[80px]">
      <div className="max-w-5xl mx-auto w-full px-10 md:px-[130px] py-10">
        <h1 className="font-semibold text-2xl md:text-3xl text-gray-900 mb-8">
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-4">
            {items.map(({ product, quantity }: CartItem) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
              >
                <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/products/${product.id}`}
                    className="font-medium text-gray-900 hover:text-primary line-clamp-2"
                  >
                    {product.title}
                  </Link>
                  <p className="text-primary font-semibold mt-1">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(product.id)}
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => increaseQuantity(product.id)}
                    className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="ml-2 text-red-600 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h2 className="font-semibold text-lg text-gray-900 mb-4">
                Order summary
              </h2>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 mt-4 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-6 w-full inline-flex justify-center text-base font-medium text-white bg-primary rounded-full py-3 hover:bg-primaryHover"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
