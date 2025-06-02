import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import CheckoutForm from '../components/Checkout/Checkoutform';
import { useEffect } from 'react';

const CheckoutPage = () => {
  const { cartState } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartState.items.length === 0) {
      navigate('/cart');
    }
  }, [cartState.items.length, navigate]);

  // Redirect to login if not authenticated (optional)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?redirect=checkout');
    }
  }, [isAuthenticated, navigate]);

  if (cartState.items.length === 0) {
    return null; // Will redirect to cart
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <CheckoutForm />
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            
            <div className="space-y-4 divide-y divide-gray-100">
              {cartState.items.map((item) => (
                <div key={item.product.id} className="flex py-4 first:pt-0">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <h3 className="text-sm font-medium">{item.product.name}</h3>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;