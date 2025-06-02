import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/Products/ProductGrid';
import ProductFilters from '../components/Products/ProductFilters';
import { products, getProductsByCategory, searchProducts } from '../Data/Products';
// import { Product } from '..';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  const searchParam = queryParams.get('search');

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  // Filter and sort products based on criteria
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      let result = [...products];
      
      // Apply category filter
      if (selectedCategory) {
        result = getProductsByCategory(selectedCategory);
      }
      
      // Apply search filter
      if (searchParam) {
        result = searchProducts(searchParam);
      }
      
      // Apply price filter
      result = result.filter(
        (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      // Apply sorting
      switch (sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          // 'featured' - no specific sort, use default
          break;
      }
      
      setFilteredProducts(result);
      setIsLoading(false);
    }, 500);
  }, [selectedCategory, priceRange, sortBy, searchParam]);

  // Update URL when category changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }
    
    // Only update the URL if necessary
    if (location.search !== `?${params.toString()}`) {
      window.history.replaceState(
        null, 
        '', 
        `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
      );
    }
  }, [selectedCategory, location]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {searchParam 
            ? `Search Results for "${searchParam}"` 
            : selectedCategory 
              ? `${selectedCategory}` 
              : 'All Products'}
        </h1>
        {filteredProducts.length > 0 && !isLoading && (
          <p className="text-gray-600 mt-2">{filteredProducts.length} products found</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Mobile filters handled inside the component */}
        <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
          <ProductFilters
            selectedCategory={selectedCategory}
            priceRange={priceRange}
            sortBy={sortBy}
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={handlePriceRangeChange}
            onSortChange={handleSortChange}
          />
        </aside>

        {/* Products Grid */}
        <div className="flex-grow">
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;