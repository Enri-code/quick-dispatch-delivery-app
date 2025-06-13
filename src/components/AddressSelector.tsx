
import React from 'react';
import { X, MapPin, Home, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddressSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: string) => void;
  title: string;
}

const AddressSelector = ({ isOpen, onClose, onSelectAddress, title }: AddressSelectorProps) => {
  const savedAddresses = [
    { id: 1, label: 'Home', address: '123 Main St, Your City', type: 'home' },
    { id: 2, label: 'Work', address: '456 Office Blvd, Downtown', type: 'work' },
    { id: 3, label: 'Gym', address: '789 Fitness Ave, Uptown', type: 'other' },
  ];

  const suggestedAddresses = [
    'Current Location (GPS)',
    'Tony\'s Pizza, Main St',
    'Fresh Market, Oak Ave',
    'City Hall, Center Ave',
    'Downtown Office, 5th St',
  ];

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home': return Home;
      case 'work': return Building;
      default: return MapPin;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-2xl p-6 max-h-[70vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Saved Addresses */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Saved Addresses</h3>
          <div className="space-y-2">
            {savedAddresses.map((address) => {
              const IconComponent = getAddressIcon(address.type);
              return (
                <button
                  key={address.id}
                  onClick={() => onSelectAddress(address.address)}
                  className="w-full flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <IconComponent className="w-5 h-5 text-gray-500 mr-3" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{address.label}</p>
                    <p className="text-sm text-gray-600">{address.address}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Suggested Addresses */}
        <div>
          <h3 className="font-semibold mb-3">Suggested</h3>
          <div className="space-y-2">
            {suggestedAddresses.map((address, index) => (
              <button
                key={index}
                onClick={() => onSelectAddress(address)}
                className="w-full flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                <p className="font-medium text-left">{address}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressSelector;
