import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Lock, CreditCard, Smartphone, Building, ArrowRight, Package, Truck, Wallet } from 'lucide-react';
import { CartItem, CommissionSettings, MarketplaceOrder, CustomerUser } from '../types/marketplace';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  settings: CommissionSettings;
  currentUser: CustomerUser | null;
  onOrderSuccess: (order: MarketplaceOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  settings,
  currentUser,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: currentUser?.name || "Samuel King'uri",
    email: currentUser?.email || 'samuelkinguri13@gmail.com',
    phone: currentUser?.phone || '+254 712 345 678',
    town: currentUser?.deliveryTown || 'Nairobi',
    address: currentUser?.deliveryAddress || 'Westlands Commercial Hub, Floor 2',
    paymentMethod: 'M-Pesa (Lipa na M-Pesa)' as MarketplaceOrder['paymentMethod'],
    deliveryType: 'standard' as 'standard' | 'express'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<MarketplaceOrder | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = formData.deliveryType === 'express' ? settings.deliveryFee * 1.5 : settings.deliveryFee;
  const totalAmount = subtotal + deliveryFee;
  const commissionAmount = (subtotal * settings.ratePercentage) / 100;
  const sellerPayout = subtotal - commissionAmount;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order: MarketplaceOrder = {
        id: `BM-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...items],
        subtotal,
        deliveryFee,
        totalAmount,
        commissionAmount,
        sellerPayout,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        deliveryAddress: formData.address,
        deliveryTown: formData.town,
        paymentMethod: formData.paymentMethod,
        status: 'Order Placed · Awaiting Dispatch'
      };

      setIsProcessing(false);
      setConfirmedOrder(order);
      onOrderSuccess(order);
    }, 1300);
  };

  const handleFinish = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={confirmedOrder ? handleFinish : onClose}
    >
      <div 
        className="bg-neutral-900 border border-blue-900/60 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={confirmedOrder ? handleFinish : onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedOrder ? (
          /* Order Confirmation View */
          <div className="py-6 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Order & Escrow Dispatched!
              </h2>
              <p className="text-xs text-neutral-400 font-mono-code">
                Order Reference: <span className="text-blue-400 font-bold">{confirmedOrder.id}</span>
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs font-mono-code">
              <div className="flex justify-between text-neutral-400">
                <span>Items Subtotal:</span>
                <span className="text-white font-bold">{settings.currencySymbol} {confirmedOrder.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Delivery to {confirmedOrder.deliveryTown}:</span>
                <span className="text-white">{settings.currencySymbol} {confirmedOrder.deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-blue-400 pt-1 border-t border-neutral-900">
                <span>Platform Broker Commission ({settings.ratePercentage}%):</span>
                <span className="font-bold">+{settings.currencySymbol} {confirmedOrder.commissionAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400 text-sm font-bold pt-1 border-t border-neutral-900">
                <span>Total Amount:</span>
                <span>{settings.currencySymbol} {confirmedOrder.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400 pt-1 border-t border-neutral-900">
                <span>Payment Channel:</span>
                <span className="text-white">{confirmedOrder.paymentMethod}</span>
              </div>
            </div>

            {/* M-Pesa Instructions Callout if M-Pesa selected */}
            {confirmedOrder.paymentMethod === 'M-Pesa (Lipa na M-Pesa)' && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50 space-y-1.5 text-xs">
                <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4" />
                  <span>M-Pesa Escrow Payment Instructions</span>
                </p>
                <p className="text-neutral-300">
                  Go to M-Pesa &gt; Lipa na M-Pesa &gt; <strong>Paybill: {settings.mpesaPaybill}</strong> &gt; <strong>Account: {confirmedOrder.id}</strong>. Amount: <strong>{settings.currencySymbol} {confirmedOrder.totalAmount.toLocaleString()}</strong>.
                </p>
              </div>
            )}

            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 text-xs text-neutral-300 space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-400" />
                <span>Courier Dispatch Information</span>
              </p>
              <p className="text-neutral-400">
                Courier will dispatch to <strong>{confirmedOrder.deliveryAddress}, {confirmedOrder.deliveryTown}</strong>. SMS updates will be sent to <strong>{confirmedOrder.customerPhone}</strong>.
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Back to Storefront
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400">
                <Lock className="w-3.5 h-3.5" />
                <span>SECURE AFRICAN ESCROW CHECKOUT</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white">
                Delivery & Payment Verification
              </h2>
              <p className="text-xs text-neutral-400">
                Protected by BlueMarket Escrow. Funds are released only upon successful item delivery and verification.
              </p>
            </div>

            {/* Recipient Details */}
            <div className="space-y-3.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono-code">
                Recipient Details
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Phone Number (M-Pesa / Courier Call)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500 font-mono-code"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Delivery County / Town (Kenya)</label>
                  <select
                    value={formData.town}
                    onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Nairobi">Nairobi (Same-Day / Next-Day)</option>
                    <option value="Mombasa">Mombasa County</option>
                    <option value="Kisumu">Kisumu County</option>
                    <option value="Nakuru">Nakuru County</option>
                    <option value="Eldoret">Eldoret / Uasin Gishu</option>
                    <option value="Kiambu / Thika">Kiambu / Thika</option>
                    <option value="Machakos">Machakos County</option>
                    <option value="Other Regional Center">Other Regional Courier Hub</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Detailed Street Address / Estate / Building</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Westlands, Mpaka Road, Apartment 4B"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Delivery Option */}
            <div className="space-y-2 pt-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono-code">
                Delivery Service
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryType: 'standard' })}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                    formData.deliveryType === 'standard' ? 'bg-blue-950/60 border-blue-500 text-white' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <p className="font-semibold text-white">Standard Courier Delivery</p>
                  <p className="text-neutral-400 text-[11px] font-mono-code mt-0.5">
                    {settings.currencySymbol} {settings.deliveryFee} (1-2 Days)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryType: 'express' })}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                    formData.deliveryType === 'express' ? 'bg-blue-950/60 border-blue-500 text-white' : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <p className="font-semibold text-white">Express Same-Day Dispatch</p>
                  <p className="text-neutral-400 text-[11px] font-mono-code mt-0.5">
                    {settings.currencySymbol} {Math.round(settings.deliveryFee * 1.5)} (Priority)
                  </p>
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono-code">
                Choose Payment Method
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'M-Pesa (Lipa na M-Pesa)', icon: Smartphone, desc: 'Instant Till / Paybill' },
                  { name: 'Pay on Delivery (COD)', icon: Truck, desc: 'Inspect first, pay at door' },
                  { name: 'Bank Transfer (KCB / Equity)', icon: Building, desc: 'Direct wire transfer' },
                  { name: 'PayPal', icon: Wallet, desc: 'International PayPal balance' },
                  { name: 'Card', icon: CreditCard, desc: 'Visa & Mastercard' },
                ].map((channel) => (
                  <button
                    key={channel.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: channel.name as any })}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 text-xs transition-colors cursor-pointer ${
                      formData.paymentMethod === channel.name
                        ? 'bg-blue-950/60 border-blue-500 text-white shadow-sm'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <channel.icon className="w-4 h-4 text-blue-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-white truncate">{channel.name}</p>
                      <p className="text-[10px] text-neutral-400">{channel.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Total & Commission Breakdown */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs font-mono-code">
              <div className="flex justify-between text-neutral-400">
                <span>Items Subtotal:</span>
                <span className="text-white">{settings.currencySymbol} {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Courier Delivery ({formData.town}):</span>
                <span className="text-white">+{settings.currencySymbol} {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-blue-400 pt-1 border-t border-neutral-900">
                <span>Platform Broker Cut ({settings.ratePercentage}%):</span>
                <span>{settings.currencySymbol} {commissionAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400 text-sm font-bold pt-1 border-t border-neutral-900">
                <span>Grand Total:</span>
                <span>{settings.currencySymbol} {totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <span>Confirming Order & Courier Dispatch...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Place Order ({settings.currencySymbol} {totalAmount.toLocaleString()})</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
