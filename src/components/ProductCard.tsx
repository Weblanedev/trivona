import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { useCartStore } from "../store/cartStore";

interface ProductCardProps {
  product: Product;
}

/**
 * Reusable product card: image, title, price, Add to Cart.
 * Clicking the card (or title) navigates to product detail.
 */
export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      <Link to={`/products/${product.id}`} className="flex flex-col flex-1">
        <div className="aspect-square w-full bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-medium text-[18px] leading-tight text-gray-900 line-clamp-2 mb-1">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-2 flex-1">
            {product.description}
          </p>
          <p className="font-bold text-lg text-primary mb-3">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full text-base font-medium text-white bg-primary rounded-full py-3 hover:bg-primaryHover transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
