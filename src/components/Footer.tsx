import React from 'react';
import { Github, Linkedin, Twitter, ArrowUp, Sliders } from 'lucide-react';
import { SiteConfig } from '../types/site';

interface FooterProps {
  config: SiteConfig;
  onOpenDevStudio: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenDevStudio }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950 py-12 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="font-display text-lg font-bold text-white tracking-tight">
              {config.developerName}
            </p>
            <p className="text-neutral-400">
              {config.roleTitle} · {config.location}
            </p>
          </div>

          {/* Navigation Mirrors */}
          <nav className="flex flex-wrap items-center gap-6 text-neutral-400 font-medium">
            <a href="#work" className="hover:text-white transition-colors">Selected Work</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#stack" className="hover:text-white transition-colors">Toolchain</a>
            <a href="#sandbox" className="hover:text-white transition-colors">Dev Sandbox</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <button
              onClick={onOpenDevStudio}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Dev Studio
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

        {/* Bottom Legal / Copyright Row */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-mono-code">
          <p>
            © {new Date().getFullYear()} {config.developerName}. Built with React, Vite & Tailwind CSS for Google Chrome.
          </p>

          <div className="flex items-center gap-4">
            <span>Direct: {config.email}</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
