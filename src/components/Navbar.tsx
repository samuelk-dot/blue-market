import React, { useState } from 'react';
import { Code2, Menu, X, Sliders, ExternalLink } from 'lucide-react';
import { ACCENT_CONFIGS } from '../data/initialContent';
import { ThemeAccent } from '../types/site';

interface NavbarProps {
  developerName: string;
  themeAccent: ThemeAccent;
  onOpenDevStudio: () => void;
  devStudioOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  developerName,
  themeAccent,
  onOpenDevStudio,
  devStudioOpen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const accent = ACCENT_CONFIGS[themeAccent] || ACCENT_CONFIGS.cobalt;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-neutral-950/85 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="font-display text-xl font-bold tracking-tight text-white hover:text-neutral-200 transition-colors flex items-center gap-2.5"
        >
          <span className={`w-2.5 h-2.5 rounded-full ${accent.primary} shadow-sm shadow-blue-500/50`} />
          <span className="truncate max-w-[220px] sm:max-w-xs">{developerName}</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a href="#work" className="hover:text-white transition-colors">Selected Work</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#stack" className="hover:text-white transition-colors">Technical Stack</a>
          <a href="#sandbox" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span>Dev Sandbox</span>
          </a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDevStudio}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all duration-150 ${
              devStudioOpen 
                ? 'bg-neutral-800 text-white border-neutral-600' 
                : 'bg-neutral-900/90 text-neutral-300 hover:text-white border-neutral-800 hover:border-neutral-700'
            }`}
            title="Open In-Browser Site Customizer & Code Tools"
          >
            <Sliders className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Dev Studio</span>
          </button>

          <a
            href="#contact"
            className={`px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors whitespace-nowrap shadow-sm ${accent.primary} ${accent.hover}`}
          >
            Get in Touch
          </a>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-5 space-y-3">
          <a
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white py-1.5"
          >
            Selected Work
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white py-1.5"
          >
            Services
          </a>
          <a
            href="#stack"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white py-1.5"
          >
            Technical Stack
          </a>
          <a
            href="#sandbox"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white py-1.5"
          >
            Dev Sandbox
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-white py-1.5"
          >
            Contact
          </a>
          <div className="pt-2 border-t border-neutral-800 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDevStudio();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-neutral-900 text-neutral-200 border border-neutral-700"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Open Dev Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
