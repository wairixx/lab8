import * as React from 'react';
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);
  const { isAuthenticated } = useAuth();

  // Load cart from localStorage on initial load if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        setItemCount(parsedCart.reduce((acc: number, item: CartItem) => acc + item.quantity, 0));
      }
    } else {
      // Clear cart if user is not authenticated
      setCart([]);
      setItemCount(0);
      localStorage.removeItem('cart');
    }
  }, [isAuthenticated]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated && cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

  const addToCart = (product: Product) => {
    if (!isAuthenticated) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      
      if (existingItem) {
        // Increment quantity if item already exists
        const updatedCart = prevCart.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        setItemCount(prevCount => prevCount + 1);
        return updatedCart;
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: Date.now(),
          productId: product.id,
          quantity: 1,
          name: product.name,
          price: product.price,
          image: product.image
        };
        setItemCount(prevCount => prevCount + 1);
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.id === id);
      if (!itemToRemove) return prevCart;
      
      setItemCount(prevCount => prevCount - itemToRemove.quantity);
      return prevCart.filter(item => item.id !== id);
    });
  };

  const clearCart = () => {
    setCart([]);
    setItemCount(0);
    localStorage.removeItem('cart');
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    itemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};