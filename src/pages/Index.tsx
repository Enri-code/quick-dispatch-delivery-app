import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Package, Clock, Star, User, Home as HomeIcon, Eye, List, Map, Plus, Edit, Trash2, Info } from 'lucide-react';
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
import RiderInfoDialog from '@/components/RiderInfoDialog';
import AddressManager from '@/components/AddressManager';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showCallRider, setShowCallRider] = useState(false);
  const [showRequestDelivery, setShowRequestDelivery] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showRiderDialog, setShowRiderDialog] = useState(false);
  const [showRiderArrived, setShowRiderArrived] = useState(false);
  const [showRateDelivery, setShowRateDelivery] = useState(false);
  const [showRiderInfo, setShowRiderInfo] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRider, setSelectedRider] = useState(null);
  const [activeDelivery, setActiveDelivery] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([
    { id: 1, label: 'Home', address: '123 Main St, Your City', type: 'home' },
    { id: 2, label: 'Work', address: '456 Office Blvd, Downtown', type: 'work' },
    { id: 3, label: 'Gym', address: '789 Fitness Ave, Uptown', type: 'other' },
  ]);
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

  const handleRiderInfoClick = (rider) => {
    setSelectedRider(rider);
    setShowRiderInfo(true);
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
      riderCompany: null,
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
      const riderCompanies = ['FastRide Co.', 'QuickDelivery', 'SpeedyDispatch', 'Independent', 'ExpressRiders'];
      const randomRider = riderNames[Math.floor(Math.random() * riderNames.length)];
      const randomCompany = riderCompanies[Math.floor(Math.random() * riderCompanies.length)];
      
      // Update order status
      setOrders(prev => prev.map(order => 
        order.id === newOrder.id 
          ? { ...order, status: 'rider_accepted', rider: randomRider, riderCompany: randomCompany, eta: '12 min' }
          : order
      ));

      // Show rider accepted notification with view button
      toast({
        title: "Rider Found!",
        description: `${randomRider} has accepted your delivery request`,
        action: (
          <Button 
            size="sm" 
            onClick={() => {
              setActiveTab('orders');
              // Set a timeout to allow tab change to complete before opening details
              setTimeout(() => {
                const updatedOrder = orders.find(o => o.id === newOrder.id);
                setSelectedOrder({ ...newOrder, rider: randomRider, riderCompany: randomCompany, eta: '12 min', status: 'rider_accepted' });
                setShowOrderDetails(true);
              }, 100);
            }}
          >
            View
          </Button>
        ),
      });

      // Set active delivery for map notification
      setActiveDelivery({
        ...newOrder,
        rider: randomRider,
        riderCompany: randomCompany,
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

  const handleLocateRider = () => {
    // Switch to home tab to show map
    setActiveTab('home');
    setShowNotification(false);
    
    // You could implement actual rider tracking here
    toast({
      title: "Locating Rider",
      description: "Following rider on map",
    });
  };

  const handleViewInProgressOrders = () => {
    setActiveTab('orders');
    setShowNotification(false);
    
    // If there's an active delivery, show its details after switching tabs
    if (inProgressDeliveries.length > 0) {
      setTimeout(() => {
        setSelectedOrder(inProgressDeliveries[0]);
        setShowOrderDetails(true);
      }, 100);
    }
  };

  const handleCallRider = () => {
    toast({
      title: "Calling Rider",
      description: "Connecting you with the rider...",
    });
  };

  const handleViewRiderLocation = () => {
    setActiveTab('home');
    setShowOrderDetails(false);
    toast({
      title: "Tracking Rider",
      description: "Following rider location on map",
    });
  };

  if (activeTab === 'orders') {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <OrdersPage 
            orders={orders} 
            onOrderClick={(order) => { setSelectedOrder(order); setShowOrderDetails(true); }}
            onRiderClick={handleRiderInfoClick}
          />
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <OrderDetails 
          isOpen={showOrderDetails} 
          onClose={() => setShowOrderDetails(false)} 
          order={selectedOrder}
          onCallRider={handleCallRider}
          onViewRiderLocation={handleViewRiderLocation}
          onRiderClick={handleRiderInfoClick}
        />
        <RiderInfoDialog
          isOpen={showRiderInfo}
          onClose={() => setShowRiderInfo(false)}
          rider={selectedRider}
        />
      </div>
    );
  }

  if (activeTab === 'profile') {
    const recentRiders = [
      { name: 'Alex', company: 'FastRide Co.', rating: 4.8, rides: 23 },
      { name: 'Maria', company: 'QuickDelivery', rating: 5.0, rides: 15 },
      { name: 'David', company: 'SpeedyDispatch', rating: 4.6, rides: 8 },
    ];

    return (
      <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
        <div className="flex-1 overflow-auto p-4 pt-8 pb-safe">
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

          <Card className="p-4 mb-4">
            <h3 className="font-semibold mb-3">Recent Riders</h3>
            <div className="space-y-3">
              {recentRiders.map((rider, index) => (
                <button
                  key={index}
                  onClick={() => handleRiderInfoClick(rider)}
                  className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-xs">
                        {rider.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{rider.name}</p>
                      <p className="text-xs text-gray-600">{rider.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{rider.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">{rider.rides} rides</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <AddressManager 
              addresses={savedAddresses}
              onAddressChange={setSavedAddresses}
            />
          </Card>
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <RiderInfoDialog
          isOpen={showRiderInfo}
          onClose={() => setShowRiderInfo(false)}
          rider={selectedRider}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 relative">
      {/* Safe area padding for mobile browsers */}
      <div className="pt-safe" />
      
      {/* Delivery In Progress Notification */}
      {inProgressDeliveries.length > 0 && (
        <div className="absolute top-4 left-2 right-2 z-50 mt-safe">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 min-w-0">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <MapPin className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {inProgressDeliveries[0].rider} • ETA {inProgressDeliveries[0].eta}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    📍 {inProgressDeliveries[0].pickup?.substring(0, 8)}... → {inProgressDeliveries[0].dropoff?.substring(0, 8)}...
                  </p>
                </div>
              </div>
              <div className="flex gap-1 ml-1 flex-shrink-0">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleViewInProgressOrders}
                  className="h-6 px-1.5 text-xs"
                >
                  <List className="w-3 h-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLocateRider}
                  className="h-6 px-1.5 text-xs"
                >
                  <Map className="w-3 h-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRiderInfoClick({ 
                    name: inProgressDeliveries[0].rider, 
                    company: inProgressDeliveries[0].riderCompany, 
                    rating: 4.8, 
                    eta: inProgressDeliveries[0].eta 
                  })}
                  className="h-6 px-1.5 text-xs"
                >
                  <Info className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Map - takes remaining space above bottom sheets */}
      <div className="flex-1 relative overflow-hidden">
        <LiveMap onRiderClick={handleRiderClick} />
      </div>

      {/* Delivery Notification */}
      {showNotification && activeDelivery && (
        <DeliveryNotification 
          delivery={activeDelivery} 
          onDismiss={() => setShowNotification(false)}
        />
      )}

      {/* Fixed Bottom Action Sheet - positioned above bottom navigation */}
      <div className="flex-shrink-0">
        <BottomActionSheet 
          onCallRider={() => setShowCallRider(true)}
          onRequestDelivery={() => setShowRequestDelivery(true)}
          onActionClick={handleActionClick}
        />
      </div>

      {/* Bottom Navigation with safe area */}
      <div className="pb-safe flex-shrink-0">
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

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
        onCallRider={handleCallRider}
        onViewRiderLocation={handleViewRiderLocation}
        onRiderClick={handleRiderInfoClick}
      />

      <RiderInfoDialog
        isOpen={showRiderInfo}
        onClose={() => setShowRiderInfo(false)}
        rider={selectedRider}
      />
    </div>
  );
};

export default Index;
