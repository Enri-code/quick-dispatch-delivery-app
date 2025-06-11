
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Package, Clock, Star, User, Home as HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CallRiderSheet from '@/components/CallRiderSheet';
import RequestDeliverySheet from '@/components/RequestDeliverySheet';
import OrderDetails from '@/components/OrderDetails';
import BottomNavigation from '@/components/BottomNavigation';
import LiveMap from '@/components/LiveMap';
import DeliveryNotification from '@/components/DeliveryNotification';
import OrdersPage from '@/components/OrdersPage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showCallRider, setShowCallRider] = useState(false);
  const [showRequestDelivery, setShowRequestDelivery] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeDelivery, setActiveDelivery] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const quickActions = [
    { id: 'last', label: 'Reuse Last Delivery', icon: Clock },
    { id: 'food', label: 'Food', icon: Package },
    { id: 'groceries', label: 'Groceries', icon: Package },
    { id: 'errand', label: 'Errand', icon: Package },
  ];

  const orders = [
    { 
      id: 1, 
      title: 'Lunch from Tony\'s Pizza', 
      time: '2 hours ago', 
      rating: 4.8, 
      status: 'delivered',
      rider: 'Alex',
      eta: null,
      pickup: 'Tony\'s Pizza, Main St',
      dropoff: '123 Main St, Your City',
      actionType: 'food'
    },
    { 
      id: 2, 
      title: 'Grocery Delivery', 
      time: 'yesterday', 
      rating: 5.0, 
      status: 'delivered',
      rider: 'Maria',
      eta: null,
      pickup: 'Fresh Market, Oak Ave',
      dropoff: '123 Main St, Your City',
      actionType: 'groceries'
    },
    { 
      id: 3, 
      title: 'Office Documents', 
      time: 'in progress', 
      rating: null, 
      status: 'in_progress',
      rider: 'David',
      eta: '15 min',
      pickup: 'Downtown Office, 5th St',
      dropoff: 'City Hall, Center Ave',
      actionType: 'errand'
    },
  ];

  useEffect(() => {
    if (activeDelivery) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeDelivery]);

  const handleActionClick = (actionId) => {
    setSelectedAction(actionId);
    setShowRequestDelivery(true);
  };

  if (activeTab === 'orders') {
    return (
      <>
        <OrdersPage 
          orders={orders} 
          onOrderClick={(order) => { setSelectedOrder(order); setShowOrderDetails(true); }}
        />
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <OrderDetails 
          isOpen={showOrderDetails} 
          onClose={() => setShowOrderDetails(false)} 
          order={selectedOrder} 
        />
      </>
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
      {/* Live Map */}
      <LiveMap />

      {/* Delivery Notification */}
      {showNotification && activeDelivery && (
        <DeliveryNotification 
          delivery={activeDelivery} 
          onDismiss={() => setShowNotification(false)}
        />
      )}

      {/* Bottom Action Buttons - side by side */}
      <div className="absolute bottom-20 left-4 right-4 z-10">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setShowCallRider(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl shadow-lg flex items-center justify-center"
          >
            <Phone className="w-5 h-5 mr-2" />
            📞 Call Rider
          </Button>
          
          <Button
            onClick={() => setShowRequestDelivery(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl shadow-lg flex items-center justify-center"
          >
            <Package className="w-5 h-5 mr-2" />
            📦 Delivery
          </Button>
        </div>
      </div>

      {/* Actions - moved below main buttons */}
      <div className="absolute bottom-32 left-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3 text-center">Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                className="flex items-center justify-center p-3 h-auto"
                onClick={() => handleActionClick(action.id)}
              >
                <action.icon className="w-4 h-4 mr-2" />
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Bottom Sheets */}
      <CallRiderSheet 
        isOpen={showCallRider} 
        onClose={() => setShowCallRider(false)}
        onConfirm={(data) => {
          setActiveDelivery({ type: 'quick', actionType: 'call', ...data });
          setShowCallRider(false);
        }}
      />
      
      <RequestDeliverySheet 
        isOpen={showRequestDelivery} 
        onClose={() => {
          setShowRequestDelivery(false);
          setSelectedAction(null);
        }}
        onConfirm={(data) => {
          setActiveDelivery({ type: 'detailed', actionType: selectedAction || 'delivery', ...data });
          setShowRequestDelivery(false);
          setSelectedAction(null);
        }}
        selectedAction={selectedAction}
      />

      <OrderDetails 
        isOpen={showOrderDetails} 
        onClose={() => setShowOrderDetails(false)} 
        order={selectedOrder} 
      />
    </div>
  );
};

export default Index;
