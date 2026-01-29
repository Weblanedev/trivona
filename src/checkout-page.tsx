import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "./store/cartStore";
import { OrderProcessingModal } from "./components/OrderProcessingModal";
import { Toast } from "./components/Toast";
import {
  isValidCardNumber,
  isValidCvv,
  isValidExpiry,
  isNonEmptyString,
  isValidEmail,
  isValidPhone,
} from "./utils/validation";

/**
 * Checkout form: delivery (full name, address, phone/email) and payment (UI only).
 * Place Order disabled until all fields valid. On submit: processing modal → clear cart → redirect → toast.
 */
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();

  const [fullName, setFullName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [processingModalOpen, setProcessingModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const subtotal = total();
  const shipping = 0;
  const orderTotal = subtotal + shipping;

  const deliveryValid =
    isNonEmptyString(fullName) &&
    isNonEmptyString(deliveryAddress) &&
    (isValidEmail(phoneOrEmail) || isValidPhone(phoneOrEmail));
  const paymentValid =
    isNonEmptyString(nameOnCard) &&
    isValidCardNumber(cardNumber) &&
    isValidCvv(cvv) &&
    isValidExpiry(expiry);
  const allValid = deliveryValid && paymentValid;

  const handlePlaceOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!allValid || items.length === 0) return;
    setProcessingModalOpen(true);
  };

  const handleOrderComplete = useCallback(() => {
    clearCart();
    setProcessingModalOpen(false);
    navigate("/", { replace: true });
    setShowSuccessToast(true);
  }, [clearCart, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (items.length === 0 && !processingModalOpen) {
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

  const formatCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (v: string) => {
    // Remove all non-digits
    const digits = v.replace(/\D/g, "").slice(0, 4);

    // Add slash after 2 digits
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  return (
    <div className="w-full min-h-screen flex flex-col pt-[66px] md:pt-[80px]">
      <div className="max-w-4xl mx-auto w-full px-10 md:px-[130px] py-10">
        <h1 className="font-semibold text-2xl md:text-3xl text-gray-900 mb-8">
          Checkout
        </h1>

        <form className="space-y-10">
          {/* Delivery */}
          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Delivery details
            </h2>
            <div className="space-y-4">
              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Full name
                </span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery address
                </span>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Street, city, postal code"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Phone or email
                </span>
                <input
                  type="text"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="+1 234 567 8900 or email@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                />
                {phoneOrEmail &&
                  !isValidEmail(phoneOrEmail) &&
                  !isValidPhone(phoneOrEmail) && (
                    <p className="text-red-600 text-sm mt-1">
                      Enter a valid phone number or email
                    </p>
                  )}
              </label>
            </div>
          </section>

          {/* Payment (UI only) */}
          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Payment card details
            </h2>
            <div className="space-y-4">
              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Name on card
                </span>
                <input
                  type="text"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="JOHN DOE"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Card number (16 digits)
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                />
                {cardNumber && !isValidCardNumber(cardNumber) && (
                  <p className="text-red-600 text-sm mt-1">Enter 16 digits</p>
                )}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-sm font-bold text-gray-700 mb-1">
                    Expiry Date *
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                    pattern="[0-9]{2}/[0-9]{2}"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  />
                  {expiry && !isValidExpiry(expiry) && (
                    <p className="text-red-600 text-sm mt-1">
                      Enter valid MM/YY
                    </p>
                  )}
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-gray-700 mb-1">
                    CVV (3 digits)
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                    }
                    placeholder="123"
                    maxLength={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                  />
                  {cvv && !isValidCvv(cvv) && (
                    <p className="text-red-600 text-sm mt-1">3 digits</p>
                  )}
                </label>
              </div>
            </div>
          </section>

          {/* Order summary */}
          <section className="border-t border-gray-200 pt-6">
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 text-lg mt-4">
              <span>Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
            <p className="text-gray-600 text-sm mt-4 text-center">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our{" "}
              <Link
                to="/privacy-policy"
                className="text-primary hover:underline"
              >
                privacy policy
              </Link>
              .
            </p>
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={!allValid}
              className="mt-6 w-full text-base font-medium text-white bg-primary rounded-full py-3 hover:bg-primaryHover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary transition-colors"
            >
              Place Order
            </button>
          </section>
        </form>
      </div>

      <OrderProcessingModal
        show={processingModalOpen}
        onComplete={handleOrderComplete}
      />

      {showSuccessToast && (
        <Toast
          message="Order placed successfully"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </div>
  );
}
