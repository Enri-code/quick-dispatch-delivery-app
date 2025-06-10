
import React, { useState } from 'react';
import { MapPin, Phone, Package, Clock, Star, User, Home as HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CallRiderSheet from '@/components/CallRiderSheet';
import RequestDeliverySheet from '@/components/RequestDeliverySheet';
import BottomNavigation from '@/components/BottomNavigation';
import LiveMap from '@/components/LiveMap';
import DeliveryStatus from '@/components/DeliveryStatus';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showCallRider, setShowCallRider] = useState(false);
  const [showRequestDelivery, setShowRequestDelivery] = useState(false);
  const [activeDelivery, setActiveDelivery] = useState(null);

  const quickActions = [
    { id: 'last', label: 'Reuse Last Delivery', icon: Clock },
    { id: 'food', label: 'Food', icon: Package },
    { id: 'groceries', label: 'Groceries', icon: Package },
    { id: 'errand', label: 'Errand', icon: Package },
  ];

  if (activeTab === 'orders') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="p-4 pt-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h1>
          <Card className="p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Lunch from Tony's Pizza</h3>
                <p className="text-sm text-gray-600">Delivered 2 hours ago</p>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm">4.8</span>
              </div>
            </div>
          </Card>
          <Card className="p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Grocery Delivery</h3>
                <p className="text-sm text-gray-600">Delivered yesterday</p>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm">5.0</span>
              </div>
            </div>
          </Card>
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  if (activeTab === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="p-4 pt-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
            <p className="text-gray-600">john.doe@email.com</p>
          </div>
          
          <Card className="p-4 mb-4">
            <h3 className="font-semibold mb-2">Delivery Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">47</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">4.9</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Saved Addresses</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <HomeIcon className="w-4 h-4 text-gray-500 mr-3" />
                <div>
                  <p className="font-medium">Home</p>
                  <p className="text-sm text-gray-600">123 Main St, City</p>
                </div>
              </div>
              <div className="flex items-center">
                <Package className="w-4 h-4 text-gray-500 mr-3" />
                <div>
                  <p className="font-medium">Work</p>
                  <p className="text-sm text-gray-600">456 Office Blvd, City</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 pt-8">
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
          <div>
            <h1 className="text-lg font-bold text-gray-800">QuickDeliver</h1>
            <p className="text-sm text-gray-600">📍 123 Main St, Your City</p>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">4.9</span>
          </div>
        </div>
      </div>

      {/* Live Map */}
      <LiveMap />

      {/* Active Delivery Status */}
      {activeDelivery && <DeliveryStatus delivery={activeDelivery} />}

      {/* Quick Actions */}
      <div className="absolute top-32 left-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                className="flex items-center justify-center p-3 h-auto"
                onClick={() => setShowRequestDelivery(true)}
              >
                <action.icon className="w-4 h-4 mr-2" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="absolute bottom-20 left-4 right-4 z-10">
        <div className="space-y-3">
          <Button
            onClick={() => setShowCallRider(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl shadow-lg flex items-center justify-center"
          >
            <Phone className="w-5 h-5 mr-2" />
            📞 Call a Rider
          </Button>
          
          <Button
            onClick={() => setShowRequestDelivery(true)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl shadow-lg flex items-center justify-center"
          >
            <Package className="w-5 h-5 mr-2" />
            📦 Request Delivery
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Bottom Sheets */}
      <CallRiderSheet 
        isOpen={showCallRider} 
        onClose={() => setShowCallRider(false)}
        onConfirm={(data) => {
          setActiveDelivery({ type: 'quick', ...data });
          setShowCallRider(false);
        }}
      />
      
      <RequestDeliverySheet 
        isOpen={showRequestDelivery} 
        onClose={() => setShowRequestDelivery(false)}
        onConfirm={(data) => {
          setActiveDelivery({ type: 'detailed', ...data });
          setShowRequestDelivery(false);
        }}
      />
    </div>
  );
};

export default Index;
