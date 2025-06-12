
import React from 'react';
import { X, MapPin, Star, Phone, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface OrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onCallRider?: () => void;
  onViewRiderLocation?: () => void;
}

const OrderDetails = ({ isOpen, onClose, order, onCallRider, onViewRiderLocation }: OrderDetailsProps) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-lg mb-2">{order.title}</h3>
            <div className="flex items-center mb-3">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                order.status === 'delivered' ? 'bg-green-500' : 
                order.status === 'in_progress' ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
              }`} />
              <span className="text-sm font-medium">
                {order.status === 'delivered' ? 'Delivered' : 
                 order.status === 'in_progress' ? 'In Progress' : 'Unknown Status'}
              </span>
              {order.eta && (
                <span className="text-sm text-gray-600 ml-2">• ETA {order.eta}</span>
              )}
            </div>
            {order.rating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{order.rating}</span>
              </div>
            )}
          </Card>

          {order.rider && (
            <Card className="p-4">
              <h4 className="font-semibold mb-3">Rider Information</h4>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">
                      {order.rider.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{order.rider}</p>
                    {order.riderCompany && (
                      <p className="text-sm text-gray-600">{order.riderCompany}</p>
                    )}
                  </div>
                </div>
                {order.status === 'in_progress' && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={onCallRider}>
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={onViewRiderLocation}>
                      <Map className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          )}

          <Card className="p-4">
            <h4 className="font-semibold mb-3">Delivery Route</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1 mr-3" />
                <div>
                  <p className="text-sm font-medium">Pickup</p>
                  <p className="text-sm text-gray-600">{order.pickup}</p>
                </div>
              </div>
              <div className="ml-1.5 w-0.5 h-4 bg-gray-300" />
              <div className="flex items-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 mr-3" />
                <div>
                  <p className="text-sm font-medium">Drop-off</p>
                  <p className="text-sm text-gray-600">{order.dropoff}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
