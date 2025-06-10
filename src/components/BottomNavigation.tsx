
import React from 'react';
import { Home, Package, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className={`w-5 h-5 mb-1 ${activeTab === tab.id ? 'text-blue-600' : ''}`} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
