
import React from 'react';
import { Phone, Package, Clock, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomActionSheetProps {
  onCallRider: () => void;
  onRequestDelivery: () => void;
  onFindRider: () => void;
  onActionClick: (actionId: string) => void;
}

const BottomActionSheet = ({ onCallRider, onRequestDelivery, onFindRider, onActionClick }: BottomActionSheetProps) => {
  const quickActions = [
    { id: 'last', label: 'Reuse Last', icon: Clock },
    { id: 'food', label: 'Food', icon: Package },
    { id: 'groceries', label: 'Groceries', icon: Package },
    { id: 'errand', label: 'Errand', icon: Package },
  ];

  return (
    <div className="bg-white border-t border-gray-200 shadow-lg">
      {/* Quick Actions */}
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              className="flex flex-col items-center p-3 h-auto space-y-1 hover:bg-blue-50 hover:border-blue-200"
              onClick={() => onActionClick(action.id)}
            >
              <action.icon className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-700">{action.label}</span>
            </Button>
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

        <Button
          onClick={onFindRider}
          variant="outline"
          className="w-full py-3 rounded-xl border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 flex items-center justify-center space-x-2"
        >
          <Search className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-purple-700">Find & Send Request</span>
        </Button>
      </div>
    </div>
  );
};

export default BottomActionSheet;
