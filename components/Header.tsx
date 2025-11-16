
import React from 'react';
import { User } from '../types';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
      <div>
        <h1 className="text-xl font-bold text-brand-blue-dark hidden md:block">Safe Shift AI Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-semibold text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
        </div>
        <button
          onClick={onLogout}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors"
          aria-label="Logout"
        >
          <LogoutIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
