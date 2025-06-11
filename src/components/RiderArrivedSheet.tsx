
import React from 'react';
import { X, MapPin, Star, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RiderArrivedSheetProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: any;
  onMarkDelivered: () => void;
}

const RiderArrivedSheet = ({ isOpen, onClose, delivery, onMarkDelivered }: RiderArrivedSheetProps) => {
  if (!isOpen || !delivery) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">🎉 Rider Arrived!</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Rider Info */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">
                    {delivery.rider?.charAt(0) || 'R'}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{delivery.rider || 'Rider'}</p>
                  {delivery.riderCompany && (
                    <p className="text-sm text-gray-600">{delivery.riderCompany}</p>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">4.8 • Has arrived at pickup location</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-1 mr-3" />
              <div>
                <p className="text-sm font-medium">Pickup Location</p>
                <p className="text-sm text-gray-600">{delivery.pickup}</p>
              </div>
            </div>
            <div className="ml-1.5 w-0.5 h-4 bg-gray-300" />
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 mr-3" />
              <div>
                <p className="text-sm font-medium">Drop-off Location</p>
                <p className="text-sm text-gray-600">{delivery.dropoff}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-center text-blue-800 font-medium mb-2">
              Your rider has picked up your delivery and is on the way!
            </p>
            <p className="text-center text-sm text-blue-600">
              You'll receive a notification when they arrive at the destination.
            </p>
          </div>

          <Button
            onClick={onMarkDelivered}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Mark as Delivered
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RiderArrivedSheet;
