
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
    { id: 'last', label: 'Repeat Delivery', icon: Repeat, color: 'bg-purple-100 text-purple-600' },
    { id: 'food', label: 'Food', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
    { id: 'groceries', label: 'Groceries', icon: ShoppingCart, color: 'bg-green-100 text-green-600' },
    { id: 'errand', label: 'Errand', icon: FileText, color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <div className="bg-white">
      {/* Quick Actions */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-colors"
              onClick={() => onActionClick(action.id)}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${action.color}`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onCallRider}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl shadow-md flex items-center justify-center space-x-2"
          >
            <Phone className="w-5 h-5" />
            <span className="font-medium">Call Rider</span>
          </Button>
          
          <Button
            onClick={onRequestDelivery}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl shadow-md flex items-center justify-center space-x-2"
          >
            <Package className="w-5 h-5" />
            <span className="font-medium">Delivery</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomActionSheet;
