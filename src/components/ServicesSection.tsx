import React from 'react';
import { ArrowUpRight, Check, Clock } from 'lucide-react';
import { ServiceItem } from '../types/site';
import { ACCENT_CONFIGS } from '../data/initialContent';

interface ServicesSectionProps {
  services: ServiceItem[];
  themeAccent: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, themeAccent }) => {
  const accent = ACCENT_CONFIGS[themeAccent] || ACCENT_CONFIGS.cobalt;

  return (
    <section id="services" className="py-20 border-t border-neutral-800/80 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono-code">
            Core Capabilities & Solutions
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineering services delivered with architectural rigor.
          </h2>
          <p className="text-base text-neutral-300">
            From greenfield architecture to high-precision performance optimizations, each engagement is built for longevity and maintainability.
          </p>
        </div>

        {/* Numbered Service List & Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-7 sm:p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700/80 transition-all duration-200 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Natural Human Editorial Numbering */}
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-sm font-semibold text-neutral-400">
                    {service.number}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono-code">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.timeline}</span>
                  </div>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {service.title}
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {service.summary}
                </p>
              </div>

              {/* Concrete deliverables list */}
              <div className="pt-4 border-t border-neutral-800/80 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono-code">
                  Key Deliverables
                </p>
                <ul className="space-y-2 pt-1">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${accent.primary}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inquiry trigger */}
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-neutral-300 transition-colors"
                >
                  <span>Inquire about this capability</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
