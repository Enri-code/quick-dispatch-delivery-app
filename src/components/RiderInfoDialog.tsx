
import React from 'react';
import { Star, X, Package, MapPin, Calendar, Heart, HeartOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RiderInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rider: any;
  onRequestDelivery?: (rider: any) => void;
  savedRiders?: any[];
  onSaveRider?: (rider: any) => void;
  onUnsaveRider?: (riderId: string) => void;
}

const RiderInfoDialog = ({ 
  isOpen, 
  onClose, 
  rider, 
  onRequestDelivery,
  savedRiders = [],
  onSaveRider,
  onUnsaveRider
}: RiderInfoDialogProps) => {
  if (!rider) return null;

  const isAvailable = Math.random() > 0.3; // Random availability for demo
  const isSaved = savedRiders.some(saved => saved.name === rider.name);

  const handleSaveToggle = () => {
    if (isSaved) {
      onUnsaveRider?.(rider.name);
    } else if (savedRiders.length < 2) {
      onSaveRider?.(rider);
    }
  };

  const handleRequestDelivery = () => {
    onRequestDelivery?.(rider);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {rider.name?.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold">{rider.name}</div>
              <div className="text-sm font-normal text-gray-600">{rider.company}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveToggle}
              disabled={!isSaved && savedRiders.length >= 2}
              className={`${isSaved ? 'text-red-500' : 'text-gray-400'} hover:text-red-600`}
            >
              {isSaved ? <HeartOff className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="font-bold text-lg">{rider.rating}</span>
              </div>
              <p className="text-xs text-gray-600">Rating</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="font-bold text-lg">{rider.rides || 47}</p>
              <p className="text-xs text-gray-600">Rides</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="font-bold text-lg">{rider.eta || '5 min'}</p>
              <p className="text-xs text-gray-600">ETA</p>
            </div>
          </div>

          {/* Status */}
          <div className={`${isAvailable ? 'bg-green-50' : 'bg-red-50'} p-3 rounded-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 ${isAvailable ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-2 ${isAvailable ? 'animate-pulse' : ''}`} />
                <span className={`text-sm font-medium ${isAvailable ? 'text-green-800' : 'text-red-800'}`}>
                  {isAvailable ? 'Available' : 'Busy'}
                </span>
              </div>
              <div className={`flex items-center text-sm ${isAvailable ? 'text-green-700' : 'text-red-700'}`}>
                <MapPin className="w-4 h-4 mr-1" />
                <span>{isAvailable ? 'Nearby' : 'On delivery'}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="font-semibold mb-2">Recent Activity</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">Last delivery</span>
                </div>
                <span className="text-sm text-gray-600">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm">Average rating this month</span>
                </div>
                <span className="text-sm font-medium">{rider.rating}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {isAvailable && onRequestDelivery && (
              <Button 
                className="flex-1 bg-gradient-to-r from-blue-500 to-green-500"
                onClick={handleRequestDelivery}
              >
                <Package className="w-4 h-4 mr-2" />
                New Delivery
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RiderInfoDialog;
