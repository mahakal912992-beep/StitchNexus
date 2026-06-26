/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Database, Code, ShieldCheck, ChevronDown, ChevronUp, CheckCircle, Zap } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: any;
  className: string; // Desktop bento grid col/row spans
}

export const Features: React.FC = () => {
  const [activeFeatureId, setActiveFeatureId] = useState('transformer');

  const features: Feature[] = [
    {
      id: 'transformer',
      title: 'English-to-Code Schema',
      description: 'Define complex data maps using natural language. Our integrated AI compiler transpiles description mappers to typed TypeScript and optimized SQL queries instantly.',
      badge: 'AI Core',
      icon: Code,
      className: 'md:col-span-8 md:row-span-1',
    },
    {
      id: 'cleaners',
      title: 'Zero-Knowledge Cleaners',
      description: 'Auto-sanitize database entries on-the-fly. Normalizes telephone logs to E.164, fixes timestamp drifts, and masks PII fields to enforce zero-knowledge handling.',
      badge: 'Security',
      icon: Sparkles,
      className: 'md:col-span-4 md:row-span-1',
    },
    {
      id: 'connectors',
      title: '200+ Instant Connectors',
      description: 'Drag-and-drop ingestion from Salesforce, Snowflake, S3, Apache Kafka, Google Sheets, and PostgreSQL. Keep all schemas completely in-sync with automatic structural discovery.',
      badge: 'Ingestion',
      icon: Database,
      className: 'md:col-span-4 md:row-span-1',
    },
    {
      id: 'vpc',
      title: 'Isolated VPC Peering',
      description: 'Host and execute StitchNexus workers inside your private enterprise cloud network. Never expose critical APIs or database credentials to the public internet.',
      badge: 'Compliance',
      icon: ShieldCheck,
      className: 'md:col-span-8 md:row-span-1',
    },
  ];

  const toggleAccordion = (id: string) => {
    setActiveFeatureId(activeFeatureId === id ? '' : id);
  };

  return (
    <section id="features" className="py-24 bg-[#02040a] relative overflow-hidden border-t border-slate-900/60">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-16 space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/10 px-3 py-1 rounded-full">
            Platform Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-100 font-sans tracking-tight">
            Designed for Zero-Maintenance Data Engineering
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-sans leading-relaxed">
            Stop debugging broken APIs, unhandled schema changes, and slow transformations. Let server-side AI handle your pipelines with enterprise compliance built-in.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP ONLY: Bento Grid Layout
            ========================================================================= */}
        <div className="hidden md:grid grid-cols-12 gap-6 auto-rows-[250px]">
          {features.map((item) => {
            const Icon = item.icon;
            const isActive = activeFeatureId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setActiveFeatureId(item.id)}
                className={`group relative rounded-3xl border p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden ${item.className} ${
                  isActive
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.08)] text-slate-100'
                    : 'bg-slate-950/40 border-slate-900/80 text-slate-300 hover:border-slate-800 hover:bg-slate-900/20'
                }`}
              >
                {/* Glow corner spotlight */}
                <div className={`absolute top-0 right-0 h-32 w-32 rounded-full bg-cyan-500/5 blur-2xl transition-opacity duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`} />

                {/* Card Top: Header & Badge */}
                <div className="flex items-start justify-between relative z-10">
                  <div className={`h-11 w-11 rounded-2xl flex items-center justify-center border transition-colors ${
                    isActive
                      ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                    isActive
                      ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300'
                      : 'bg-slate-900/60 border-slate-850 text-slate-500'
                  }`}>
                    {item.badge}
                  </span>
                </div>

                {/* Card Bottom: Text Content */}
                <div className="space-y-2 relative z-10">
                  <h3 className="text-base font-bold font-sans tracking-tight flex items-center gap-2">
                    {item.title}
                    {isActive && <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />}
                  </h3>
                  <p className={`text-xs leading-relaxed max-w-2xl font-sans ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            MOBILE ONLY: Active Accordion Refactor
            ========================================================================= */}
        <div className="md:hidden space-y-4">
          {features.map((item) => {
            const Icon = item.icon;
            const isActive = activeFeatureId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-slate-900 border-cyan-500/30 shadow-lg shadow-cyan-500/5'
                    : 'bg-slate-950 border-slate-900'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  aria-expanded={isActive}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center border ${
                      isActive
                        ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                        : 'bg-slate-900 border-slate-800/65 text-slate-400'
                    }`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-100">{item.title}</h3>
                      <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <div className="text-slate-400">
                    {isActive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Content Panel */}
                {isActive && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-800/60 animate-fade-in">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Simple list bullet detail for mobile */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Available in Developer Workspace</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Compliant with standard VPC nodes</span>
                      </div>
                    </div>
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
