import React, { useState } from 'react';
import { X, Star, Check } from 'lucide-react';
import { ProductItem, ProductReview, CustomerUser } from '../types/marketplace';

interface AddReviewModalProps {
  isOpen: boolean;
  product: ProductItem | null;
  currentUser: CustomerUser | null;
  onClose: () => void;
  onSubmitReview: (productId: string, review: ProductReview) => void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  product,
  currentUser,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const review: ProductReview = {
      id: `rev-${Date.now()}`,
      userName: name.trim() || 'Verified Buyer',
      userEmail: email.trim() || 'buyer@example.com',
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onSubmitReview(product.id, review);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-neutral-900 border border-blue-900/60 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">Thank You for Your Rating!</h3>
            <p className="text-xs text-neutral-400">
              Your review for &quot;{product.title}&quot; has been published to the community.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-bold text-white">Rate & Review Product</h3>
              <p className="text-xs text-neutral-400 truncate">{product.title}</p>
            </div>

            {/* Star Selector */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-neutral-300 font-mono-code uppercase">
                Your Rating
              </label>
              <div className="flex gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-neutral-600 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Star 
                      className={`w-6 h-6 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dennis Mwangi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase">
                Review Comments
              </label>
              <textarea
                rows={3}
                required
                placeholder="Share your experience regarding performance, build quality, or delivery speed..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md shadow-blue-600/30"
            >
              Submit Verified Rating
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
