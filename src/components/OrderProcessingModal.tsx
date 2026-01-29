import { useEffect, useState } from "react";
import { Modal } from "../modal";

interface OrderProcessingModalProps {
  show: boolean;
  onComplete: () => void;
}

const COUNTDOWN_SECONDS = 5;
const MESSAGE =
  "Processing your order. A verification code will be sent to your email or phone before your card is charged.";

/**
 * Order processing overlay: loading spinner, message, 5s countdown.
 * Calls onComplete when countdown finishes (clear cart, close, redirect handled by parent).
 */
export function OrderProcessingModal({
  show,
  onComplete,
}: OrderProcessingModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (!show) {
      setSecondsLeft(COUNTDOWN_SECONDS);
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <Modal show={show} toggle={() => {}}>
      <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
        {/* Loading spinner */}
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-gray-700 text-lg max-w-md mb-4">{MESSAGE}</p>
        <p className="text-sm text-gray-500">
          Completing in{" "}
          <span className="font-semibold text-primary">{secondsLeft}</span>{" "}
          second
          {secondsLeft !== 1 ? "s" : ""}...
        </p>
      </div>
    </Modal>
  );
}
