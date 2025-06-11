
import React from 'react';
import { X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeliveryNotificationProps {
  delivery: any;
  onDismiss: () => void;
}

const DeliveryNotification = ({ delivery, onDismiss }: DeliveryNotificationProps) => {
  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-2">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {delivery.rider || 'Alex'} • ETA {delivery.eta || '3 min'}
              </p>
              <p className="text-xs text-gray-600 truncate">
                📍 {delivery.pickup} → {delivery.dropoff}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDismiss}
            className="ml-2 h-6 w-6 p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryNotification;
