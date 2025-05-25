import * as React from 'react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-60 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-900 font-bold">${product.price.toFixed(1)}</span>
          <button
            onClick={handleAddToCart}
            className={`flex items-center px-3 py-1 rounded text-sm font-medium transition-colors ${
              isAuthenticated 
                ? 'bg-pink-200 text-white hover:bg-pink-500' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isAuthenticated}
          >
            <ShoppingCart size={16} className="mr-1" />
            {isAuthenticated ? 'Додати в кошик' : 'Ввійти в акаунт'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;