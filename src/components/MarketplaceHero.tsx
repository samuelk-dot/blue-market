import React from 'react';
import { ArrowUpRight, ShieldCheck, DollarSign, Sparkles, ChevronRight, ShoppingBag, PlusCircle, Car, Bike, Wrench, Laptop, Shirt } from 'lucide-react';
import { CommissionSettings } from '../types/marketplace';

interface MarketplaceHeroProps {
  settings: CommissionSettings;
  onOpenSellModal: () => void;
}

export const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({ settings, onOpenSellModal }) => {
  return (
    <section className="relative pt-10 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-neutral-950">
      
      {/* Ambient Blue Radial Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[950px] h-[500px] opacity-35 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #2563eb 0%, #1e40af 40%, transparent 75%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle trust kicker without pill wrapper */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-blue-300 mb-6 font-medium font-mono-code">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>AFRICA & KENYA COMMERCE HUB</span>
          <span aria-hidden="true" className="text-blue-700">·</span>
          <span>M-PESA ESCROW & PAY ON DELIVERY</span>
          <span aria-hidden="true" className="text-blue-700">·</span>
          <span>{settings.ratePercentage}% BROKER COMMISSION</span>
        </div>

        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typographic Value Proposition */}
          <div className="lg:col-span-7 space-y-7">
            
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
                Buy and sell vehicles, motorbikes, spares, electronics & fashion.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              From luxury SUVs and commuter motorbikes to genuine automotive spares, high-end laptops, and tailored fashion. Buyers get doorstep delivery with M-Pesa escrow protection; sellers get verified buyers; and the platform earns a transparent <strong className="text-blue-400 font-semibold">{settings.ratePercentage}% commission</strong> or external affiliate revenue.
            </p>

            {/* Corner Quick Navigation Pills */}
            <div className="flex flex-wrap gap-2 text-xs font-medium text-neutral-300">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800">
                <Car className="w-3.5 h-3.5 text-blue-400" />
                <span>Cars & SUVs</span>
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800">
                <Bike className="w-3.5 h-3.5 text-blue-400" />
                <span>Motorbikes</span>
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800">
                <Wrench className="w-3.5 h-3.5 text-blue-400" />
                <span>Spare Parts</span>
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800">
                <Laptop className="w-3.5 h-3.5 text-blue-400" />
                <span>Laptops & Phones</span>
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800">
                <Shirt className="w-3.5 h-3.5 text-blue-400" />
                <span>Fashion & Jewelry</span>
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#store"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-150 shadow-lg shadow-blue-600/30 whitespace-nowrap cursor-pointer"
              >
                <span>Explore All Corners</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenSellModal}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-blue-200 bg-neutral-900 hover:bg-neutral-800 border border-blue-900/60 rounded-lg transition-colors whitespace-nowrap cursor-pointer hover:text-white"
              >
                <PlusCircle className="w-4 h-4 text-blue-400" />
                <span>List an Item to Sell</span>
              </button>
            </div>

            {/* Proof Metrics adjacent to value claim */}
            <div className="pt-8 border-t border-blue-950/80 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <p className="font-mono-code text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {settings.currencySymbol} 28.5M+
                </p>
                <p className="text-xs text-neutral-400 mt-1">Transacted Volume</p>
              </div>

              <div>
                <p className="font-mono-code text-2xl sm:text-3xl font-bold text-blue-400 tabular-nums">
                  {settings.ratePercentage}%
                </p>
                <p className="text-xs text-neutral-400 mt-1">Broker Commission Cut</p>
              </div>

              <div>
                <p className="font-mono-code text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  100%
                </p>
                <p className="text-xs text-neutral-400 mt-1">M-Pesa Escrow Shield</p>
              </div>
            </div>

          </div>

          {/* Right Column: 16:9 Showcase Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-blue-900/50 bg-neutral-900 shadow-2xl shadow-blue-950/50">
              
              <img
                src="/src/assets/images/vehicle_suv_blue_1791460879808.jpg"
                alt="BlueMarket Multi-Corner Vehicle & Tech Showcase"
                className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover transition-transform duration-500 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay with Commission Notification Badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent flex flex-col justify-end p-5">
                <div className="bg-neutral-900/90 backdrop-blur-md border border-blue-800/60 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-code text-neutral-300">
                    <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>M-PESA / PAY ON DELIVERY ESCROW</span>
                    </span>
                    <span className="text-emerald-400">Kenya Insured</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-neutral-800 text-xs">
                    <div>
                      <p className="text-white font-semibold">Vehicle Escrow Verified</p>
                      <p className="text-neutral-400 text-[11px]">NTSA Logbook Inspected</p>
                    </div>
                    <div className="text-right font-mono-code">
                      <p className="text-blue-400 font-bold">+{settings.currencySymbol} 212,500</p>
                      <p className="text-neutral-400 text-[10px]">Broker Commission ({settings.ratePercentage}%)</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Subtle blue accent background frame */}
            <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full rounded-2xl border border-blue-900/40 pointer-events-none hidden sm:block" />
          </div>

        </div>

      </div>
    </section>
  );
};
