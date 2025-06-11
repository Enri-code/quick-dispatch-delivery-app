
import React, { useState } from 'react';
import { Star, X, Send, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RiderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rider: any;
  onSendOrder: (data: any) => void;
}

const RiderDialog = ({ isOpen, onClose, rider, onSendOrder }: RiderDialogProps) => {
  const [pickup, setPickup] = useState('123 Main St, Your City');
  const [dropoff, setDropoff] = useState('');
  const [description, setDescription] = useState('');

  const handleSendOrder = () => {
    if (pickup && dropoff && rider) {
      onSendOrder({
        pickup,
        dropoff,
        description,
        rider: rider.name,
        actionType: 'custom'
      });
      setDropoff('');
      setDescription('');
    }
  };

  if (!rider) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {rider.name?.charAt(0)}
              </span>
            </div>
            <div>
              <div>Send Order to {rider.name}</div>
              <div className="text-sm font-normal text-gray-600">{rider.company}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Rider Info */}
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{rider.rating}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">Available</p>
                <p className="text-xs text-gray-600">ETA: {rider.eta}</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div>
            <Label htmlFor="pickup">Pickup Location</Label>
            <Input
              id="pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="dropoff">Drop-off Location</Label>
            <Input
              id="dropoff"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              placeholder="Enter destination address"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Delivery Description</Label>
            <Textarea
              id="description"
              placeholder="What are you delivering?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>

          {pickup && dropoff && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-800">Estimated Fare</h3>
                  <p className="text-xs text-blue-700">Direct request to {rider.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-800">$12.50</p>
                  <p className="text-xs text-blue-600">~{rider.eta}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendOrder}
              disabled={!pickup || !dropoff}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RiderDialog;
