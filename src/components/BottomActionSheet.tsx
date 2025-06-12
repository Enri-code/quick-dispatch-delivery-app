
import React from 'react';
import { Phone, Package, Clock, User, Repeat, Utensils, ShoppingCart, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomActionSheetProps {
  onCallRider: () => void;
  onRequestDelivery: () => void;
  onActionClick: (actionId: string) => void;
}

const BottomActionSheet = ({ onCallRider, onRequestDelivery, onActionClick }: BottomActionSheetProps) => {
  const quickActions = [
    { id: 'last', label: 'Repeat Delivery', icon: Repeat, color: 'bg-purple-500' },
    { id: 'food', label: 'Food', icon: Utensils, color: 'bg-orange-500' },
    { id: 'groceries', label: 'Groceries', icon: ShoppingCart, color: 'bg-green-500' },
    { id: 'errand', label: 'Errand', icon: FileText, color: 'bg-blue-500' },
  ];

  return (
    <div className="bg-white">
      {/* Quick Actions */}
      <div className="px-3 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="flex flex-col items-center p-2 rounded-xl hover:bg-gray-50 transition-colors"
              onClick={() => onActionClick(action.id)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${action.color}`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={onCallRider}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl shadow-md flex items-center justify-center space-x-2"
          >
            <Phone className="w-4 h-4" />
            <span className="font-medium text-sm">Call Rider</span>
          </Button>
          
          <Button
            onClick={onRequestDelivery}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl shadow-md flex items-center justify-center space-x-2"
          >
            <Package className="w-4 h-4" />
            <span className="font-medium text-sm">Delivery</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomActionSheet;
