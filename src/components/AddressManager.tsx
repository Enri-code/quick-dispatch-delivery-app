
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Home, Package, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({ label: '', address: '', type: 'other' as const });

  const handleAdd = () => {
    if (formData.label && formData.address) {
      const newAddress: Address = {
        id: Date.now(),
        label: formData.label,
        address: formData.address,
        type: formData.type
      };
      onAddressChange([...addresses, newAddress]);
      setFormData({ label: '', address: '', type: 'other' });
      setShowAddDialog(false);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({ label: address.label, address: address.address, type: address.type });
    setShowAddDialog(true);
  };

  const handleUpdate = () => {
    if (editingAddress && formData.label && formData.address) {
      const updatedAddresses = addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...addr, label: formData.label, address: formData.address, type: formData.type }
          : addr
      );
      onAddressChange(updatedAddresses);
      setEditingAddress(null);
      setFormData({ label: '', address: '', type: 'other' });
      setShowAddDialog(false);
    }
  };

  const handleDelete = (addressId: number) => {
    const filteredAddresses = addresses.filter(addr => addr.id !== addressId);
    onAddressChange(filteredAddresses);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="w-4 h-4 text-blue-600" />;
      case 'work': return <Package className="w-4 h-4 text-blue-600" />;
      default: return <MapPin className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Saved Addresses</h3>
        <Button variant="outline" size="sm" onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>
      
      <div className="space-y-3">
        {addresses.map((addr) => (
          <div key={addr.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                {getTypeIcon(addr.type)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm">{addr.label}</p>
                <p className="text-xs text-gray-600 truncate">{addr.address}</p>
              </div>
            </div>
            <div className="flex gap-1 ml-2 flex-shrink-0">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={() => handleEdit(addr)}
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={() => handleDelete(addr.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                placeholder="e.g., Home, Office"
                value={formData.label}
                onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter full address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
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
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setShowAddDialog(false);
                  setEditingAddress(null);
                  setFormData({ label: '', address: '', type: 'other' });
                }}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={editingAddress ? handleUpdate : handleAdd}
              >
                {editingAddress ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddressManager;
