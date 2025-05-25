import * as React from 'react';
import { CartItem as CartItemType } from '../types';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
}
npm
const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>{item.name}</h3>
          <p className="ml-4">${item.price.toFixed(2)}</p>
        </div>
        
        <div className="flex flex-1 items-center justify-between text-sm">
          <p className="text-gray-600">Кількість {item.quantity}</p>
          <div className="flex">
            <button
              type="button"
              className="text-red-500 hover:text-red-700 transition-colors flex items-center"
              onClick={() => onRemove(item.id)}
            >
              <Trash2 size={16} className="mr-1" />
              <span>Видалити</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;