
import React, { useState } from 'react';
import { MapPin, X, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AddressSelector from './AddressSelector';

interface RequestDeliverySheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  selectedAction?: string | null;
}

const RequestDeliverySheet = ({ isOpen, onClose, onConfirm, selectedAction }: RequestDeliverySheetProps) => {
  const [pickup, setPickup] = useState('123 Main St, Your City');
  const [dropoff, setDropoff] = useState('');
  const [description, setDescription] = useState('');
  const [showPickupSelector, setShowPickupSelector] = useState(false);
  const [showDropoffSelector, setShowDropoffSelector] = useState(false);

  const handleConfirm = () => {
    onConfirm({
      pickup,
      dropoff,
      description,
      fare: '$12.50',
      actionType: selectedAction
    });
    setDropoff('');
    setDescription('');
  };

  if (!isOpen) return null;

  const getActionLabel = (action: string | null) => {
    const labels = {
      'last': 'Reuse Last Delivery',
      'food': 'Food Delivery',
      'groceries': 'Grocery Delivery',
      'errand': 'Errand Service'
    };
    return action ? labels[action] || 'Delivery' : 'Delivery';
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end">
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />
        <div className="relative w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">📦 Request Delivery</h2>
              {selectedAction && (
                <p className="text-sm text-blue-600">{getActionLabel(selectedAction)}</p>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="pickup">Pickup Location</Label>
              <div className="flex mt-1">
                <Input
                  id="pickup"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2"
                  onClick={() => setShowPickupSelector(true)}
                >
                  📍 Map
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="dropoff">Drop-off Location</Label>
              <div className="flex mt-1">
                <Input
                  id="dropoff"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  placeholder="Enter destination address"
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2"
                  onClick={() => setShowDropoffSelector(true)}
                >
                  📍 Map
                </Button>
              </div>
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
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-800">Fare Estimate</h3>
                    <p className="text-sm text-green-700">Based on distance and demand</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-800">$12.50</p>
                    <p className="text-xs text-green-600">~15 min</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleConfirm}
              disabled={!pickup || !dropoff}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3"
            >
              Confirm Delivery Request
            </Button>
          </div>
        </div>
      </div>

      <AddressSelector
        isOpen={showPickupSelector}
        onClose={() => setShowPickupSelector(false)}
        onSelectAddress={(address) => setPickup(address)}
        title="Select Pickup Location"
      />

      <AddressSelector
        isOpen={showDropoffSelector}
        onClose={() => setShowDropoffSelector(false)}
        onSelectAddress={(address) => setDropoff(address)}
        title="Select Drop-off Location"
      />
    </>
  );
};

export default RequestDeliverySheet;
