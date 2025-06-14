
import React from 'react';
import { Phone, Package, Clock, User, Repeat, Utensils, ShoppingCart, FileText, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomActionSheetProps {
  onCallRider: () => void;
  onRequestDelivery: () => void;
  onActionClick: (actionId: string) => void;
}

const BottomActionSheet = ({ onCallRider, onRequestDelivery, onActionClick }: BottomActionSheetProps) => {
  const quickActions = [
    { id: 'last', label: 'Repeat', icon: Repeat, color: 'bg-purple-500' },
    { id: 'food', label: 'Food', icon: Utensils, color: 'bg-orange-500' },
    { id: 'groceries', label: 'Groceries', icon: ShoppingCart, color: 'bg-green-500' },
    { id: 'errand', label: 'Errand', icon: FileText, color: 'bg-blue-500' },
  ];

  return (
    <div className="bg-white border-t border-gray-200 mb-16">
      <div className="px-3 py-2">
        {/* Quick Actions */}
        <h3 className="text-xs font-semibold text-gray-700 mb-2">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="flex flex-col items-center p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => onActionClick(action.id)}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${action.color}`}>
                <action.icon className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={onCallRider}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 rounded-lg shadow-md flex items-center justify-center space-x-2"
            size="sm"
          >
            <Phone className="w-4 h-4" />
            <span className="font-medium text-sm">Call Rider</span>
          </Button>
          
          <Button
            onClick={onRequestDelivery}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded-lg shadow-md flex items-center justify-center space-x-2"
            size="sm"
          >
            <Package className="w-4 h-4" />
            <span className="font-medium text-sm">New Delivery</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomActionSheet;
