import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { CartItem, CommissionSettings } from '../types/marketplace';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  settings: CommissionSettings;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  settings,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const commission = (subtotal * settings.ratePercentage) / 100;
  const sellerPayout = subtotal - commission;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md h-full bg-neutral-900 border-l border-blue-900/60 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-blue-400" />
            <h3 className="font-display text-base font-bold text-white">Your Shopping Bag</h3>
            <span className="text-xs font-mono-code px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-neutral-400">
              <ShoppingBag className="w-12 h-12 text-neutral-700 stroke-[1.5]" />
              <p className="font-display text-base font-semibold text-white">Your bag is empty</p>
              <p className="text-xs text-neutral-500 max-w-xs">
                Explore the verified marketplace catalog and add authentic gear with escrow protection.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
              >
                Browse Store
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div 
                key={product.id}
                className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex gap-3.5 items-center"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 rounded-lg object-cover bg-neutral-900 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{product.title}</p>
                  <p className="text-[11px] font-mono-code text-blue-400 mt-0.5">
                    {settings.currencySymbol} {product.price.toLocaleString()} each
                  </p>
                  <p className="text-[10px] text-neutral-400 truncate">Seller: {product.sellerName}</p>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                      className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono-code text-xs text-white px-1.5">{quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                      className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-between h-full">
                  <p className="font-mono-code text-xs font-bold text-white tabular-nums">
                    {settings.currencySymbol} {(product.price * quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="p-1 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer mt-3"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Transparent Commission Breakdown */}
        {items.length > 0 && (
          <div className="p-5 border-t border-neutral-800 bg-neutral-950 space-y-4">
            <div className="space-y-1.5 text-xs font-mono-code">
              <div className="flex justify-between text-neutral-400">
                <span>Items Subtotal:</span>
                <span className="text-white">{settings.currencySymbol} {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-blue-400">
                <span>Platform Commission ({settings.ratePercentage}%):</span>
                <span>+{settings.currencySymbol} {commission.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Estimated Seller Net:</span>
                <span className="text-emerald-400">{settings.currencySymbol} {sellerPayout.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-neutral-900 flex justify-between text-sm font-bold text-white">
                <span>Total Due:</span>
                <span className="text-blue-400">{settings.currencySymbol} {subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Delivery & Escrow Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 font-mono-code">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Buyer & Seller Escrow Protection</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
