import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AddressSelector from '@/components/AddressSelector';

interface RequestDeliverySheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  selectedAction: string | null;
  lastDelivery: any;
}

const RequestDeliverySheet = ({ isOpen, onClose, onConfirm, selectedAction, lastDelivery }: RequestDeliverySheetProps) => {
  const [pickup, setPickup] = useState(lastDelivery?.dropoff || '');
  const [dropoff, setDropoff] = useState('');
  const [description, setDescription] = useState('');
  const [showPickupSelector, setShowPickupSelector] = useState(false);
  const [showDropoffSelector, setShowDropoffSelector] = useState(false);

  const handleConfirm = () => {
    if (pickup && dropoff) {
      onConfirm({
        pickup,
        dropoff,
        description,
        actionType: selectedAction || 'custom'
      });
      setDropoff('');
      setDescription('');
    }
  };

  const handleSelectPickup = (address: string) => {
    setPickup(address);
    setShowPickupSelector(false);
  };

  const handleSelectDropoff = (address: string) => {
    setDropoff(address);
    setShowDropoffSelector(false);
  };

  return (
    <div className={`fixed inset-0 z-50 transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-2xl p-6 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Request Delivery</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Pickup Location */}
        <div>
          <Label htmlFor="pickup">Pickup Location</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup address"
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPickupSelector(true)}
              className="px-3"
            >
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Drop-off Location */}
        <div>
          <Label htmlFor="dropoff">Drop-off Location</Label>
          <div className="flex gap-2 mt-1">
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
              onClick={() => setShowDropoffSelector(true)}
              className="px-3"
            >
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Delivery Description */}
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

        {/* Estimated Fare */}
        {pickup && dropoff && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-800">Estimated Fare</h3>
                <p className="text-xs text-blue-700">Based on distance and time</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-800">$10.00 - $15.00</p>
                <p className="text-xs text-blue-600">~20-30 min</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!pickup || !dropoff} className="flex-1">
            Confirm Delivery
          </Button>
        </div>
      </div>

      {/* Address Selectors */}
      <AddressSelector
        isOpen={showPickupSelector}
        onClose={() => setShowPickupSelector(false)}
        onSelectAddress={handleSelectPickup}
        title="Select Pickup Address"
      />
      <AddressSelector
        isOpen={showDropoffSelector}
        onClose={() => setShowDropoffSelector(false)}
        onSelectAddress={handleSelectDropoff}
        title="Select Drop-off Address"
      />
    </div>
    </div>
  );
};

export default RequestDeliverySheet;
