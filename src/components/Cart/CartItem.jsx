import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../../Context/CartContext";
import { formatPrice } from "../../Utils/formatters";
import { Link } from "react-router-dom";

const CartItem = ({ product, quantity }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      const newQuantity = quantity + 1;
      updateQuantity(product.id, newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (quantity >= 1) {
      const newQuantity = quantity - 1;
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-200">
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 flex-shrink-0">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
        </Link>
      </div>

      <div className="flex-grow sm:ml-6">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2">
            Category: {product.category}
          </p>
        </Link>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center mb-2 sm:mb-0">
            <button
              onClick={decrementQuantity}
              className={
                "p-1 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100"
              }
            >
              <Minus size={16} className="cursor-pointer" />
            </button>

            <span className="mx-3 w-8 text-center">{quantity}</span>

            <button
              onClick={incrementQuantity}
              disabled={quantity > product.stock}
              className={`p-1 rounded-full border ${
                quantity >= product.stock
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-gray-400 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Plus size={16} className="cursor-pointer" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-semibold">
              {formatPrice(product.price * quantity)}
            </span>
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
              aria-label="Remove item"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
