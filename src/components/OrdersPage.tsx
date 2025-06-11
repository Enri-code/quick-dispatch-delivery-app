
import React, { useState } from 'react';
import { Star, Clock, Filter, Download, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import OrdersReport from '@/components/OrdersReport';

interface OrdersPageProps {
  orders: any[];
  onOrderClick: (order: any) => void;
}

const OrdersPage = ({ orders, onOrderClick }: OrdersPageProps) => {
  const [filter, setFilter] = useState('all');
  const [showReport, setShowReport] = useState(false);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'delivered', label: 'Completed' },
    { id: 'failed', label: 'Failed' },
  ];

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'delivered') return order.status === 'delivered';
    return order.status === filter;
  });

  // Sort to show in progress orders first
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (a.status === 'in_progress' && b.status !== 'in_progress') return -1;
    if (b.status === 'in_progress' && a.status !== 'in_progress') return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="p-4 pt-8">
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

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
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

        {/* Orders List */}
        {sortedOrders.map((order) => (
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
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    order.status === 'delivered' ? 'bg-green-500' : 
                    order.status === 'in_progress' ? 'bg-blue-500 animate-pulse' : 
                    order.status === 'failed' ? 'bg-red-500' : 'bg-gray-400'
                  }`} />
                  <p className="text-sm text-gray-600">
                    {order.status === 'delivered' ? `Delivered ${order.time}` : 
                     order.status === 'in_progress' ? `In progress • ETA ${order.eta}` : 
                     order.status === 'failed' ? `Failed ${order.time}` : order.time}
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
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found for the selected filter.</p>
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
