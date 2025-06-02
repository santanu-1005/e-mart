import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../../Context/CartContext";
import { formatPrice } from "../../Utils/formatters";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="text-amber-500">
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-amber-500">
          ★
        </span>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          ★
        </span>
      );
    }

    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="ml-1 text-gray-600 text-sm">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <Link to={`/products/${product.id}`} className="block group">
      <div className="product-card bg-white rounded-xl shadow-md transform transition duration-300 group-hover:scale-105 group-hover:shadow-lg h-full overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover object-center transition-transform duration-300"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

          {/* Wishlist Button */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={toggleWishlist}
              className={`p-2 rounded-full ${
                isWishlisted
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700"
              } shadow-md hover:scale-110 transition-transform duration-200 mr-2`}
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </button>
          </div>

          {/* Stock Badges */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              Only {product.stock} left!
            </div>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="text-white font-bold text-xl">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-1">
            {product.name}
          </h3>
          {renderRating(product.rating)}
          <div className="mt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`p-2 rounded-full ${
                product.stock === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              } transition-colors duration-200`}
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
