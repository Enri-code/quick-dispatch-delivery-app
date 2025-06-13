
import React, { useState } from 'react';
import { Star, Clock, Filter, Download, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import OrdersReport from '@/components/OrdersReport';

interface OrdersPageProps {
  orders: any[];
  onOrderClick: (order: any) => void;
  onRiderClick?: (rider: any) => void;
}

const OrdersPage = ({ orders, onOrderClick, onRiderClick }: OrdersPageProps) => {
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showReport, setShowReport] = useState(false);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'delivered', label: 'Completed' },
  ];

  const filteredOrders = orders.filter(order => {
    // Status filter
    if (filter !== 'all') {
      if (filter === 'delivered' && order.status !== 'delivered') return false;
      if (filter === 'in_progress' && !['in_progress', 'waiting_for_rider', 'rider_accepted'].includes(order.status)) return false;
    }
    
    // Category filter
    if (categoryFilter !== 'all' && order.actionType !== categoryFilter) return false;
    
    return true;
  });

  // Sort to show in progress orders first, then waiting orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const statusPriority = {
      'in_progress': 1,
      'rider_accepted': 2,
      'waiting_for_rider': 3,
      'delivered': 4,
    };
    return (statusPriority[a.status] || 6) - (statusPriority[b.status] || 6);
  });

  const getStatusDisplay = (order) => {
    switch (order.status) {
      case 'waiting_for_rider':
        return { text: 'Looking for rider...', color: 'bg-yellow-500', animate: true };
      case 'rider_accepted':
        return { text: `${order.rider} accepted • ETA ${order.eta}`, color: 'bg-blue-500', animate: false };
      case 'in_progress':
        return { text: `In progress • ETA ${order.eta}`, color: 'bg-blue-500', animate: true };
      case 'delivered':
        return { text: `Delivered ${order.time}`, color: 'bg-green-500', animate: false };
      default:
        return { text: order.time, color: 'bg-gray-400', animate: false };
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
      <div className="flex-1 overflow-auto p-4 pt-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Orders</h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowReport(true)}
          >
            <FileText className="w-4 h-4 mr-2" />
            Report
          </Button>
        </div>

        {/* Filters Row */}
        <div className="flex items-center justify-between gap-3 mb-6">
          {/* Status Filters */}
          <div className="flex gap-2 overflow-x-auto">
            {filters.map((filterOption) => (
              <Button
                key={filterOption.id}
                variant={filter === filterOption.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterOption.id)}
                className="whitespace-nowrap"
              >
                {filterOption.label}
              </Button>
            ))}
          </div>

          {/* Category Filter Dropdown */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="groceries">Groceries</SelectItem>
              <SelectItem value="errand">Errand</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        {sortedOrders.map((order) => {
          const statusDisplay = getStatusDisplay(order);
          return (
            <Card key={order.id} className="p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onOrderClick(order)}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{order.title}</h3>
                    {order.actionType && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {order.actionType}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${statusDisplay.color} ${statusDisplay.animate ? 'animate-pulse' : ''}`} />
                    <p className="text-sm text-gray-600">
                      {statusDisplay.text}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {order.rating && (
                    <>
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{order.rating}</span>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found for the selected filters.</p>
          </div>
        )}
      </div>

      <OrdersReport 
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        orders={orders}
      />
    </div>
  );
};

export default OrdersPage;
