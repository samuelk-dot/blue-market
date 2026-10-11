import React, { useState } from 'react';
import { X, Check, Copy, Share2, Send, MessageCircle } from 'lucide-react';
import { ProductItem, CommissionSettings } from '../types/marketplace';

interface ShareModalProps {
  product: ProductItem | null;
  settings: CommissionSettings;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ product, settings, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-dev-6te3zc73v43xvu7kdv3rp4-356409252599.europe-west2.run.app';
  const shareLink = product.isAffiliate && product.affiliateLink ? product.affiliateLink : `${currentUrl}#item-${product.id}`;

  const messageText = `Check out "${product.title}" on ${settings.marketplaceName} for ${settings.currencySymbol}${product.price}! ${product.isAffiliate ? `(Affiliate Deal - ${product.affiliateRate}% commission)` : '(Escrow Protected)'} Check it out here: ${shareLink}`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(messageText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(messageText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">Share & Earn Commission</h3>
              <p className="text-xs text-neutral-400">Promote this product across social networks</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex gap-3 items-center">
            <img src={product.image} alt={product.title} className="w-12 h-12 rounded-lg object-cover bg-neutral-900 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{product.title}</p>
              <p className="text-[11px] font-mono-code text-blue-400">
                {settings.currencySymbol}{product.price.toFixed(2)}
                {product.isAffiliate && ` · ${product.affiliateRate}% Affiliate Commission`}
              </p>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="space-y-2.5 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share to WhatsApp Contacts & Groups</span>
            </a>

            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs border border-neutral-700 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 text-blue-400" />
              <span>Share on X / Twitter</span>
            </a>
          </div>

          {/* Copy Link Input */}
          <div className="pt-2">
            <label className="block text-[11px] font-semibold text-neutral-400 font-mono-code uppercase mb-1.5">
              Direct {product.isAffiliate ? 'Affiliate Referral Link' : 'Product Link'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareLink}
                className="flex-1 px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono-code truncate select-all"
              />
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
