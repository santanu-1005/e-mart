import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { categories } from '../../data/products';
import { formatPrice } from '../../Utils/formatters';

const ProductFilters = ({
  selectedCategory,
  priceRange,
  sortBy,
  onCategoryChange,
  onPriceRangeChange,
  onSortChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const MIN_PRICE = 0;
  const MAX_PRICE = 100000;

  const handlePriceChange = (index, value) => {
    const newRange = [...localPriceRange];
    newRange[index] = value;
    setLocalPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    onPriceRangeChange(localPriceRange);
  };

  const clearAllFilters = () => {
    onCategoryChange(null);
    onPriceRangeChange([MIN_PRICE, MAX_PRICE]);
    onSortChange('featured');
    setLocalPriceRange([MIN_PRICE, MAX_PRICE]);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="mb-8">
      {/* Mobile filter button */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <button
          onClick={toggleFilters}
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded transition-colors"
        >
          <Filter size={18} />
          <span>Filters</span>
        </button>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Mobile filters */}
      {isFilterOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-80 h-full overflow-y-auto shadow-xl transform transition-transform duration-300 slide-in">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={toggleFilters} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onCategoryChange(null);
                      toggleFilters();
                    }}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      selectedCategory === null ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategoryChange(category.name);
                        toggleFilters();
                      }}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        selectedCategory === category.name
                          ? 'bg-blue-100 text-blue-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="px-2">
                  <div className="flex justify-between mb-2">
                    <span>{formatPrice(localPriceRange[0])}</span>
                    <span>{formatPrice(localPriceRange[1])}</span>
                  </div>
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={1000}
                    value={localPriceRange[0]}
                    onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                    className="w-full mb-4"
                  />
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={1000}
                    value={localPriceRange[1]}
                    onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                    className="w-full"
                  />
                  <button
                    onClick={() => {
                      applyPriceFilter();
                      toggleFilters();
                    }}
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
                  >
                    Apply Price Filter
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    onSortChange(e.target.value);
                    toggleFilters();
                  }}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <button
                onClick={() => {
                  clearAllFilters();
                  toggleFilters();
                }}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop filters */}
      <div className="hidden md:block">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Clear All
            </button>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
              <button
                onClick={() => onCategoryChange(null)}
                className={`block w-full text-left px-3 py-2 rounded ${
                  selectedCategory === null ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.name)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    selectedCategory === category.name
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium mb-3">Price Range</h4>
            <div className="px-2">
              <div className="flex justify-between mb-2">
                <span>{formatPrice(localPriceRange[0])}</span>
                <span>{formatPrice(localPriceRange[1])}</span>
              </div>
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={1000}
                value={localPriceRange[0]}
                onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                className="w-full mb-4"
              />
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={1000}
                value={localPriceRange[1]}
                onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                className="w-full"
              />
              <button
                onClick={applyPriceFilter}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
              >
                Apply Price Filter
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Sort By</h4>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
