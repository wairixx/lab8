import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import { ShoppingCart} from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Handle checkout (this would normally connect to a payment processor)
  const handleCheckout = () => {
    alert('Кошик буде очищено');
    clearCart();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ваш кошик</h1>
        
        {itemCount === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-500 rounded-full mb-4">
              <ShoppingCart size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Кошик пустий</h2>
            <p className="text-gray-600 mb-6">
              Ви нічого не додали
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition-colors"
            >
              Почніть купувати
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {cart.map(item => (
                    <li key={item.id}>
                      <CartItem item={item} onRemove={removeFromCart} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Сума</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleCheckout}
                  className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition-colors"
                >
                  Замовити
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;