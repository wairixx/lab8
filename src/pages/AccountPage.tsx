import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut } from 'lucide-react';

const AccountPage: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 text-center border-b border-gray-200">
            <div className="w-24 h-24 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={40} className="text-pink-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
            <p className="text-gray-600">{currentUser.email}</p>
          </div>
          
          <div className="p-6">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              Вийти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;