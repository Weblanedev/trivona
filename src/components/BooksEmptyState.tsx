import { Link } from "react-router-dom";

interface BooksEmptyStateProps {
  onRetry?: () => void;
  showBackToHome?: boolean;
}

/**
 * Beautiful empty state component for when books are unavailable.
 * Displays a friendly message with optional retry button.
 */
export function BooksEmptyState({
  onRetry,
  showBackToHome = false,
}: BooksEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="mb-6">
        <svg
          className="w-24 h-24 mx-auto text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
        Books aren't available right now
      </h3>
      <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
        Our book provider is temporarily unavailable. Please check back in a
        bit, or try refreshing the page.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primaryHover transition-colors font-medium"
          >
            Try Again
          </button>
        )}
        {showBackToHome && (
          <Link
            to="/"
            className="px-6 py-3 text-primary border-2 border-primary rounded-full hover:bg-primary/10 transition-colors font-medium"
          >
            Back to Home
          </Link>
        )}
      </div>
    </div>
  );
}
