
import React, { useState } from 'react';
import { X, MapPin, Home, Building, Search, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (address: string, type: string) => void;
  type: string;
  savedAddresses: any[];
}

const LocationPicker = ({ isOpen, onClose, onSelectLocation, type, savedAddresses }: LocationPickerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const suggestedAddresses = [
    'Current Location (GPS)',
    'Tony\'s Pizza, Main St',
    'Fresh Market, Oak Ave',
    'City Hall, Center Ave',
    'Downtown Office, 5th St',
    'Central Mall, Shopping District',
    'University Campus, College Ave',
    'Airport Terminal, Aviation Blvd',
  ];

  const getAddressIcon = (addressType: string) => {
    switch (addressType) {
      case 'home': return Home;
      case 'work': return Building;
      default: return MapPin;
    }
  };

  const handleLocationSelect = (address: string) => {
    onSelectLocation(address, type);
    onClose();
  };

  const handleMapPick = () => {
    if (selectedLocation) {
      handleLocationSelect(selectedLocation);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-bold">
            Select {type === 'pickup' ? 'Pickup' : 'Drop-off'} Location
          </h2>
        </div>
        <Button 
          onClick={handleMapPick}
          disabled={!selectedLocation}
          size="sm"
          className="bg-blue-500 text-white"
        >
          <Target className="w-4 h-4 mr-1" />
          Use This
        </Button>
      </div>

      {/* Map Area Placeholder */}
      <div className="h-64 bg-gray-100 relative border-b">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Tap on map to select location</p>
            <p className="text-sm text-gray-500">Interactive map would go here</p>
          </div>
        </div>
        
        {/* Center marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a location..."
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Addresses List */}
      <div className="flex-1 overflow-y-auto">
        {/* Saved Addresses */}
        {savedAddresses.length > 0 && (
          <div className="p-4">
            <h3 className="font-semibold mb-3 text-gray-700">Saved Addresses</h3>
            <div className="space-y-2">
              {savedAddresses.map((address) => {
                const IconComponent = getAddressIcon(address.type);
                return (
                  <button
                    key={address.id}
                    onClick={() => handleLocationSelect(address.address)}
                    className="w-full flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <IconComponent className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-medium truncate">{address.label}</p>
                      <p className="text-sm text-gray-600 truncate">{address.address}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Suggested Addresses */}
        <div className="p-4">
          <h3 className="font-semibold mb-3 text-gray-700">Suggested Locations</h3>
          <div className="space-y-2">
            {suggestedAddresses
              .filter(addr => 
                !searchQuery || 
                addr.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((address, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(address)}
                  className="w-full flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                  <p className="font-medium text-left truncate">{address}</p>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
