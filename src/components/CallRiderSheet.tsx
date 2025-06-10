
import React, { useState } from 'react';
import { MapPin, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface CallRiderSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

const CallRiderSheet = ({ isOpen, onClose, onConfirm }: CallRiderSheetProps) => {
  const [description, setDescription] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleConfirm = async () => {
    setIsSearching(true);
    // Simulate finding a rider
    setTimeout(() => {
      onConfirm({
        pickup: '123 Main St, Your City',
        description,
        rider: 'Alex',
        eta: '3 minutes'
      });
      setIsSearching(false);
      setDescription('');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">📞 Call a Rider</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {isSearching ? (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-semibold mb-2">Finding nearest rider...</h3>
            <p className="text-gray-600">This will just take a moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="pickup">Pickup Location</Label>
              <Card className="p-3 mt-1">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm">📍 123 Main St, Your City (Current)</span>
                </div>
              </Card>
            </div>

            <div>
              <Label htmlFor="description">Delivery Description (Optional)</Label>
              <Input
                id="description"
                placeholder="What are you delivering?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Quick Dispatch</h3>
              <p className="text-sm text-blue-700">
                Tap confirm to instantly connect with the nearest available rider. 
                They'll contact you for pickup and delivery details.
              </p>
            </div>

            <Button
              onClick={handleConfirm}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3"
            >
              Confirm & Find Rider
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallRiderSheet;
