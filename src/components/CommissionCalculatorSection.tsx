import React, { useState } from 'react';
import { DollarSign, Shield, Zap, TrendingUp, CheckCircle, ArrowRight, Sliders } from 'lucide-react';
import { CommissionSettings } from '../types/marketplace';

interface CommissionCalculatorSectionProps {
  settings: CommissionSettings;
  onOpenSellModal: () => void;
  onOpenDevStudio: () => void;
}

export const CommissionCalculatorSection: React.FC<CommissionCalculatorSectionProps> = ({
  settings,
  onOpenSellModal,
  onOpenDevStudio,
}) => {
  const [simulatedPrice, setSimulatedPrice] = useState<number>(settings.currencySymbol === 'KSh' ? 150000 : 1500);

  const brokerCommission = (simulatedPrice * settings.ratePercentage) / 100;
  const escrowFee = (simulatedPrice * settings.escrowFeePercentage) / 100;
  const sellerPayout = simulatedPrice - brokerCommission;

  const minRange = settings.currencySymbol === 'KSh' ? 10000 : 100;
  const maxRange = settings.currencySymbol === 'KSh' ? 5000000 : 50000;
  const stepRange = settings.currencySymbol === 'KSh' ? 10000 : 100;

  return (
    <section id="commission" className="py-20 border-t border-blue-950/60 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 font-mono-code flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Transparent Commission Model</span>
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Fair commissions that power safe African trade.
            </h2>
            <p className="text-sm text-neutral-300">
              No hidden fees, no subscriptions. Sellers list for free and keep 95%+ of their vehicle, tech, or spares revenue. The platform retains a modest {settings.ratePercentage}% commission only when a verified transaction successfully completes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDevStudio}
              className="px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs border border-neutral-700/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span>Configure Rates in Studio</span>
            </button>
          </div>
        </div>

        {/* Interactive Commission Simulator & Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Calculator Slider */}
          <div className="lg:col-span-7 p-7 sm:p-9 rounded-2xl bg-neutral-900/70 border border-blue-900/40 space-y-7 shadow-xl shadow-blue-950/20">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono-code">
                  Simulate Item Sale Price
                </label>
                <span className="font-mono-code text-2xl font-bold text-white tabular-nums">
                  {settings.currencySymbol} {simulatedPrice.toLocaleString()}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={minRange}
                max={maxRange}
                step={stepRange}
                value={simulatedPrice}
                onChange={(e) => setSimulatedPrice(Number(e.target.value))}
                className="w-full h-2 bg-neutral-950 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-neutral-400 font-mono-code mt-1.5">
                <span>{settings.currencySymbol} {minRange.toLocaleString()} min</span>
                <span>{settings.currencySymbol} {(maxRange / 2).toLocaleString()}</span>
                <span>{settings.currencySymbol} {maxRange.toLocaleString()} max</span>
              </div>
            </div>

            {/* Live Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              {/* Card 1: Platform Commission */}
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 space-y-1">
                <p className="text-[11px] font-mono-code text-blue-300 font-medium">
                  PLATFORM COMMISSION ({settings.ratePercentage}%)
                </p>
                <p className="text-xl sm:text-2xl font-bold font-mono-code text-white tabular-nums truncate">
                  {settings.currencySymbol} {brokerCommission.toLocaleString()}
                </p>
                <p className="text-[10px] text-neutral-400">Earned by Platform Broker</p>
              </div>

              {/* Card 2: Seller Net Payout */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <p className="text-[11px] font-mono-code text-emerald-400 font-medium">
                  SELLER NET PAYOUT
                </p>
                <p className="text-xl sm:text-2xl font-bold font-mono-code text-white tabular-nums truncate">
                  {settings.currencySymbol} {sellerPayout.toLocaleString()}
                </p>
                <p className="text-[10px] text-neutral-400">Paid directly to seller</p>
              </div>

              {/* Card 3: Escrow & Fraud Shield */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <p className="text-[11px] font-mono-code text-neutral-400 font-medium">
                  M-PESA ESCROW SHIELD
                </p>
                <p className="text-xl sm:text-2xl font-bold font-mono-code text-white tabular-nums">
                  100%
                </p>
                <p className="text-[10px] text-neutral-400">Locked until delivery inspection</p>
              </div>

            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-neutral-400 max-w-sm">
                Ready to sell your equipment? List it in 60 seconds with no upfront fees.
              </p>
              <button
                onClick={onOpenSellModal}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
              >
                <span>List an Item Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Platform Broker Lifetime Stats & Escrow Guarantee */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-7 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-5">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-blue-400" />
                <span>Broker Earnings Engine</span>
              </h3>

              <div className="space-y-3 text-xs font-mono-code">
                <div className="flex justify-between py-2 border-b border-neutral-800">
                  <span className="text-neutral-400">Platform Owner / Payee:</span>
                  <span className="text-white font-semibold truncate max-w-[200px]">{settings.ownerEmail}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-800">
                  <span className="text-neutral-400">Commission Rate:</span>
                  <span className="text-blue-400 font-bold">{settings.ratePercentage}% per completed order</span>
                </div>
                <div className="flex justify-between py-2 border-b border-neutral-800">
                  <span className="text-neutral-400">Settlement Currency:</span>
                  <span className="text-white font-bold">{settings.currencyCode} ({settings.currencySymbol})</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-neutral-400">Payout Mechanism:</span>
                  <span className="text-emerald-400 font-semibold">{settings.payoutMethod}</span>
                </div>
              </div>
            </div>

            {/* Escrow Guarantee Statement */}
            <div id="protection" className="p-6 rounded-2xl bg-blue-950/20 border border-blue-900/40 space-y-3">
              <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Three-Way Escrow Protection</span>
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                1. <strong>Buyer funds the order</strong> into an encrypted escrow vault.<br />
                2. <strong>Seller dispatches goods</strong> with tracked shipping.<br />
                3. <strong>Buyer inspects goods</strong>, funds release to seller, and the platform commission is instantly finalized.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
