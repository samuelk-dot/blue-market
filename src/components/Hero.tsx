import React from 'react';
import { ArrowUpRight, Code, Sparkles, Terminal, ChevronRight, Sliders } from 'lucide-react';
import { SiteConfig } from '../types/site';
import { ACCENT_CONFIGS } from '../data/initialContent';

interface HeroProps {
  config: SiteConfig;
  onOpenDevStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onOpenDevStudio }) => {
  const accent = ACCENT_CONFIGS[config.themeAccent] || ACCENT_CONFIGS.cobalt;

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background radial gradient accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[450px] opacity-25 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${config.themeAccent === 'emerald' ? '#10b981' : config.themeAccent === 'amber' ? '#f59e0b' : config.themeAccent === 'rose' ? '#f43f5e' : config.themeAccent === 'slate' ? '#6b7280' : '#3b82f6'} 0%, transparent 70%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle status kicker without pill wrapper */}
        <div className="flex items-center gap-2.5 text-xs text-neutral-400 mb-6 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{config.availability}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>{config.location}</span>
        </div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left col: Typographic narrative & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-wider text-neutral-400 uppercase font-mono-code">
                {config.roleTitle}
              </p>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
                {config.heroHeadline}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              {config.heroSubheadline}
            </p>

            {/* Primary actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-lg transition-all duration-150 shadow-md ${accent.primary} ${accent.hover} whitespace-nowrap`}
              >
                <span>Explore Selected Projects</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenDevStudio}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors whitespace-nowrap"
              >
                <Sliders className="w-4 h-4 text-neutral-400" />
                <span>Open Dev Studio & Customize</span>
              </button>
            </div>

            {/* Adjacent Proof Metrics (Strict quantitative rigor) */}
            <div className="pt-8 border-t border-neutral-800/80 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <p className="font-mono-code text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  99.98%
                </p>
                <p className="text-xs text-neutral-400 mt-1">Uptime SLA in Production</p>
              </div>

              <div>
                <p className="font-mono-code text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  &lt; 50ms
                </p>
                <p className="text-xs text-neutral-400 mt-1">Client Interaction Latency</p>
              </div>

              <div>
                <p className="font-mono-code text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  450K+
                </p>
                <p className="text-xs text-neutral-400 mt-1">Active End Users Served</p>
              </div>
            </div>

          </div>

          {/* Right col: High-impact 16:9 Workspace Visual Carrier */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              
              {/* Main focal image */}
              <img
                src="/src/assets/images/hero_developer_workspace_1791453011657.jpg"
                alt="Samuel Kinguri Developer Studio & Engineering Environment"
                className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover transition-transform duration-500 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />

              {/* Scrim overlay with developer identity badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center gap-3.5 bg-neutral-900/90 backdrop-blur-md border border-neutral-700/60 p-3 rounded-xl">
                  <img
                    src="/src/assets/images/developer_avatar_portrait_1791453053113.jpg"
                    alt={config.developerName}
                    className="w-12 h-12 rounded-lg object-cover border border-neutral-600/60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{config.developerName}</p>
                    <p className="text-xs text-neutral-400 truncate">{config.email}</p>
                  </div>
                  <div className="ml-auto">
                    <a
                      href="#contact"
                      className="p-2 rounded-lg bg-neutral-800 text-neutral-200 hover:text-white hover:bg-neutral-700 transition-colors inline-block"
                      title="Direct message"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Subtle decorative frame element */}
            <div className="absolute -bottom-4 -left-4 -z-10 w-full h-full rounded-2xl border border-neutral-800/60 pointer-events-none hidden sm:block" />
          </div>

        </div>

      </div>
    </section>
  );
};
