
import React from 'react';
import { X, Download, FileSpreadsheet, FileText, TrendingUp, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface OrdersReportProps {
  isOpen: boolean;
  onClose: () => void;
  orders: any[];
}

const OrdersReport = ({ isOpen, onClose, orders }: OrdersReportProps) => {
  if (!isOpen) return null;

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;
  const inProgressOrders = orders.filter(o => o.status === 'in_progress').length;
  const failedOrders = orders.filter(o => o.status === 'failed').length;
  const avgRating = orders.filter(o => o.rating).reduce((sum, o) => sum + o.rating, 0) / orders.filter(o => o.rating).length || 0;

  const actionTypeCounts = orders.reduce((acc, order) => {
    const type = order.actionType || 'other';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const handleDownloadExcel = () => {
    // Simulate Excel download
    const data = orders.map(order => ({
      ID: order.id,
      Title: order.title,
      Status: order.status,
      'Action Type': order.actionType || 'N/A',
      Rider: order.rider || 'N/A',
      Rating: order.rating || 'N/A',
      'Pickup Location': order.pickup,
      'Dropoff Location': order.dropoff,
      Time: order.time
    }));
    
    console.log('Downloading Excel report with data:', data);
    // In real app, would use a library like xlsx to generate actual Excel file
    alert('Excel report downloaded! (simulated)');
  };

  const handleDownloadPDF = () => {
    // Simulate PDF download
    console.log('Downloading PDF report');
    // In real app, would use a library like jsPDF to generate actual PDF
    alert('PDF report downloaded! (simulated)');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Orders Report</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
                <p className="text-sm text-gray-600">Avg Rating</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Status Breakdown */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3">Order Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="text-sm font-medium text-green-600">{completedOrders}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">In Progress</span>
              <span className="text-sm font-medium text-blue-600">{inProgressOrders}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Failed</span>
              <span className="text-sm font-medium text-red-600">{failedOrders}</span>
            </div>
          </div>
        </Card>

        {/* Action Types */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-3">Order Types</h3>
          <div className="space-y-2">
            {Object.entries(actionTypeCounts).map(([type, count]) => (
              <div key={type} className="flex justify-between">
                <span className="text-sm text-gray-600 capitalize">{type}</span>
                <span className="text-sm font-medium">{count as number}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Download Options */}
        <div className="space-y-3">
          <Button
            onClick={handleDownloadExcel}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Download Excel Report
          </Button>
          
          <Button
            onClick={handleDownloadPDF}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            <FileText className="w-4 h-4 mr-2" />
            Download PDF Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrdersReport;
