import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, Heart, LogOut } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const ProfilePage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Will redirect to auth page
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center">
                <User size={24} />
              </div>
              <div className="ml-4">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-3 py-2 rounded text-left ${
                  activeTab === 'profile' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User size={18} className="mr-3" />
                Profile
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-3 py-2 rounded text-left ${
                  activeTab === 'orders' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Package size={18} className="mr-3" />
                Orders
              </button>
              
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center px-3 py-2 rounded text-left ${
                  activeTab === 'wishlist' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart size={18} className="mr-3" />
                Wishlist
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 rounded text-left text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} className="mr-3" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        defaultValue={user.name.split(' ')[0]}
                        className="input-field"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        defaultValue={user.name.split(' ')[1] || ''}
                        className="input-field"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={user.email}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter your phone number"
                      className="input-field"
                    />
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Address Information</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          placeholder="Enter your street address"
                          className="input-field"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="col-span-2">
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            placeholder="Enter your city"
                            className="input-field"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            placeholder="State"
                            className="input-field"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            id="zip"
                            placeholder="ZIP"
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button type="submit" className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Your Orders</h2>
                
                <div className="text-center py-12">
                  <Package size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-6">When you place an order, it will appear here.</p>
                  <button 
                    onClick={() => navigate('/products')}
                    className="btn-primary"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Your Wishlist</h2>
                
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 mb-6">Save items you like by clicking the heart icon on product pages.</p>
                  <button 
                    onClick={() => navigate('/products')}
                    className="btn-primary"
                  >
                    Explore Products
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;