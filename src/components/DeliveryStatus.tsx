
import React from 'react';
import { MapPin, Clock, Star, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface DeliveryStatusProps {
  delivery: any;
}

const DeliveryStatus = ({ delivery }: DeliveryStatusProps) => {
  return (
    <div className="absolute top-1/2 left-4 right-4 z-20 transform -translate-y-1/2">
      <Card className="p-4 bg-white/95 backdrop-blur-sm shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">
            {delivery.type === 'quick' ? '📞 Rider On The Way' : '📦 Delivery In Progress'}
          </h3>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>

        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-3">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium">
              {delivery.rider || 'Alex'} - Rider
            </p>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm text-gray-600">4.8 • Arriving in {delivery.eta || '3 min'}</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
            <span className="text-gray-600">📍 Pickup: {delivery.pickup}</span>
          </div>
          {delivery.dropoff && (
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-3" />
              <span className="text-gray-600">📍 Dropoff: {delivery.dropoff}</span>
            </div>
          )}
        </div>

        {delivery.fare && (
          <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between">
            <span className="text-sm text-gray-600">Estimated Fare:</span>
            <span className="font-semibold text-green-600">{delivery.fare}</span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DeliveryStatus;
