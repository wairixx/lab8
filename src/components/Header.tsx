import * as React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white text-black shadow-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight hover:text-pink-400 transition-colors">
            Магазин
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-indigo-800 transition-colors" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-pink-400 transition-colors">
              Головна
            </Link>
            <Link to="/about" className="hover:text-pink-400 transition-colors">
              Про нас
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/account" className="hover:text-pink-400 transition-colors flex items-center gap-1">
                  <User size={18} />
                  <span>Акаунт</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="bg-pink-200 hover:text-pink-200 px-4 py-2 rounded-md transition-colors"
                >
                  Вийти
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-pink-500 hover:text-pink-200 px-4 py-2 rounded-md transition-colors"
              >
                Вхід
              </Link>
            )}
            <Link 
              to="/cart" 
              className="relative hover:text-pink-400 transition-colors"
            >
              <ShoppingCart size={24} />
              {isAuthenticated && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-4 pb-4">
            <Link 
              to="/" 
              className="hover:bg-indigo-800 py-2 px-4 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="hover:bg-indigo-800 py-2 px-4 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/account" 
                  className="hover:bg-indigo-800 py-2 px-4 rounded-md transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} />
                  <span>Account</span>
                </Link>
                <Link 
                  to="/cart" 
                  className="hover:bg-indigo-800 py-2 px-4 rounded-md transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                  {itemCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="bg-indigo-700 hover:bg-indigo-600 py-2 px-4 rounded-md transition-colors text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-indigo-700 hover:bg-indigo-600 py-2 px-4 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;