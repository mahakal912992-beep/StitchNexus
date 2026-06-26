/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from './AppContext';
import { Send, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    addToast('Subscribed to StitchNexus release cycle logs!', 'success');
    setEmail('');
  };

  const footerLinks = {
    platform: [
      { label: 'AI Transformers', href: '#features' },
      { label: 'Visual Pipeline IDE', href: '#features' },
      { label: 'Security & VPC', href: '#features' },
      { label: 'Supported Connectors', href: '#preview' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Developer SDK', href: '#' },
      { label: 'System Status', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers (We are hiring!)', href: '#' },
      { label: 'Engineering Blog', href: '#' },
      { label: 'Brand Assets', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'DPA Addendum', href: '#' },
      { label: 'SLA Guarantee', href: '#' },
    ],
  };

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      setActiveView('landing');
      setTimeout(() => {
        document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-[#02040a] border-t border-slate-900/60 pt-20 pb-12 relative overflow-hidden z-10">
      <div className="container max-w-7xl mx-auto px-6 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <button
              onClick={() => {
                setActiveView('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 text-slate-100 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
                <path d="M8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 16C8 20.4183 11.5817 24 16 24" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="16" r="3" fill="#22d3ee" />
              </svg>
              <span className="text-lg font-black tracking-tighter uppercase">StitchNexus</span>
            </button>

            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
              SaaS data movement and transformation platform integrating multi-cloud ingestion grids with server-side AI compilation agents.
            </p>

            {/* Newsletter block */}
            <div className="space-y-3 pt-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                StitchNexus Weekly Release Logs
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Subscribed! Check your inbox weekly.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="architect@stitchnexus.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-900 focus:border-cyan-500/50 rounded-xl py-2.5 pl-4 pr-12 text-xs text-slate-200 placeholder-slate-600 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 p-1.5 rounded-lg border border-slate-800 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Platform</h4>
              <ul className="space-y-2.5">
                {footerLinks.platform.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleLinkClick(item.href)}
                      className="text-xs text-slate-400 hover:text-slate-100 transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Resources</h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleLinkClick(item.href)}
                      className="text-xs text-slate-400 hover:text-slate-100 transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Company</h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleLinkClick(item.href)}
                      className="text-xs text-slate-400 hover:text-slate-100 transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleLinkClick(item.href)}
                      className="text-xs text-slate-400 hover:text-slate-100 transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-900 pt-8 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} StitchNexus Inc. All rights reserved.</p>
          <p className="font-mono text-[10px]">GDPR • SOC 2 TYPE II • HIPAA CERTIFIED</p>
        </div>
      </div>
    </footer>
  );
};
