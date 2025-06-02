import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext.js";
import { useAuth } from "../../Context/AuthContext.js";

const Header = () => {
  const { cartState } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const headerClass = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled || location.pathname !== "/"
      ? "bg-white shadow-md py-2"
      : "bg-transparent py-4"
  }`;

  const textClass =
    isScrolled || location.pathname !== "/" ? "text-gray-800" : "text-white";

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className={`text-2xl font-bold ${textClass}`}>E-MART</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${textClass} hover:text-purple-600 transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`${textClass} hover:text-purple-600 transition-colors`}
            >
              Products
            </Link>
            <Link
              to="/products?category=Electronics"
              className={`${textClass} hover:text-purple-600 transition-colors`}
            >
              Electronics
            </Link>
            <Link
              to="/products?category=Clothing"
              className={`${textClass} hover:text-purple-600 transition-colors`}
            >
              Clothing
            </Link>
          </nav>

          {/* Desktop Search, Cart, and Account */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={toggleSearch}
                className={`${textClass} hover:text-purple-600 transition-colors p-2`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-lg"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
                    >
                      <Search size={18} />
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className={`${textClass} hover:text-purple-600 transition-colors relative p-2`}
            >
              <Heart size={20} />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className={`${textClass} hover:text-purple-600 transition-colors relative p-2`}
            >
              <ShoppingCart size={20} />
              {cartState.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartState.totalItems}
                </span>
              )}
            </Link>

            {/* Account */}
            {isAuthenticated ? (
              <div className="relative group">
                <button
                  className={`${textClass} hover:text-purple-600 transition-colors flex items-center space-x-2 p-2`}
                >
                  <span className="text-sm">{user?.name.split(" ")[0]}</span>
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-purple-50"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-purple-50"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-purple-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className={`${textClass} hover:text-purple-600 transition-colors flex items-center space-x-2 p-2`}
              >
                <span className="text-sm">Sign In</span>
                <User size={20} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleSearch}
              className={`${textClass} p-2`}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={toggleMenu}
              className={`${textClass} p-2`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 py-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full left-0 top-full z-50">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-800 hover:text-purple-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-800 hover:text-purple-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/products?category=Electronics"
                className="text-gray-800 hover:text-purple-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Electronics
              </Link>
              <Link
                to="/products?category=Clothing"
                className="text-gray-800 hover:text-purple-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Clothing
              </Link>

              <div className="border-t border-gray-200 my-2"></div>

              <Link
                to="/wishlist"
                className="text-gray-800 hover:text-purple-600 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={20} className="mr-2" />
                Wishlist
              </Link>

              <Link
                to="/cart"
                className="text-gray-800 hover:text-purple-600 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={20} className="mr-2" />
                Cart {cartState.totalItems > 0 && `(${cartState.totalItems})`}
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-800 hover:text-purple-600 py-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} className="mr-2" />
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="text-gray-800 hover:text-purple-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-800 hover:text-purple-600 py-2 text-left w-full"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="text-gray-800 hover:text-purple-600 py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} className="mr-2" />
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
