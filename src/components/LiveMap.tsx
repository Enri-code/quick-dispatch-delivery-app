
import React from 'react';
import { MapPin, Star } from 'lucide-react';

interface LiveMapProps {
  onRiderClick?: (rider: any) => void;
}

const LiveMap = ({ onRiderClick }: LiveMapProps) => {
  const riders = [
    { id: 1, name: 'Alex', rating: 4.8, eta: '3 min', x: 30, y: 40, available: true },
    { id: 2, name: 'Maria', rating: 4.9, eta: '5 min', x: 60, y: 60, available: true },
    { id: 3, name: 'David', rating: 4.7, eta: '7 min', x: 45, y: 75, available: false },
    { id: 4, name: 'Sarah', rating: 5.0, eta: '4 min', x: 70, y: 30, available: true },
  ];

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-100 to-blue-200">
      {/* Mock Map Background */}
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Streets */}
          <line x1="0" y1="25" x2="100" y2="25" stroke="#fff" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#fff" strokeWidth="0.8" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="#fff" strokeWidth="0.5" />
          <line x1="25" y1="0" x2="25" y2="100" stroke="#fff" strokeWidth="0.5" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#fff" strokeWidth="0.8" />
          <line x1="75" y1="0" x2="75" y2="100" stroke="#fff" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Your Location */}
      <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse" />
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-800 bg-white/80 px-2 py-1 rounded">
          You
        </div>
      </div>

      {/* Nearby Riders */}
      {riders.map((rider) => (
        <div
          key={rider.id}
          className="absolute cursor-pointer"
          style={{ left: `${rider.x}%`, top: `${rider.y}%`, transform: 'translate(-50%, -50%)' }}
          onClick={() => rider.available && onRiderClick?.(rider)}
        >
          <div className="relative">
            <div className={`w-8 h-8 ${rider.available ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform hover:scale-110`}>
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg min-w-20 text-center">
              <p className="text-xs font-medium text-gray-800">{rider.name}</p>
              <div className="flex items-center justify-center mt-1">
                <Star className="w-3 h-3 text-yellow-500 mr-1" />
                <span className="text-xs text-gray-600">{rider.rating}</span>
              </div>
              <p className={`text-xs font-medium ${rider.available ? 'text-green-600' : 'text-gray-500'}`}>
                {rider.available ? rider.eta : 'Busy'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveMap;
