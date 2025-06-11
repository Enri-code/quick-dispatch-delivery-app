
import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface RateDeliverySheetProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: any;
  onSubmitRating: (rating: number, comment?: string) => void;
}

const RateDeliverySheet = ({ isOpen, onClose, delivery, onSubmitRating }: RateDeliverySheetProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmitRating(rating, comment);
      setRating(0);
      setComment('');
    }
  };

  if (!isOpen || !delivery) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full bg-white rounded-t-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">✨ Rate Your Delivery</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Rider Info */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-semibold text-lg">
                {delivery.rider?.charAt(0) || 'R'}
              </span>
            </div>
            <p className="font-semibold text-gray-900">{delivery.rider || 'Your Rider'}</p>
            {delivery.riderCompany && (
              <p className="text-sm text-gray-600">{delivery.riderCompany}</p>
            )}
          </div>

          {/* Rating Stars */}
          <div className="text-center">
            <p className="text-lg font-medium text-gray-800 mb-4">How was your delivery experience?</p>
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-colors"
                >
                  <Star 
                    className={`w-10 h-10 ${
                      star <= rating 
                        ? 'text-yellow-500 fill-yellow-500' 
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600">
                {rating === 5 ? 'Excellent!' : 
                 rating === 4 ? 'Good!' : 
                 rating === 3 ? 'Average' : 
                 rating === 2 ? 'Below Average' : 'Poor'}
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Comments (Optional)
            </label>
            <Textarea
              id="comment"
              placeholder="Tell us about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              Submit Rating
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateDeliverySheet;
