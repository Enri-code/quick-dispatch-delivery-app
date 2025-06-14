
import React, { useState } from 'react';
import { X, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AddressSelector from '@/components/AddressSelector';

interface TargetedDeliverySheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  targetRider: any;
}

const TargetedDeliverySheet = ({ isOpen, onClose, onConfirm, targetRider }: TargetedDeliverySheetProps) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [description, setDescription] = useState('');
  const [showPickupSelector, setShowPickupSelector] = useState(false);
  const [showDropoffSelector, setShowDropoffSelector] = useState(false);

  const handleConfirm = () => {
    if (pickup && dropoff && targetRider) {
      onConfirm({
        pickup,
        dropoff,
        description,
        targetRider: targetRider.name,
        riderCompany: targetRider.company
      });
      setPickup('');
      setDropoff('');
      setDescription('');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end">
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />
        <div className="relative w-full bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Request to {targetRider?.name}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Target Rider Info */}
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-semibold text-sm">
                  {targetRider?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-blue-800">{targetRider?.name}</p>
                <p className="text-sm text-blue-600">{targetRider?.company}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
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
                    <h3 className="font-semibold text-green-800">Estimated Fare</h3>
                    <p className="text-sm text-green-700">Request sent to {targetRider?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-800">$12.50</p>
                    <p className="text-xs text-green-600">~15 min</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleConfirm} disabled={!pickup || !dropoff} className="flex-1">
                Send Request
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AddressSelector
        isOpen={showPickupSelector}
        onClose={() => setShowPickupSelector(false)}
        onSelectAddress={(address) => setPickup(address)}
        title="Select Pickup Address"
      />
      <AddressSelector
        isOpen={showDropoffSelector}
        onClose={() => setShowDropoffSelector(false)}
        onSelectAddress={(address) => setDropoff(address)}
        title="Select Drop-off Address"
      />
    </>
  );
};

export default TargetedDeliverySheet;
