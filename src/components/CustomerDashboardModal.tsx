import React, { useState } from 'react';
import { X, User, Heart, Package, Star, MapPin, Phone, Mail, LogOut, Check, ShoppingBag, MessageCircle, ArrowRight, Trash2 } from 'lucide-react';
import { CustomerUser, ProductItem, MarketplaceOrder, CommissionSettings } from '../types/marketplace';

interface CustomerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CustomerUser | null;
  onLogin: (user: CustomerUser) => void;
  onLogout: () => void;
  savedProducts: ProductItem[];
  orders: MarketplaceOrder[];
  settings: CommissionSettings;
  onRemoveSaved: (productId: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onSelectProduct: (product: ProductItem) => void;
}

export const CustomerDashboardModal: React.FC<CustomerDashboardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  savedProducts,
  orders,
  settings,
  onRemoveSaved,
  onAddToCart,
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'orders' | 'profile'>('saved');
  
  // Login form state
  const [emailInput, setEmailInput] = useState(currentUser?.email || '');
  const [nameInput, setNameInput] = useState(currentUser?.name || '');
  const [phoneInput, setPhoneInput] = useState(currentUser?.phone || '+254 7');
  const [townInput, setTownInput] = useState(currentUser?.deliveryTown || 'Nairobi');
  const [addressInput, setAddressInput] = useState(currentUser?.deliveryAddress || '');

  if (!isOpen) return null;

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    const user: CustomerUser = {
      email: emailInput.trim(),
      name: nameInput.trim() || emailInput.split('@')[0],
      phone: phoneInput.trim() || '+254712345678',
      deliveryTown: townInput,
      deliveryAddress: addressInput.trim() || 'Nairobi Central',
      savedProductIds: currentUser?.savedProductIds || []
    };

    onLogin(user);
  };

  const userOrders = currentUser 
    ? orders.filter(o => o.customerEmail.toLowerCase() === currentUser.email.toLowerCase())
    : [];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-neutral-900 border border-blue-900/60 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!currentUser ? (
          /* Simple Customer Sign-In View */
          <div className="space-y-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-600/40 flex items-center justify-center mb-3">
                <User className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-white">
                Customer Sign In
              </h2>
              <p className="text-xs text-neutral-400">
                Sign in with your email to track saved items, inspect order history, and access quick M-Pesa delivery checkout.
              </p>
            </div>

            <form onSubmit={handleLoginFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. samuel@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Samuel King'uri"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase">
                    Phone (M-Pesa Delivery Alerts)
                  </label>
                  <input
                    type="tel"
                    placeholder="+254 712 345 678"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500 font-mono-code"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase">
                    Delivery Town / County
                  </label>
                  <select
                    value={townInput}
                    onChange={(e) => setTownInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Nairobi">Nairobi (Same-Day Express)</option>
                    <option value="Mombasa">Mombasa County</option>
                    <option value="Kisumu">Kisumu County</option>
                    <option value="Nakuru">Nakuru County</option>
                    <option value="Eldoret">Eldoret / Uasin Gishu</option>
                    <option value="Thika">Thika / Kiambu</option>
                    <option value="Machakos">Machakos County</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase">
                    Specific Street / Estate Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Westlands, Mpaka Road Suite 3"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer mt-2"
              >
                Sign In to Customer Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="space-y-6">
            
            {/* User Profile Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center font-display text-base shadow-md shadow-blue-600/30">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">{currentUser.name}</h3>
                  <p className="text-xs text-neutral-400 font-mono-code">{currentUser.email}</p>
                  <p className="text-[11px] text-blue-400 font-mono-code mt-0.5">
                    Delivery: {currentUser.deliveryTown} ({currentUser.deliveryAddress})
                  </p>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="text-xs text-neutral-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex border-b border-neutral-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('saved')}
                className={`py-2.5 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                  activeTab === 'saved' ? 'border-blue-500 text-white' : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Saved Items ({savedProducts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`py-2.5 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                  activeTab === 'orders' ? 'border-blue-500 text-white' : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Package className="w-3.5 h-3.5 text-blue-400" />
                <span>Order History ({userOrders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`py-2.5 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                  activeTab === 'profile' ? 'border-blue-500 text-white' : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Delivery Settings</span>
              </button>
            </div>

            {/* TAB 1: SAVED ITEMS / WISHLIST */}
            {activeTab === 'saved' && (
              <div className="space-y-4">
                {savedProducts.length === 0 ? (
                  <div className="py-12 text-center text-neutral-400 space-y-2 border border-dashed border-neutral-800 rounded-xl">
                    <Heart className="w-10 h-10 text-neutral-700 mx-auto" />
                    <p className="text-sm font-semibold text-white">No saved items yet</p>
                    <p className="text-xs text-neutral-500">
                      Click the heart icon on any product to save it to your wishlist.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedProducts.map((p) => (
                      <div 
                        key={p.id}
                        className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3.5 hover:border-neutral-700"
                      >
                        <img 
                          src={p.image} 
                          alt={p.title} 
                          className="w-14 h-14 rounded-lg object-cover bg-neutral-900 shrink-0 cursor-pointer"
                          onClick={() => { onSelectProduct(p); onClose(); }}
                        />
                        <div className="min-w-0 flex-1">
                          <p 
                            className="font-semibold text-white text-xs truncate cursor-pointer hover:text-blue-400"
                            onClick={() => { onSelectProduct(p); onClose(); }}
                          >
                            {p.title}
                          </p>
                          <p className="font-mono-code text-blue-400 text-xs font-bold mt-0.5">
                            {settings.currencySymbol} {p.price.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-neutral-400 font-mono-code">{p.category.toUpperCase()} · {p.condition}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onAddToCart(p)}
                            className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 cursor-pointer text-xs flex items-center gap-1"
                            title="Add to cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
                            <span className="hidden sm:inline">Bag</span>
                          </button>

                          <button
                            onClick={() => onRemoveSaved(p.id)}
                            className="p-2 text-neutral-500 hover:text-rose-400 cursor-pointer rounded-lg hover:bg-neutral-900"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: ORDER HISTORY */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {userOrders.length === 0 ? (
                  <div className="py-12 text-center text-neutral-400 space-y-2 border border-dashed border-neutral-800 rounded-xl">
                    <Package className="w-10 h-10 text-neutral-700 mx-auto" />
                    <p className="text-sm font-semibold text-white">No past orders on this email</p>
                    <p className="text-xs text-neutral-500">
                      When you place an order with M-Pesa, Card, or COD, it will be tracked here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 font-mono-code text-xs">
                    {userOrders.map((ord) => (
                      <div key={ord.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                        <div className="flex justify-between items-center text-white">
                          <span className="font-bold text-blue-400">{ord.id}</span>
                          <span className="px-2 py-0.5 rounded text-[11px] bg-blue-950 text-blue-300 border border-blue-800">
                            {ord.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-neutral-400 text-[11px]">
                          <span>Method: {ord.paymentMethod}</span>
                          <span>{ord.date}</span>
                        </div>
                        <div className="text-[11px] text-neutral-300">
                          Destination: {ord.deliveryTown} ({ord.deliveryAddress})
                        </div>
                        <div className="pt-2 border-t border-neutral-900 flex justify-between text-white font-bold">
                          <span>Total Paid:</span>
                          <span className="text-emerald-400">
                            {settings.currencySymbol} {ord.totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: DELIVERY SETTINGS */}
            {activeTab === 'profile' && (
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4 text-xs">
                <h4 className="font-bold text-white text-sm">Delivery & M-Pesa Contact Details</h4>
                <div className="space-y-2 text-neutral-300">
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Name:</span>
                    <span className="font-semibold text-white">{currentUser.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Email:</span>
                    <span className="font-semibold text-white">{currentUser.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">Phone:</span>
                    <span className="font-semibold text-white">{currentUser.phone}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-900">
                    <span className="text-neutral-500">County / Town:</span>
                    <span className="font-semibold text-blue-400">{currentUser.deliveryTown}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-500">Address:</span>
                    <span className="font-semibold text-white">{currentUser.deliveryAddress}</span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-500 font-mono-code pt-2">
                  Standard Kenya courier delivery rate ({settings.currencySymbol} {settings.deliveryFee}) automatically applies upon checkout.
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
