import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../../Context/CartContext';
import { formatPrice } from "../../Utils/formatters"


const CheckoutForm = () => {
  const { cartState, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateShippingInfo = () => {
    const { firstName, lastName, email, address, city, state, zipCode, country } = formData;
    return firstName && lastName && email && address && city && state && zipCode && country;
  };

  const validatePaymentInfo = () => {
    const { cardName, cardNumber, expDate, cvv } = formData;
    return cardName && cardNumber && expDate && cvv;
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (validateShippingInfo()) {
      setActiveStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePaymentInfo()) return;
    
    setIsProcessing(true);
    
    // Simulate API call to process payment
    setTimeout(() => {
      setIsProcessing(false);
      // Order successful
      clearCart();
      navigate('/order-confirmation');
    }, 2000);
  };

  const subtotal = cartState.totalPrice;
  const tax = subtotal * 0.07; // 7% tax
  const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
              activeStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            } mr-2`}>
              1
            </span>
            <span className="font-medium">Shipping</span>
          </div>
          <div className="flex-grow mx-4 h-0.5 bg-gray-200"></div>
          <div className="flex items-center">
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
              activeStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            } mr-2`}>
              2
            </span>
            <span className="font-medium">Payment</span>
          </div>
        </div>
      </div>

      {activeStep === 1 && (
        <form onSubmit={handleContinueToPayment}>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="address" className="block text-gray-700 mb-1">Street Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="col-span-2">
              <label htmlFor="city" className="block text-gray-700 mb-1">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-gray-700 mb-1">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-gray-700 mb-1">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="country" className="block text-gray-700 mb-1">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select Country</option>
              <option value="USA">United States</option>
              <option value="CAN">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AUS">Australia</option>
              <option value="GER">Germany</option>
            </select>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Return to Cart
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center"
            >
              <Truck size={18} className="mr-2" />
              Continue to Payment
            </button>
          </div>
        </form>
      )}

      {activeStep === 2 && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          
          <div className="mb-6">
            <label htmlFor="cardName" className="block text-gray-700 mb-1">Name on Card</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="cardNumber" className="block text-gray-700 mb-1">Card Number</label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                required
                className="input-field pl-10"
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="expDate" className="block text-gray-700 mb-1">Expiration Date</label>
              <input
                type="text"
                id="expDate"
                name="expDate"
                value={formData.expDate}
                onChange={handleChange}
                placeholder="MM/YY"
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                required
                className="input-field"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <ShieldCheck size={20} className="text-green-600 mr-2" />
            <p className="text-sm text-gray-600">Your payment information is secure and encrypted.</p>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Back to Shipping
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="btn-primary flex items-center"
            >
              {isProcessing ? (
                <>
                  <span className="mr-2">Processing...</span>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                </>
              ) : (
                <>
                  <CreditCard size={18} className="mr-2" />
                  Complete Order
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;