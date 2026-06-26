/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { Sparkles, Terminal, ArrowRight, Database, Zap, Activity, ShieldAlert, Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveView, setIsAuthModalOpen, user } = useApp();
  const [metricRows, setMetricRows] = useState(2489104);
  const [metricLatency, setMetricLatency] = useState(12);

  // Animate mock live statistics counters
  useEffect(() => {
    const rowInterval = setInterval(() => {
      setMetricRows((prev) => prev + Math.floor(Math.random() * 15 + 5));
    }, 1500);

    const latencyInterval = setInterval(() => {
      setMetricLatency(() => Math.floor(Math.random() * 4 + 10)); // fluctuates between 10ms - 14ms
    }, 4000);

    return () => {
      clearInterval(rowInterval);
      clearInterval(latencyInterval);
    };
  }, []);

  const handleGetStarted = () => {
    if (!user.isLoggedIn) {
      setIsAuthModalOpen(true);
    } else {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-36 pb-28 md:pt-44 md:pb-36 overflow-hidden bg-[#030712]">
      {/* Dynamic Background Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none animate-pulse-slow-reverse" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.2] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-cyan-500/5 border border-cyan-500/15 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.05)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-extrabold text-cyan-300 tracking-widest uppercase">
                StitchNexus 3.5 Engine Released
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-50 leading-[1.1] font-sans">
              Automate Data Pipelines with{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Real-time AI Mapping
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl font-sans font-medium leading-relaxed">
              No more manual schemas or fragile API connectors. StitchNexus pairs industry-grade ELT pipelines with server-side AI agents to auto-transform, clean, and enrich datasets in-memory.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-indigo-500 hover:brightness-110 text-slate-950 font-extrabold rounded-full transition-all shadow-[0_0_30px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2 group text-xs uppercase tracking-wider"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveView('console')}
                className="px-8 py-4 border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-200 hover:text-slate-100 font-bold rounded-full transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider group"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                Explore Sandbox Console
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="space-y-4 pt-6 border-t border-slate-900">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Trusted by 4,000+ DevOps and Data teams globally
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-slate-500 text-[10px] font-extrabold font-mono tracking-widest">
                <span className="hover:text-slate-300 transition-colors cursor-default">SNOWFLAKE</span>
                <span className="hover:text-slate-300 transition-colors cursor-default">DATABRICKS</span>
                <span className="hover:text-slate-300 transition-colors cursor-default">BIGQUERY</span>
                <span className="hover:text-slate-300 transition-colors cursor-default">POSTGRES</span>
                <span className="hover:text-slate-300 transition-colors cursor-default">KAFKA</span>
              </div>
            </div>
          </div>

          {/* Right: Floating Dashboard mockup */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Ambient behind glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 blur-2xl opacity-80" />

            {/* Simulated Live Console Dashboard */}
            <div className="relative border border-slate-800/80 bg-slate-950/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl p-6 space-y-6 animate-float">
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Stream Sync Node
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />
                </div>
              </div>

              {/* Stats Widgets */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/40 border border-slate-800/30 p-4 rounded-2xl space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase">
                    Synced Events
                  </span>
                  <p className="text-2xl font-black text-cyan-400 font-mono tracking-tight">
                    {metricRows.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-900/40 border border-slate-800/30 p-4 rounded-2xl space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase">
                    Average Latency
                  </span>
                  <p className="text-2xl font-black text-indigo-400 font-mono tracking-tight">
                    {metricLatency}ms
                  </p>
                </div>
              </div>

              {/* Visualizing Flow */}
              <div className="p-4 bg-slate-900/20 border border-slate-900/60 rounded-2xl space-y-4">
                <p className="text-[9px] font-bold text-slate-500 tracking-wider uppercase">
                  Data Stream Path
                </p>

                <div className="flex items-center justify-between gap-2">
                  {/* Source */}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-900 rounded-xl">
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] font-bold text-slate-300">Snowflake</span>
                  </div>

                  {/* Flow line */}
                  <div className="flex-1 relative h-0.5 bg-slate-900 overflow-hidden">
                    <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser" />
                  </div>

                  {/* Processing central */}
                  <div className="flex items-center justify-center p-2 rounded-full bg-indigo-500/10 border border-indigo-500/25 animate-spin" style={{ animationDuration: '8s' }}>
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  </div>

                  {/* Flow line */}
                  <div className="flex-1 relative h-0.5 bg-slate-900 overflow-hidden">
                    <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-laser" style={{ animationDelay: '0.4s' }} />
                  </div>

                  {/* Destination */}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-900 rounded-xl">
                    <Database className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[10px] font-bold text-slate-300">BigQuery</span>
                  </div>
                </div>
              </div>

              {/* AI action log */}
              <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-center gap-2 text-[10px] text-indigo-300 font-mono">
                <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse flex-shrink-0" />
                <span className="truncate">AI Agent: Dynamic schema resolution active</span>
              </div>
            </div>

            {/* Extra floating decor items */}
            <div className="absolute -bottom-6 -left-6 bg-slate-950 border border-slate-800/80 p-3.5 rounded-2xl flex items-center gap-2.5 shadow-2xl font-mono text-[9px] text-slate-400 font-bold hidden sm:flex">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>VPC Network Peering: Connected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
