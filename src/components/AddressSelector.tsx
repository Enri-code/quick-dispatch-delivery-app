
import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LiveMap from './LiveMap';

interface AddressSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: string) => void;
  title: string;
}

const AddressSelector = ({ isOpen, onClose, onSelectAddress, title }: AddressSelectorProps) => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const suggestedAddresses = [
    '123 Main St, Your City',
    '456 Oak Avenue, Downtown',
    '789 Elm Street, Uptown',
    '321 Pine Road, Midtown',
    '654 Cedar Lane, Westside'
  ];

  const handleConfirm = () => {
    if (selectedAddress) {
      onSelectAddress(selectedAddress);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white z-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <Input
            placeholder="Search for an address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-3"
          />
          
          {selectedAddress && (
            <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">{selectedAddress}</span>
              </div>
              <Button onClick={handleConfirm} size="sm">
                <Check className="w-4 h-4 mr-1" />
                Confirm
              </Button>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <LiveMap />
          
          {/* Tap instruction */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <p className="text-sm text-gray-700 text-center">
                📍 Tap on the map to select a location
              </p>
            </div>
          </div>
        </div>

        {/* Suggested Addresses */}
        <div className="bg-white border-t border-gray-200 p-4 max-h-48 overflow-y-auto">
          <h3 className="font-semibold text-gray-800 mb-3">Suggested Addresses</h3>
          <div className="space-y-2">
            {suggestedAddresses
              .filter(addr => addr.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((address) => (
                <button
                  key={address}
                  onClick={() => setSelectedAddress(address)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedAddress === address 
                      ? 'border-blue-500 bg-blue-50 text-blue-800' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm">{address}</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressSelector;
