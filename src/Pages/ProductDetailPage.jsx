import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, products } from '../Data/Products';
import { useCart } from '../Context/CartContext';
import { formatPrice } from '../Utils/formatters';
import ProductCard from '../components/Products/ProductCard';
import toast from 'react-hot-toast';

import {
  Star,
  Truck,
  RotateCcw,
  Shield,
  ShoppingCart,
  Heart,
  ChevronLeft,
} from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getItemQuantity} = useCart();

  const [product, setProduct] = useState(id ? getProductById(Number(id)) : null);
  const [quantity, setQuantity] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const productImages = product
    ? [
        product.image,
        'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=600',
      ]
    : [];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(Number(id));
      setProduct(foundProduct);
      // const cartQuantity = getItemQuantity(Number(id));
      setActiveImageIndex(0);
    }
  }, [id, getItemQuantity]);

const handleAddToCart = () => {
  if (product && quantity > 0) {
    addToCart(product, quantity);
    setQuantity(0);
    toast.success(`${product.name} added to cart!`);
  }
};

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

  const incrementQuantity = () => {
  if (product && quantity < product.stock) {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  }
};

const decrementQuantity = () => {
  if (quantity > 1) {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
  }
  if (quantity === 1) {
    setQuantity(0);
  }
};

  // const incrementQuantity = () => {
  //   if (product && quantity < product.stock) {
  //     setQuantity(quantity + 1);
  //   }
  // };

  // const decrementQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  if (!product && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link to="/products" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="bg-gray-300 h-96 w-full rounded-lg"></div>
            <div className="flex space-x-4 mt-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-20 w-20 rounded"></div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
            <div className="h-10 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-12 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
        <span className="mx-2">/</span>
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-blue-600 transition-colors">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </div>

      <button onClick={() => navigate("/products")} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-6">
        <ChevronLeft size={20} className="mr-1" />
        Back to products
      </button>

      <div className="flex flex-col md:flex-row gap-8 mb-16">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={productImages[activeImageIndex]}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`h-20 w-20 rounded border-2 flex-shrink-0 overflow-hidden ${
                  activeImageIndex === index ? 'border-blue-600' : 'border-transparent'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex text-amber-500 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  className={i < Math.floor(product.rating) ? '' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating.toFixed(1)} ({Math.floor(product.rating * 10)} reviews)
            </span>
          </div>

          <div className="text-2xl font-bold text-gray-900 mb-6">
            {formatPrice(product.price)}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
              product.stock > 5
                ? 'bg-green-100 text-green-800'
                : product.stock > 0
                ? 'bg-orange-100 text-orange-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 5
                ? 'In Stock'
                : product.stock > 0
                ? `Only ${product.stock} left`
                : 'Out of Stock'}
            </span>
          </div>

          <div className="flex items-center mb-6">
            <span className="mr-4 text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={decrementQuantity}
                disabled={quantity < 0}
                className={`px-3 py-1 cursor-pointer ${
                  quantity <= 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                -
              </button>
              <span className="px-3 py-1 border-x  border-gray-300 min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
                className={`px-3 cursor-pointer py-1 ${
                  quantity >= product.stock ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-3 px-6 flex items-center justify-center rounded-xl bg-purple-600 text-white cursor-pointer font-bold ${
                product.stock === 0 
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'btn-primary'
              }`}
            >
              <ShoppingCart size={20} className="mr-2" />
              {getItemQuantity(product.id) > 0 ? 'Update Cart' : 'Add to Cart'}
            </button>

            <button
              onClick={toggleWishlist}
              className={`px-4 py-3 rounded-xl font-medium border cursor-pointer ${
                isWishlisted
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              } flex items-center justify-center transition-colors`}
            >
              <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
            </button>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-start">
              <Truck className="text-gray-500 mr-3 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-medium">Fast Shipping</h4>
                <p className="text-sm text-gray-600">Free shipping on orders over ₹10,000</p>
              </div>
            </div>

            <div className="flex items-start">
              <RotateCcw className="text-gray-500 mr-3 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-medium">Easy Returns</h4>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>

            <div className="flex items-start">
              <Shield className="text-gray-500 mr-3 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-medium">Secure Payment</h4>
                <p className="text-sm text-gray-600">Your payment information is secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
