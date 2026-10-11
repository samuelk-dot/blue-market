import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Eye, Code, Smartphone, Monitor, Sparkles } from 'lucide-react';
import { ACCENT_CONFIGS } from '../data/initialContent';

interface ComponentPlaygroundProps {
  themeAccent: string;
}

interface PresetSnippet {
  id: string;
  name: string;
  description: string;
  defaultCode: string;
}

const PRESETS: PresetSnippet[] = [
  {
    id: 'hero-metric',
    name: 'Stat Metric Tile',
    description: 'Tabular metric card with live status indicator and clean typography.',
    defaultCode: `<div class="p-5 rounded-xl bg-neutral-900 border border-neutral-800 text-left max-w-sm">
  <div class="flex items-center justify-between text-xs text-neutral-400 mb-2">
    <span>SYSTEM TELEMETRY</span>
    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
  </div>
  <p class="text-3xl font-bold font-mono text-white">99.98%</p>
  <p class="text-xs text-neutral-400 mt-1">Global production uptime across 18 edge nodes.</p>
</div>`
  },
  {
    id: 'interactive-cta',
    name: 'Action Callout Block',
    description: 'High-contrast conversion container with subtle border highlights.',
    defaultCode: `<div class="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-left max-w-md">
  <p class="text-xs font-mono text-blue-400 mb-1">READY TO SCALE</p>
  <h4 class="text-xl font-bold text-white mb-2">Schedule an Architecture Review</h4>
  <p class="text-sm text-neutral-300 mb-4">Let's audit your frontend performance and optimize Chrome Core Web Vitals.</p>
  <div class="flex gap-3">
    <button class="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-500">
      Book Consultation
    </button>
    <button class="px-4 py-2 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-300 hover:text-white">
      View Whitepaper
    </button>
  </div>
</div>`
  },
  {
    id: 'profile-card',
    name: 'Engineering Profile Card',
    description: 'Clean developer badge with status marker and email action.',
    defaultCode: `<div class="flex items-center gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 max-w-md">
  <div class="w-12 h-12 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-lg">
    SK
  </div>
  <div class="flex-1 min-w-0">
    <p class="text-sm font-semibold text-white truncate">Samuel King'uri</p>
    <p class="text-xs text-neutral-400 truncate">Senior Full-Stack Architect</p>
  </div>
  <a href="mailto:samuelkinguri13@gmail.com" class="text-xs px-3 py-1.5 rounded-md bg-neutral-800 text-neutral-200 hover:bg-neutral-700">
    Email
  </a>
</div>`
  }
];

export const ComponentPlayground: React.FC<ComponentPlaygroundProps> = ({ themeAccent }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESETS[0].id);
  const [code, setCode] = useState<string>(PRESETS[0].defaultCode);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  const accent = ACCENT_CONFIGS[themeAccent] || ACCENT_CONFIGS.cobalt;

  const handleSelectPreset = (preset: PresetSnippet) => {
    setSelectedPresetId(preset.id);
    setCode(preset.defaultCode);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    const preset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];
    setCode(preset.defaultCode);
  };

  return (
    <section id="sandbox" className="py-20 border-t border-neutral-800/80 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono-code flex items-center gap-2">
              <Code className="w-3.5 h-3.5" />
              <span>Live Development Sandbox</span>
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Test & build UI components right in Chrome.
            </h2>
            <p className="text-sm text-neutral-300">
              You can develop and tweak responsive interface blocks directly in this sandbox. Type standard HTML and Tailwind utility classes below to preview instant changes.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
                  selectedPresetId === p.id
                    ? 'bg-neutral-800 text-white border-neutral-600 shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border-neutral-800'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sandbox Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-6">
          
          {/* Code Editor Panel */}
          <div className="lg:col-span-6 flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono-code px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span>HTML & Tailwind Live Editor</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                  title="Reset to default code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
                <span>·</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                  title="Copy code snippet"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 sm:h-96 p-4 rounded-xl bg-neutral-950 font-mono-code text-xs text-neutral-200 border border-neutral-800 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 resize-none leading-relaxed"
              spellCheck={false}
              placeholder="Enter HTML and Tailwind CSS code here..."
            />
            <p className="text-[11px] text-neutral-400 font-mono-code">
              Tip: You can add or modify Tailwind classes like <code className="text-neutral-300">bg-blue-600</code>, <code className="text-neutral-300">p-6</code>, <code className="text-neutral-300">rounded-2xl</code> and see live results.
            </p>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:col-span-6 flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400 font-mono-code px-1">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chrome Render Preview</span>
              </div>
              <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-800 rounded-md p-0.5">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`p-1 rounded ${viewportMode === 'desktop' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'}`}
                  title="Desktop View"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`p-1 rounded ${viewportMode === 'mobile' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'}`}
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="w-full h-80 sm:h-96 rounded-xl bg-neutral-950/90 border border-neutral-800 p-6 overflow-auto flex items-center justify-center relative">
              <div 
                className={`transition-all duration-300 w-full flex items-center justify-center ${
                  viewportMode === 'mobile' ? 'max-w-xs' : 'max-w-xl'
                }`}
                dangerouslySetInnerHTML={{ __html: code }}
              />
            </div>
            <p className="text-[11px] text-neutral-400 font-mono-code text-right">
              Rendered via Chrome V8 DOM Engine
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
