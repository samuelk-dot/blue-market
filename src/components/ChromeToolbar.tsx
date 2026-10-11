import React, { useState } from 'react';
import { Globe, Copy, Check, QrCode, Smartphone, Sparkles, X, Sliders, ExternalLink } from 'lucide-react';

interface ChromeToolbarProps {
  onOpenDevStudio: () => void;
  accentClass: string;
}

export const ChromeToolbar: React.FC<ChromeToolbarProps> = ({ onOpenDevStudio, accentClass }) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-dev-6te3zc73v43xvu7kdv3rp4-356409252599.europe-west2.run.app';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <>
      <aside aria-label="Chrome visibility bar" className="bg-neutral-900 border-b border-neutral-800 text-xs text-neutral-300 py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Chrome indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-800/90 text-neutral-200 border border-neutral-700/60 font-mono-code text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Google Chrome Live</span>
            </div>
            <span className="hidden sm:inline text-neutral-400">·</span>
            <span className="hidden sm:inline text-neutral-400">PWA Ready & Fast Web Vitals</span>
          </div>

          {/* Quick interactive utility buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer border border-neutral-700/60"
              title="Copy shareable link to open in Chrome on any device"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
              <span>{copied ? 'URL Copied!' : 'Copy Chrome Link'}</span>
            </button>

            <button
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer border border-neutral-700/60"
              title="Scan to view on Mobile Chrome"
            >
              <QrCode className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Mobile QR</span>
            </button>

            <button
              onClick={onOpenDevStudio}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-white font-medium transition-colors cursor-pointer ${accentClass}`}
              title="Develop and customize this site right now"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Dev Studio</span>
            </button>
          </div>
        </div>
      </aside>

      {/* QR Code Modal for Mobile Chrome view */}
      {showQrModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setShowQrModal(false)}
        >
          <div 
            className="bg-neutral-900 border border-neutral-700 rounded-xl max-w-sm w-full p-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Smartphone className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-white">Open in Chrome Mobile</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Point your mobile phone camera to open this site directly in Google Chrome.
                </p>
              </div>

              {/* High-contrast generated QR visualization */}
              <div className="bg-white p-4 rounded-lg inline-block shadow-inner mx-auto">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}`}
                  alt="QR code for Google Chrome on mobile"
                  className="w-44 h-44 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCopyUrl}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Link Copied to Clipboard' : 'Copy Direct Browser URL'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
