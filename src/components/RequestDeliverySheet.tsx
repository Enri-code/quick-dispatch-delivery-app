
import React, { useState, useEffect } from 'react';
import { X, MapPin, Package, Clock, Utensils, ShoppingCart, FileText, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RequestDeliverySheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  selectedAction?: string | null;
  lastDelivery?: any;
}

const RequestDeliverySheet = ({ isOpen, onClose, onConfirm, selectedAction, lastDelivery }: RequestDeliverySheetProps) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedAction === 'last' && lastDelivery) {
      // Pre-fill with last delivery data
      setPickup(lastDelivery.pickup || '');
      setDropoff(lastDelivery.dropoff || '');
      setDescription(lastDelivery.title || '');
    } else {
      // Clear form for new deliveries
      setPickup('');
      setDropoff('');
      setDescription('');
    }
  }, [selectedAction, lastDelivery, isOpen]);

  const getActionConfig = () => {
    switch (selectedAction) {
      case 'food':
        return {
          title: 'Food Delivery',
          icon: Utensils,
          color: 'from-orange-500 to-red-500',
          pickupLabel: 'Restaurant',
          pickupPlaceholder: 'Enter restaurant name or address',
          descriptionPlaceholder: 'Food items or order details'
        };
      case 'groceries':
        return {
          title: 'Grocery Delivery',
          icon: ShoppingCart,
          color: 'from-green-500 to-emerald-500',
          pickupLabel: 'Store/Market',
          pickupPlaceholder: 'Enter store or market name',
          descriptionPlaceholder: 'Grocery items or shopping list'
        };
      case 'errand':
        return {
          title: 'Errand Service',
          icon: FileText,
          color: 'from-blue-500 to-indigo-500',
          pickupLabel: 'Pickup Location',
          pickupPlaceholder: 'Enter pickup address',
          descriptionPlaceholder: 'Describe the errand task'
        };
      case 'last':
        return {
          title: 'Repeat Delivery',
          icon: Repeat,
          color: 'from-purple-500 to-pink-500',
          pickupLabel: 'Pickup Location',
          pickupPlaceholder: 'Enter pickup address',
          descriptionPlaceholder: 'Delivery description'
        };
      default:
        return {
          title: 'Request Delivery',
          icon: Package,
          color: 'from-blue-500 to-green-500',
          pickupLabel: 'Pickup Location',
          pickupPlaceholder: 'Enter pickup address',
          descriptionPlaceholder: 'Describe what needs to be delivered'
        };
    }
  };

  const config = getActionConfig();
  const IconComponent = config.icon;

  const handleConfirm = () => {
    const data = {
      pickup: pickup.trim(),
      dropoff: dropoff.trim(),
      description: description.trim(),
      actionType: selectedAction || 'delivery'
    };

    if (!data.pickup || !data.dropoff) {
      return; // Add validation feedback if needed
    }

    onConfirm(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center mr-3`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{config.title}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {config.pickupLabel}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder={config.pickupPlaceholder}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Drop-off Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Enter drop-off address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={config.descriptionPlaceholder}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {selectedAction === 'last' && lastDelivery && (
            <Card className="p-3 bg-purple-50 border-purple-200">
              <div className="flex items-center text-purple-700">
                <Repeat className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Repeating: {lastDelivery.title}</span>
              </div>
            </Card>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!pickup.trim() || !dropoff.trim()}
              className={`flex-1 bg-gradient-to-r ${config.color} hover:opacity-90 text-white`}
            >
              Confirm Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDeliverySheet;
