import React from 'react';
import { Terminal, ShieldCheck, Zap, Layers } from 'lucide-react';
import { SkillCategory } from '../types/site';
import { ACCENT_CONFIGS } from '../data/initialContent';

interface ExperienceMatrixProps {
  skills: SkillCategory[];
  themeAccent: string;
}

export const ExperienceMatrix: React.FC<ExperienceMatrixProps> = ({ skills, themeAccent }) => {
  const accent = ACCENT_CONFIGS[themeAccent] || ACCENT_CONFIGS.cobalt;

  return (
    <section id="stack" className="py-20 border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono-code">
              Technical Competencies & Toolchain
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              A battle-tested stack tuned for modern browser execution.
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Tested on Chrome 120+ & Evergreen Engines</span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((category) => (
            <div
              key={category.title}
              className="p-6 sm:p-7 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-6"
            >
              <div className="border-b border-neutral-800 pb-4">
                <h3 className="font-display text-lg font-bold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-3.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between text-xs sm:text-sm py-1.5 border-b border-neutral-800/40 last:border-none"
                  >
                    <span className="font-medium text-neutral-200">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-3 font-mono-code tabular-nums text-neutral-400 text-xs">
                      <span>{skill.experience}</span>
                      <span className="text-neutral-600">/</span>
                      <span className="text-neutral-300 font-semibold">{skill.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Chrome & Web Standards Principles Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <h4 className="font-display text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Engineered with Zero-Layout-Shift Discipline</span>
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Every interface is built following strict WCAG 2.1 AA accessibility guidelines, pre-calculated image aspect ratios, container padding math, and compositor-only CSS transforms.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 font-mono-code text-xs text-neutral-400">
            <div className="text-right">
              <p className="text-white font-bold tabular-nums">0 ms</p>
              <p className="text-[11px] text-neutral-400">Layout Jitter</p>
            </div>
            <div className="h-6 w-px bg-neutral-700" />
            <div className="text-right">
              <p className="text-emerald-400 font-bold tabular-nums">100/100</p>
              <p className="text-[11px] text-neutral-400">Chrome Lighthouse</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
