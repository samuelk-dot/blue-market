import React, { useState } from 'react';
import { ShoppingBag, PlusCircle, Sliders, Menu, X, Shield, User, Heart, MessageCircle } from 'lucide-react';
import { CommissionSettings, CustomerUser } from '../types/marketplace';

interface MarketplaceNavbarProps {
  settings: CommissionSettings;
  cartCount: number;
  savedCount: number;
  currentUser: CustomerUser | null;
  onOpenCart: () => void;
  onOpenSellModal: () => void;
  onOpenDevStudio: () => void;
  onOpenCustomerDashboard: () => void;
}

export const MarketplaceNavbar: React.FC<MarketplaceNavbarProps> = ({
  settings,
  cartCount,
  savedCount,
  currentUser,
  onOpenCart,
  onOpenSellModal,
  onOpenDevStudio,
  onOpenCustomerDashboard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-950/90 border-b border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Brand wordmark with blue accent & African tag */}
        <a 
          href="#" 
          className="font-display text-xl font-bold tracking-tight text-white hover:text-blue-200 transition-colors flex items-center gap-2.5"
        >
          <span className="w-3 h-3 rounded-full bg-blue-500 shadow-md shadow-blue-500/80 animate-pulse" />
          <span className="text-white">{settings.marketplaceName}</span>
          <span className="hidden sm:inline-block text-[10px] font-mono-code px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800/60">
            {settings.currencySymbol} · {settings.ratePercentage}% Comm
          </span>
        </a>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a href="#store" className="hover:text-blue-400 transition-colors">Marketplace Corners</a>
          <a href="#sell" onClick={(e) => { e.preventDefault(); onOpenSellModal(); }} className="hover:text-blue-400 transition-colors">List an Item</a>
          <a href="#commission" className="hover:text-blue-400 transition-colors">Commission Engine</a>
          <a href="#protection" className="hover:text-blue-400 transition-colors">M-Pesa Escrow</a>
        </nav>

        {/* Zone 3: Primary action cluster */}
        <div className="flex items-center gap-2.5">
          
          {/* List to Sell */}
          <button
            onClick={onOpenSellModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 text-blue-300 border border-blue-800/60 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>List to Sell</span>
          </button>

          {/* Customer Sign-in / Dashboard */}
          <button
            onClick={onOpenCustomerDashboard}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              currentUser
                ? 'bg-blue-950/60 text-blue-300 border-blue-700'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-800'
            }`}
            title="Customer Sign In & Dashboard"
          >
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">
              {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
            </span>
            {savedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-600 text-white font-mono-code text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Shopping Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-blue-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white font-mono-code text-[11px] font-bold flex items-center justify-center shadow-lg shadow-blue-600/50">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Studio */}
          <button
            onClick={onOpenDevStudio}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all cursor-pointer whitespace-nowrap"
            title="Open Developer & Commission Studio"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Admin</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-blue-900/40 bg-neutral-950 px-4 pt-3 pb-5 space-y-3">
          <a
            href="#store"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white py-1.5"
          >
            Browse All Corners (Vehicles, Bikes, Spares, Electronics, Fashion)
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCustomerDashboard();
            }}
            className="w-full text-left text-sm font-medium text-blue-400 hover:text-blue-300 py-1.5 flex items-center justify-between"
          >
            <span>Customer Dashboard & Saved Wishlist</span>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 text-xs font-mono-code">
                {savedCount} Saved
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSellModal();
            }}
            className="w-full text-left text-sm font-medium text-blue-400 hover:text-blue-300 py-1.5"
          >
            + List an Item to Sell (Earn Payout)
          </button>
          <a
            href="#commission"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white py-1.5"
          >
            Commission Engine & Calculator
          </a>
          <a
            href="#protection"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white py-1.5"
          >
            M-Pesa & Escrow Buyer Shield
          </a>
        </div>
      )}
    </header>
  );
};
