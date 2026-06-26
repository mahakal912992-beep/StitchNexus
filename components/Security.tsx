/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SECURITY_BADGES } from '../data/mockData';
import { Shield, FileText, Activity, Lock, Key, Clock } from 'lucide-react';

export const Security: React.FC = () => {
  const iconMap: Record<string, any> = {
    Shield: Shield,
    FileText: FileText,
    Activity: Activity,
    Lock: Lock,
    Key: Key,
    Clock: Clock,
  };

  return (
    <section className="py-24 bg-[#02040a] border-t border-slate-900/60 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-16 space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/10 px-3 py-1 rounded-full">
            Zero-Trust Compliance
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-100 font-sans tracking-tight">
            Security Hardened at the Stream Level
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-sans leading-relaxed">
            StitchNexus is designed around modern multi-tenant VPC isolation. We process your pipeline events fully in-memory with zero disk-persistence overhead.
          </p>
        </div>

        {/* Security Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECURITY_BADGES.map((badge) => {
            const Icon = iconMap[badge.icon] || Shield;
            return (
              <div
                key={badge.id}
                className="p-6 bg-slate-950/40 border border-slate-900/80 rounded-2xl space-y-4 hover:border-slate-800 hover:bg-slate-900/10 transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-100">{badge.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
