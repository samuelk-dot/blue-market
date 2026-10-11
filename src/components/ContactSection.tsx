import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, ArrowUpRight } from 'lucide-react';
import { SiteConfig } from '../types/site';
import { ACCENT_CONFIGS } from '../data/initialContent';

interface ContactSectionProps {
  config: SiteConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: 'Full-Stack Application Development',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const accent = ACCENT_CONFIGS[config.themeAccent] || ACCENT_CONFIGS.cobalt;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission flow and prepare mailto fallback
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleSendViaMailClient = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${formData.scope} from ${formData.name}`);
    const body = encodeURIComponent(`Hi Samuel,\n\nName: ${formData.name}\nEmail: ${formData.email}\nScope: ${formData.scope}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 border-t border-neutral-800/80 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct channels & statement */}
          <div className="lg:col-span-5 space-y-7">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono-code">
                Start a Conversation
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Let's engineer your next digital platform.
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Whether you need a high-performance web app, a complete product build, or technical consulting on Chrome/web standards, I'm ready to collaborate.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-mono-code">Direct Email</p>
                  <a 
                    href={`mailto:${config.email}`}
                    className="text-white hover:text-blue-400 transition-colors font-medium"
                  >
                    {config.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-neutral-300">
                <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400 font-mono-code">Location & Availability</p>
                  <p className="text-white font-medium">{config.location} · {config.availability}</p>
                </div>
              </div>
            </div>

            {/* Expected turnaround note */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300 space-y-1">
              <p className="font-semibold text-white">Direct Communication Guarantee</p>
              <p className="text-neutral-400">
                I review every message personally and respond within 24 business hours.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-2xl bg-neutral-900/70 border border-neutral-800 relative shadow-xl">
              
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">Message Prepared!</h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto">
                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Would you like to transmit this directly via your email client or copy the message?
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-3 pt-3">
                    <button
                      onClick={handleSendViaMailClient}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white rounded-lg transition-colors ${accent.primary} ${accent.hover}`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Launch Email to {config.email}</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2.5 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase font-mono-code">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ada Lovelace"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 placeholder:text-neutral-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase font-mono-code">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ada@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 placeholder:text-neutral-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase font-mono-code">
                      Engagement Scope
                    </label>
                    <select
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-600"
                    >
                      <option value="Full-Stack Application Development">Full-Stack Application Development</option>
                      <option value="Chrome & PWA Performance Optimization">Chrome & PWA Performance Optimization</option>
                      <option value="Design System & UI Engineering">Design System & UI Engineering</option>
                      <option value="Architecture Review & Consultation">Architecture Review & Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5 uppercase font-mono-code">
                      Project Details & Timeline
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me about what you are building, key milestones, and desired launch target..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 placeholder:text-neutral-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold text-white rounded-lg transition-all duration-150 shadow-md ${accent.primary} ${accent.hover} disabled:opacity-50 cursor-pointer`}
                  >
                    {submitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Proposal Request to Samuel</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
