
import React, { useState } from 'react';
import { MapPin, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import AddressSelector from './AddressSelector';

interface RequestDeliverySheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

const RequestDeliverySheet = ({ isOpen, onClose, onConfirm }: RequestDeliverySheetProps) => {
  const [pickup, setPickup] = useState('123 Main St, Your City');
  const [dropoff, setDropoff] = useState('');
  const [description, setDescription] = useState('');
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [addressSelectorType, setAddressSelectorType] = useState<'pickup' | 'dropoff'>('pickup');

  const fareEstimate = dropoff ? '$12.50' : '--';
  const estimatedTime = dropoff ? '15-20 min' : '--';

  const handleConfirm = () => {
    onConfirm({
      pickup,
      dropoff,
      description,
      fare: fareEstimate,
      estimatedTime
    });
    setDropoff('');
    setDescription('');
  };

  const openAddressSelector = (type: 'pickup' | 'dropoff') => {
    setAddressSelectorType(type);
    setShowAddressSelector(true);
  };

  const handleAddressSelect = (address: string) => {
    if (addressSelectorType === 'pickup') {
      setPickup(address);
    } else {
      setDropoff(address);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end">
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />
        <div className="relative w-full bg-white rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">📦 Request Delivery</h2>
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
                  onClick={() => openAddressSelector('pickup')}
                >
                  📍 Map
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>

            <div>
              <Label htmlFor="dropoff">Drop-off Location</Label>
              <div className="flex mt-1">
                <Input
                  id="dropoff"
                  placeholder="Enter destination address"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2"
                  onClick={() => openAddressSelector('dropoff')}
                >
                  📍 Map
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="delivery-description">Delivery Description</Label>
              <Input
                id="delivery-description"
                placeholder="What are you delivering?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Fare Estimate */}
            <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50">
              <h3 className="font-semibold text-gray-800 mb-3">Fare Estimate</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">{fareEstimate}</p>
                  <p className="text-sm text-gray-600">Estimated fare</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-blue-600">{estimatedTime}</p>
                  <p className="text-sm text-gray-600">Delivery time</p>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleConfirm}
              disabled={!dropoff.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 disabled:opacity-50"
            >
              Confirm Delivery Request
            </Button>
          </div>
        </div>
      </div>

      <AddressSelector
        isOpen={showAddressSelector}
        onClose={() => setShowAddressSelector(false)}
        onSelectAddress={handleAddressSelect}
        title={addressSelectorType === 'pickup' ? 'Select Pickup Location' : 'Select Drop-off Location'}
      />
    </>
  );
};

export default RequestDeliverySheet;
