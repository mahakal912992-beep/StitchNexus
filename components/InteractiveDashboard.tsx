/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, AlertTriangle, Database, Zap, Activity, ShieldCheck, HelpCircle } from 'lucide-react';

export const InteractiveDashboard: React.FC = () => {
  const [streamRate, setStreamRate] = useState(4500); // events per second
  const [activeTab, setActiveTab] = useState<'flow' | 'health'>('flow');
  const [selectedSource, setSelectedSource] = useState<'salesforce' | 'postgres' | 's3'>('postgres');
  const [isStressing, setIsStressing] = useState(false);
  const [totalRows, setTotalRows] = useState(14589204);
  const [logMessages, setLogMessages] = useState<string[]>([
    'System: Booting StitchNexus processing engine...',
    'Snowflake destination connected successfully.',
    'Schema discovered: 18 columns mapped on user_table.',
  ]);

  // Dynamic flow dataset
  const [flowPoints, setFlowPoints] = useState<number[]>([40, 55, 45, 60, 50, 75, 65, 80]);
  const [healthPoints, setHealthPoints] = useState<{ errors: number; runs: number }[]>([
    { errors: 2, runs: 98 },
    { errors: 3, runs: 97 },
    { errors: 1, runs: 99 },
    { errors: 5, runs: 95 },
    { errors: 2, runs: 98 },
  ]);

  // Animate processing stream rows and logs
  useEffect(() => {
    const rowMultiplier = streamRate / 10;
    const interval = setInterval(() => {
      setTotalRows((prev) => prev + Math.floor(rowMultiplier));

      // Randomly append logs or fluctuate graph
      if (Math.random() > 0.8) {
        const connectors = { salesforce: 'Salesforce', postgres: 'PostgreSQL', s3: 'Amazon S3' };
        const sources = connectors[selectedSource];
        const quotes = [
          `Ingesting data block from ${sources}...`,
          `AI engine checked schema consistency on ${sources} stream.`,
          `Validated E.164 phone formats: 100% matched.`,
          `In-memory transform complete: 0ms serialization overhead.`,
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setLogMessages((prev) => [...prev.slice(-3), `Nexus: ${randomQuote}`]);
      }

      // Append new flow data point and slide graph
      setFlowPoints((prev) => {
        const base = isStressing ? 90 : Math.round(streamRate / 100);
        const nextVal = Math.min(100, Math.max(10, base + Math.floor(Math.random() * 16 - 8)));
        return [...prev.slice(1), nextVal];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [streamRate, selectedSource, isStressing]);

  const handleStressTest = () => {
    if (isStressing) return;
    setIsStressing(true);
    setStreamRate(9800);
    setLogMessages((prev) => [...prev, 'CRITICAL: Initiating stress test pipeline simulation...']);

    setTimeout(() => {
      setIsStressing(false);
      setStreamRate(4500);
      setLogMessages((prev) => [...prev, 'System: Stress test completed. Stream rate auto-throttled back safely.']);
    }, 5000);
  };

  const handleReset = () => {
    setTotalRows(14589204);
    setStreamRate(4500);
    setLogMessages(['System: Resetted and cleared tracking variables. Ready to ingest.']);
  };

  return (
    <section id="preview" className="py-24 bg-[#05070f] border-t border-slate-900/60 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Interactive Control Board */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/10 px-3 py-1 rounded-full">
                Interactive Solutions Preview
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-100 font-sans tracking-tight">
                Live In-Memory Processing Dashboard
              </h2>
              <p className="text-sm md:text-base text-slate-400 font-sans leading-relaxed">
                Interact with the mock pipeline controller below. Speed up stream rates, shift ingestion connectors, and watch the visual analytics layer sync instantly.
              </p>
            </div>

            {/* Ingestion Source Selector */}
            <div className="space-y-4 bg-slate-900/20 border border-slate-800/40 p-5 rounded-3xl">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                1. Select Ingestion Source Node
              </label>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { id: 'salesforce', label: 'Salesforce', icon: Database },
                  { id: 'postgres', label: 'PostgreSQL', icon: Database },
                  { id: 's3', label: 'Amazon S3', icon: Database },
                ] as const).map((node) => {
                  const Icon = node.icon;
                  const isSelected = selectedSource === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedSource(node.id)}
                      className={`flex flex-col items-center gap-2.5 p-3.5 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-bold shadow-lg shadow-cyan-500/5'
                          : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[9px] font-extrabold uppercase tracking-widest">{node.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stream speed controller slider */}
            <div className="space-y-4 bg-slate-900/20 border border-slate-800/40 p-5 rounded-3xl">
              <div className="flex justify-between items-baseline">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                  2. Adjust Ingestion Stream Speed
                </label>
                <span className="text-xs font-black font-mono text-cyan-400">
                  {streamRate.toLocaleString()} / sec
                </span>
              </div>

              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={streamRate}
                onChange={(e) => setStreamRate(Number(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                disabled={isStressing}
              />

              <div className="flex justify-between text-[9px] text-slate-500 font-bold tracking-tight">
                <span>1,000 EPS (ECO)</span>
                <span>5,000 EPS (STANDARD)</span>
                <span>10,000 EPS (MAX)</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleStressTest}
                disabled={isStressing}
                className="flex-1 py-3.5 bg-gradient-to-r from-cyan-400 to-indigo-500 hover:brightness-110 text-slate-950 font-extrabold rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] disabled:opacity-50 flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950 animate-pulse" />
                Stress Test Ingestion
              </button>

              <button
                onClick={handleReset}
                className="p-3.5 border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-400 hover:text-slate-200 rounded-2xl transition-all cursor-pointer"
                title="Reset counter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Immersive live graphs */}
          <div className="lg:col-span-7 relative">
            {/* Outer framework box */}
            <div className="border border-slate-800/80 bg-slate-950/40 backdrop-blur-md rounded-3xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-500/5 blur-2xl rounded-full" />

              {/* View toggle header tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Live Metrics</p>
                  <h3 className="text-sm font-bold text-slate-200 font-sans tracking-tight">
                    Total Synced Rows:{' '}
                    <span className="text-cyan-400 font-mono font-medium">
                      {totalRows.toLocaleString()}
                    </span>
                  </h3>
                </div>

                {/* Tab buttons */}
                <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-850">
                  <button
                    onClick={() => setActiveTab('flow')}
                    className={`px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
                      activeTab === 'flow'
                        ? 'bg-slate-950 text-cyan-400 border border-slate-850 shadow'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Flow Rate
                  </button>
                  <button
                    onClick={() => setActiveTab('health')}
                    className={`px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
                      activeTab === 'health'
                        ? 'bg-slate-950 text-indigo-400 border border-slate-850 shadow'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Runs vs Errors
                  </button>
                </div>
              </div>

              {/* Chart Body */}
              <div className="h-[210px] flex items-end justify-between gap-2 relative bg-slate-950/60 rounded-2xl p-4 border border-slate-900/80">
                {activeTab === 'flow' ? (
                  <>
                    {/* Grid lines background */}
                    <div className="absolute inset-x-4 bottom-4 top-4 flex flex-col justify-between pointer-events-none opacity-[0.05]">
                      <div className="border-t border-slate-100 w-full" />
                      <div className="border-t border-slate-100 w-full" />
                      <div className="border-t border-slate-100 w-full" />
                      <div className="border-t border-slate-100 w-full" />
                    </div>

                    {/* SVG Line path drawing representing active data stream rate */}
                    <svg className="absolute inset-x-0 bottom-4 h-32 w-full px-2" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Area path */}
                      <path
                        d={`M 0 100 L 0 ${100 - flowPoints[0]} L 50 ${100 - flowPoints[1]} L 100 ${100 - flowPoints[2]} L 150 ${100 - flowPoints[3]} L 200 ${100 - flowPoints[4]} L 250 ${100 - flowPoints[5]} L 300 ${100 - flowPoints[6]} L 350 ${100 - flowPoints[7]} L 400 100 Z`}
                        fill="url(#chartGradient)"
                      />
                      {/* Line path */}
                      <path
                        d={`M 0 ${100 - flowPoints[0]} L 50 ${100 - flowPoints[1]} L 100 ${100 - flowPoints[2]} L 150 ${100 - flowPoints[3]} L 200 ${100 - flowPoints[4]} L 250 ${100 - flowPoints[5]} L 300 ${100 - flowPoints[6]} L 350 ${100 - flowPoints[7]} L 400 ${100 - flowPoints[7]}`}
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Chart labels overlay */}
                    <div className="absolute top-2 left-2 text-[8px] font-extrabold text-slate-500 uppercase tracking-widest bg-slate-950/80 px-2 py-0.5 rounded border border-slate-900">
                      Live Ingestion In-Memory Rate
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col justify-end space-y-4">
                    <div className="grid grid-cols-5 gap-3 h-[140px] items-end">
                      {healthPoints.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center h-full justify-end space-y-2">
                          <div className="w-full flex justify-center gap-1.5 h-full items-end">
                            {/* Run rate bar */}
                            <div
                              className="w-3 rounded-t-sm bg-indigo-500/80 hover:brightness-110 transition-all duration-300"
                              style={{ height: `${item.runs}%` }}
                              title={`Runs: ${item.runs}%`}
                            />
                            {/* Error rate bar */}
                            <div
                              className="w-3 rounded-t-sm bg-rose-500/85 hover:brightness-110 transition-all duration-300"
                              style={{ height: `${item.errors * 10}%` }}
                              title={`Errors: ${item.errors}%`}
                            />
                          </div>
                          <span className="text-[8px] font-bold text-slate-600 font-mono uppercase">Batch {idx + 1}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-6 justify-center text-[9px] font-bold">
                      <div className="flex items-center gap-1.5 text-indigo-400">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        <span>Runs Success (%)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-rose-400">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        <span>Exceptions (%)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mini console output matching actions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-900 pb-2">
                  <span>Stream Console logs</span>
                  <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                </div>

                <div className="p-3.5 bg-slate-950/80 border border-slate-900 rounded-2xl font-mono text-[10px] text-slate-400 space-y-1.5 max-h-[90px] overflow-y-auto">
                  {logMessages.map((msg, index) => (
                    <div key={index} className="flex items-center gap-2 truncate">
                      <span className="text-cyan-500/70 select-none">&gt;</span>
                      <span className="truncate">{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
