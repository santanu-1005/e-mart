import React from 'react'
import { categories, products } from '../Data/Products';
import ProductCard from '../components/Products/ProductCard';
import { ChevronRight, ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    
    <div className="fade-in">
          {/* Hero Section */}
          <section 
            className="relative bg-cover bg-center h-[600px]"
            style={{ 
              backgroundImage: "url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" 
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            
            <div className="relative container mx-auto px-7  h-full flex items-center">
              <div className="max-w-lg slide-up">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Discover Quality Products For Your Lifestyle
                </h1>
                <p className="text-xl text-gray-200 mb-8">
                  Shop the latest trends with confidence. Fast shipping, easy returns, and secure payment.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 bg-purple">
                  <Link 
                    to="/products" 
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-2xl flex items-center justify-center transition duration-300"
                  >
                    <ShoppingBag size={20} className="mr-2" />
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </section>
    
          {/* Category Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
                <p className="text-gray-600">Find what you're looking for by browsing our collections</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((category) => (
                  <Link 
                    key={category.id} 
                    to={`/products?category=${encodeURIComponent(category.name)}`}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-md h-56">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-6 w-full">
                          <h3 className="text-xl font-bold text-white">{category.name}</h3>
                          <div className="flex items-center mt-2 text-white">
                            <span className="group-hover:mr-2 transition-all duration-300">Shop Now</span>
                            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
    
          {/* Featured Products */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Featured Products</h2>
                <Link 
                  to="/products" 
                  className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                >
                  View All 
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
    
          {/* Benefits Section */}
          <section className="py-12 bg-blue-600 text-white">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-full">
                    <Truck size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Free Shipping</h3>
                    <p className="text-blue-100">On orders over $100</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-full">
                    <RotateCcw size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Easy Returns</h3>
                    <p className="text-blue-100">30-day return policy</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-full">
                    <Shield size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Secure Payment</h3>
                    <p className="text-blue-100">Protected transactions</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white p-3 rounded-full">
                    <ShoppingBag size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Quality Products</h3>
                    <p className="text-blue-100">Curated collections</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
    
          {/* Testimonial/CTA Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Join Thousands of Happy Customers</h2>
                <div className="flex justify-center space-x-2 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-500 text-2xl">★</span>
                  ))}
                </div>
                <p className="text-xl text-gray-600 mb-10 italic">
                  "ShopWave has completely transformed my online shopping experience. The quality of products, fast shipping, and excellent customer service keep me coming back."
                </p>
                <Link to="/products" className="btn-primary text-lg px-8 py-3">
                  Start Shopping Today
                </Link>
              </div>
            </div>
          </section>
        </div>
  )
}

export default HomePage
