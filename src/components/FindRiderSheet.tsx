
import React, { useState } from 'react';
import { MapPin, X, Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import AddressSelector from './AddressSelector';

interface FindRiderSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

const FindRiderSheet = ({ isOpen, onClose, onConfirm }: FindRiderSheetProps) => {
  const [pickup, setPickup] = useState('123 Main St, Your City');
  const [dropoff, setDropoff] = useState('');
  const [description, setDescription] = useState('');
  const [selectedRider, setSelectedRider] = useState(null);
  const [showPickupSelector, setShowPickupSelector] = useState(false);
  const [showDropoffSelector, setShowDropoffSelector] = useState(false);

  const nearbyRiders = [
    { id: 1, name: 'Alex', rating: 4.8, distance: '0.2 km', eta: '3 min', rides: 150 },
    { id: 2, name: 'Maria', rating: 4.9, distance: '0.5 km', eta: '5 min', rides: 230 },
    { id: 3, name: 'David', rating: 4.7, distance: '0.8 km', eta: '7 min', rides: 89 },
    { id: 4, name: 'Sarah', rating: 5.0, distance: '1.1 km', eta: '9 min', rides: 340 },
  ];

  const handleSendRequest = () => {
    if (selectedRider && pickup && dropoff) {
      onConfirm({
        pickup,
        dropoff,
        description,
        rider: selectedRider.name,
        fare: '$12.50'
      });
      setDropoff('');
      setDescription('');
      setSelectedRider(null);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-end">
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />
        <div className="relative w-full bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">🔍 Find & Send Request</h2>
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
              <>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-green-800">Estimated Fare</h3>
                      <p className="text-sm text-green-700">Select a rider to send request</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-800">$12.50</p>
                      <p className="text-xs text-green-600">~15 min</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Select Rider</h3>
                  <div className="space-y-2">
                    {nearbyRiders.map((rider) => (
                      <Card 
                        key={rider.id} 
                        className={`p-3 cursor-pointer transition-colors ${
                          selectedRider?.id === rider.id 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedRider(rider)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white font-semibold text-sm">
                                {rider.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{rider.name}</p>
                              <div className="flex items-center text-sm text-gray-600">
                                <Star className="w-3 h-3 text-yellow-500 mr-1" />
                                <span>{rider.rating} • {rider.rides} rides</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <p className="font-medium text-blue-600">{rider.distance}</p>
                            <p className="text-gray-600">{rider.eta}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Button
              onClick={handleSendRequest}
              disabled={!pickup || !dropoff || !selectedRider}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Request to {selectedRider?.name || 'Rider'}
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

export default FindRiderSheet;
