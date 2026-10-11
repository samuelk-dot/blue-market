import React from 'react';
import { ShieldCheck, Mail, ArrowUp, Sliders } from 'lucide-react';
import { CommissionSettings } from '../types/marketplace';

interface MarketplaceFooterProps {
  settings: CommissionSettings;
  onOpenDevStudio: () => void;
  onOpenSellModal: () => void;
}

export const MarketplaceFooter: React.FC<MarketplaceFooterProps> = ({
  settings,
  onOpenDevStudio,
  onOpenSellModal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-blue-950/60 bg-neutral-950 py-12 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500" />
              <p className="font-display text-lg font-bold text-white tracking-tight">
                {settings.marketplaceName}
              </p>
            </div>
            <p className="text-neutral-400 max-w-sm">
              The blue peer-to-peer commerce and escrow exchange. Authenticated goods, protected seller payouts, and transparent {settings.ratePercentage}% broker commission.
            </p>
          </div>

          {/* Navigation Mirrors */}
          <nav className="flex flex-wrap items-center gap-6 text-neutral-400 font-medium">
            <a href="#store" className="hover:text-blue-400 transition-colors">Catalog</a>
            <button onClick={onOpenSellModal} className="hover:text-blue-400 transition-colors cursor-pointer">
              List to Sell
            </button>
            <a href="#commission" className="hover:text-blue-400 transition-colors">Commission Rates</a>
            <a href="#protection" className="hover:text-blue-400 transition-colors">Escrow Shield</a>
            <button onClick={onOpenDevStudio} className="hover:text-blue-400 transition-colors cursor-pointer text-blue-400 font-semibold">
              Admin Studio
            </button>
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer py-1"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Legal / Payout Contact Row */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-mono-code">
          <p>
            © {new Date().getFullYear()} {settings.marketplaceName}. Powered by Google Chrome V8 & React.
          </p>

          <div className="flex items-center gap-4">
            <span>Broker Account: {settings.ownerEmail}</span>
            <span aria-hidden="true">·</span>
            <span>All escrow transactions insured</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
