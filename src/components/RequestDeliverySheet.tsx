
import React, { useState } from 'react';
import { X, MapPin, Utensils, ShoppingCart, FileText, Package } from 'lucide-react';
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
  savedAddresses: any[];
  onLocationPick: (type: string) => void;
}

const RequestDeliverySheet = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  selectedAction, 
  lastDelivery,
  savedAddresses,
  onLocationPick
}: RequestDeliverySheetProps) => {
  const [pickup, setPickup] = useState(selectedAction === 'last' ? lastDelivery?.pickup || '' : '');
  const [dropoff, setDropoff] = useState(selectedAction === 'last' ? lastDelivery?.dropoff || '' : '');
  const [description, setDescription] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [foodDetails, setFoodDetails] = useState('');
  const [store, setStore] = useState('');
  const [groceryList, setGroceryList] = useState('');
  const [errandDetails, setErrandDetails] = useState('');
  const [showPickupSelector, setShowPickupSelector] = useState(false);
  const [showDropoffSelector, setShowDropoffSelector] = useState(false);

  const getTitle = () => {
    switch (selectedAction) {
      case 'food': return 'Order Food';
      case 'groceries': return 'Buy Groceries';
      case 'errand': return 'Run Errand';
      case 'last': return 'Repeat Last Delivery';
      default: return 'New Delivery';
    }
  };

  const getIcon = () => {
    switch (selectedAction) {
      case 'food': return Utensils;
      case 'groceries': return ShoppingCart;
      case 'errand': return FileText;
      default: return Package;
    }
  };

  const handleConfirm = () => {
    if (pickup && dropoff) {
      const data: any = {
        pickup,
        dropoff,
        actionType: selectedAction || 'delivery'
      };

      switch (selectedAction) {
        case 'food':
          data.description = `Food from ${restaurant}`;
          data.details = foodDetails;
          break;
        case 'groceries':
          data.description = `Groceries from ${store}`;
          data.details = groceryList;
          break;
        case 'errand':
          data.description = 'Errand service';
          data.details = errandDetails;
          break;
        default:
          data.description = description;
          break;
      }

      onConfirm(data);
      // Reset form
      setDropoff('');
      setDescription('');
      setRestaurant('');
      setFoodDetails('');
      setStore('');
      setGroceryList('');
      setErrandDetails('');
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

  const IconComponent = getIcon();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <IconComponent className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">{getTitle()}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      
        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-4">
          {/* Action-specific forms */}
          {selectedAction === 'food' && (
            <div>
              <Label htmlFor="restaurant">Restaurant/Pickup Location</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="restaurant"
                  value={restaurant || pickup}
                  onChange={(e) => {
                    setRestaurant(e.target.value);
                    setPickup(e.target.value);
                  }}
                  placeholder="Enter restaurant name or address"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onLocationPick('pickup')}
                  className="px-3"
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {selectedAction === 'groceries' && (
            <div>
              <Label htmlFor="store">Store/Pickup Location</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="store"
                  value={store || pickup}
                  onChange={(e) => {
                    setStore(e.target.value);
                    setPickup(e.target.value);
                  }}
                  placeholder="Enter store name or address"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onLocationPick('pickup')}
                  className="px-3"
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {(selectedAction === 'errand' || !selectedAction || selectedAction === 'last') && (
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
                  onClick={() => onLocationPick('pickup')}
                  className="px-3"
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

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
                onClick={() => onLocationPick('dropoff')}
                className="px-3"
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Action-specific details */}
          {selectedAction === 'food' && (
            <div>
              <Label htmlFor="foodDetails">Food Order Details</Label>
              <Textarea
                id="foodDetails"
                placeholder="What would you like to order? (e.g., 2x Margherita Pizza, 1x Caesar Salad)"
                value={foodDetails}
                onChange={(e) => setFoodDetails(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          )}

          {selectedAction === 'groceries' && (
            <div>
              <Label htmlFor="groceryList">Shopping List</Label>
              <Textarea
                id="groceryList"
                placeholder="What do you need? (e.g., Milk, Bread, Eggs, Apples)"
                value={groceryList}
                onChange={(e) => setGroceryList(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          )}

          {selectedAction === 'errand' && (
            <div>
              <Label htmlFor="errandDetails">Errand Details</Label>
              <Textarea
                id="errandDetails"
                placeholder="What needs to be done? (e.g., Pick up documents, Drop off package)"
                value={errandDetails}
                onChange={(e) => setErrandDetails(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          )}

          {(!selectedAction || selectedAction === 'last') && (
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
          )}

          {/* Estimated Fare */}
          {pickup && dropoff && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-800">Estimated Fare</h3>
                  <p className="text-xs text-blue-700">Based on distance and time</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-800">$8.00 - $12.00</p>
                  <p className="text-xs text-blue-600">~15-25 min</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t bg-white">
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
