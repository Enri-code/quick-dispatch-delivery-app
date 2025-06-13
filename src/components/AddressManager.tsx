
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Home, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Address {
  id: number;
  label: string;
  address: string;
  type: 'home' | 'work' | 'other';
}

interface AddressManagerProps {
  addresses: Address[];
  onAddressChange: (addresses: Address[]) => void;
}

const AddressManager = ({ addresses, onAddressChange }: AddressManagerProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    label: '',
    address: '',
    type: 'other'
  });

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home': return Home;
      case 'work': return Building;
      default: return MapPin;
    }
  };

  const handleAdd = () => {
    setEditingAddress(null);
    setFormData({ label: '', address: '', type: 'other' });
    setShowDialog(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({ label: address.label, address: address.address, type: address.type });
    setShowDialog(true);
  };

  const handleDelete = (id: number) => {
    onAddressChange(addresses.filter(addr => addr.id !== id));
  };

  const handleSave = () => {
    if (editingAddress) {
      // Edit existing
      onAddressChange(addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...editingAddress, ...formData }
          : addr
      ));
    } else {
      // Add new
      const newAddress: Address = {
        id: Date.now(),
        ...formData
      };
      onAddressChange([...addresses, newAddress]);
    }
    setShowDialog(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Saved Addresses</h3>
        <Button size="sm" onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>
      
      <div className="space-y-2">
        {addresses.map((address) => {
          const IconComponent = getAddressIcon(address.type);
          return (
            <div key={address.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center flex-1 min-w-0">
                <IconComponent className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{address.label}</p>
                  <p className="text-xs text-gray-600 truncate">{address.address}</p>
                </div>
              </div>
              <div className="flex gap-1 ml-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleEdit(address)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleDelete(address.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                placeholder="e.g., Home, Work, Mom's House"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter full address"
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value: 'home' | 'work' | 'other') => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex-1">
                {editingAddress ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressManager;
