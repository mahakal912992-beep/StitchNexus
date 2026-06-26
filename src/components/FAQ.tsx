/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { Plus, Minus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-[#05070f] border-t border-slate-900/60 overflow-hidden">
      <div className="container max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/10 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-100 font-sans tracking-tight">
            Frequently Asked Queries
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Everything you need to know about StitchNexus connectors, security isolation, processing models, and enterprise billing.
          </p>
        </div>

        {/* Collapsible FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-950/40 border-slate-900/60 hover:border-slate-800'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-slate-100 pr-4">{faq.question}</span>
                  <div className={`h-6 w-6 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5 text-cyan-400" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-slate-900/40 text-xs text-slate-400 leading-relaxed animate-fade-in font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
