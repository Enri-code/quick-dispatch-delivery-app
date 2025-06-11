
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Package, Clock, Star, User, Home as HomeIcon, Eye, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CallRiderSheet from '@/components/CallRiderSheet';
import RequestDeliverySheet from '@/components/RequestDeliverySheet';
import OrderDetails from '@/components/OrderDetails';
import BottomNavigation from '@/components/BottomNavigation';
import LiveMap from '@/components/LiveMap';
import DeliveryNotification from '@/components/DeliveryNotification';
import OrdersPage from '@/components/OrdersPage';
import BottomActionSheet from '@/components/BottomActionSheet';
import RiderDialog from '@/components/RiderDialog';
import RiderArrivedSheet from '@/components/RiderArrivedSheet';
import RateDeliverySheet from '@/components/RateDeliverySheet';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showCallRider, setShowCallRider] = useState(false);
  const [showRequestDelivery, setShowRequestDelivery] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showRiderDialog, setShowRiderDialog] = useState(false);
  const [showRiderArrived, setShowRiderArrived] = useState(false);
  const [showRateDelivery, setShowRateDelivery] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRider, setSelectedRider] = useState(null);
  const [activeDelivery, setActiveDelivery] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      title: 'Lunch from Tony\'s Pizza', 
      time: '2 hours ago', 
      rating: 4.8, 
      status: 'delivered',
      rider: 'Alex',
      riderCompany: 'FastRide Co.',
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
      riderCompany: 'QuickDelivery',
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
      riderCompany: 'SpeedyDispatch',
      eta: '15 min',
      pickup: 'Downtown Office, 5th St',
      dropoff: 'City Hall, Center Ave',
      actionType: 'errand'
    },
  ]);

  const { toast } = useToast();

  const inProgressDeliveries = orders.filter(order => 
    ['in_progress', 'rider_accepted'].includes(order.status)
  );

  useEffect(() => {
    if (activeDelivery) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeDelivery]);

  const handleRiderClick = (rider) => {
    setSelectedRider(rider);
    setShowRiderDialog(true);
  };

  const handleActionClick = (actionId) => {
    setSelectedAction(actionId);
    setShowRequestDelivery(true);
  };

  const getLastDelivery = () => {
    return orders.find(order => order.status === 'delivered') || null;
  };

  const handleDeliveryConfirm = (data) => {
    // Create new order with waiting status
    const newOrder = {
      id: Date.now(),
      title: data.description || 'New Delivery',
      time: 'just now',
      rating: null,
      status: 'waiting_for_rider',
      rider: null,
      eta: null,
      pickup: data.pickup,
      dropoff: data.dropoff,
      actionType: data.actionType || 'delivery'
    };

    setOrders(prev => [newOrder, ...prev]);
    
    // Show waiting notification
    toast({
      title: "Delivery Requested",
      description: "Looking for available riders nearby...",
    });

    // Simulate rider acceptance after 5 seconds
    setTimeout(() => {
      const riderNames = ['Alex', 'Maria', 'David', 'Sarah', 'Mike'];
      const randomRider = riderNames[Math.floor(Math.random() * riderNames.length)];
      
      // Update order status
      setOrders(prev => prev.map(order => 
        order.id === newOrder.id 
          ? { ...order, status: 'rider_accepted', rider: randomRider, eta: '12 min' }
          : order
      ));

      // Show rider accepted notification
      toast({
        title: "Rider Found!",
        description: `${randomRider} has accepted your delivery request`,
      });

      // Set active delivery for map notification
      setActiveDelivery({
        ...newOrder,
        rider: randomRider,
        eta: '12 min',
        status: 'rider_accepted'
      });

      // After another 3 seconds, change to in progress
      setTimeout(() => {
        setOrders(prev => prev.map(order => 
          order.id === newOrder.id 
            ? { ...order, status: 'in_progress', eta: '8 min' }
            : order
        ));
      }, 3000);
    }, 5000);
  };

  if (activeTab === 'orders') {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <OrdersPage 
            orders={orders} 
            onOrderClick={(order) => { setSelectedOrder(order); setShowOrderDetails(true); }}
          />
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <OrderDetails 
          isOpen={showOrderDetails} 
          onClose={() => setShowOrderDetails(false)} 
          order={selectedOrder} 
        />
      </div>
    );
  }

  if (activeTab === 'profile') {
    return (
      <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
        <div className="flex-1 overflow-auto p-4 pt-8">
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
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 relative">
      {/* Delivery In Progress Notification */}
      {inProgressDeliveries.length > 0 && (
        <div className="absolute top-4 left-4 right-4 z-50">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-2">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {inProgressDeliveries[0].rider} • ETA {inProgressDeliveries[0].eta}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    📍 {inProgressDeliveries[0].pickup} → {inProgressDeliveries[0].dropoff}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 ml-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setActiveTab('orders');
                  }}
                  className="h-6 px-2 text-xs"
                >
                  <List className="w-3 h-3 mr-1" />
                  All
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-6 px-2 text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Map - takes remaining space above bottom sheet */}
      <div className="flex-1 relative">
        <LiveMap onRiderClick={handleRiderClick} />
      </div>

      {/* Delivery Notification */}
      {showNotification && activeDelivery && (
        <DeliveryNotification 
          delivery={activeDelivery} 
          onDismiss={() => setShowNotification(false)}
        />
      )}

      {/* Fixed Bottom Action Sheet */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <BottomActionSheet 
          onCallRider={() => setShowCallRider(true)}
          onRequestDelivery={() => setShowRequestDelivery(true)}
          onActionClick={handleActionClick}
        />
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
          handleDeliveryConfirm(data);
          setShowRequestDelivery(false);
          setSelectedAction(null);
        }}
        selectedAction={selectedAction}
        lastDelivery={getLastDelivery()}
      />

      <RiderDialog 
        isOpen={showRiderDialog}
        onClose={() => setShowRiderDialog(false)}
        rider={selectedRider}
        onSendOrder={(data) => {
          handleDeliveryConfirm(data);
          setShowRiderDialog(false);
        }}
      />

      <RiderArrivedSheet 
        isOpen={showRiderArrived}
        onClose={() => setShowRiderArrived(false)}
        delivery={selectedOrder}
        onMarkDelivered={() => {
          setShowRiderArrived(false);
          setShowRateDelivery(true);
        }}
      />

      <RateDeliverySheet 
        isOpen={showRateDelivery}
        onClose={() => setShowRateDelivery(false)}
        delivery={selectedOrder}
        onSubmitRating={(rating) => {
          // Update order with rating
          setOrders(prev => prev.map(order => 
            order.id === selectedOrder?.id 
              ? { ...order, status: 'delivered', rating }
              : order
          ));
          setShowRateDelivery(false);
        }}
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
