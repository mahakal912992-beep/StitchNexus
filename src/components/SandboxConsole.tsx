/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from './AppContext';
import { MOCK_CONNECTORS, AI_MOCK_PROMPTS } from '../data/mockData';
import { LogEntry, Pipeline } from '../types';
import {
  Database,
  Terminal,
  Zap,
  Play,
  Trash2,
  Copy,
  Plus,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  Activity,
  Check,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from 'lucide-react';

export const SandboxConsole: React.FC = () => {
  const { user, addToast } = useApp();

  const [pipelines, setPipelines] = useState<Pipeline[]>(() => {
    return [
      {
        id: '1',
        name: 'Enterprise Customer Enrichment',
        source: 'snowflake',
        transformerPrompt: 'Filter out users under 18 and mask their email domains',
        transformerCode: AI_MOCK_PROMPTS[0].code,
        destination: 'bigquery',
        active: true,
        eventsProcessed: 142857,
        lastRun: 'Just now',
      },
    ];
  });

  // Current editor/creation state
  const [pipelineName, setPipelineName] = useState('');
  const [selectedSource, setSelectedSource] = useState('snowflake');
  const [selectedDest, setSelectedDest] = useState('bigquery');
  const [aiPrompt, setAiPrompt] = useState(AI_MOCK_PROMPTS[0].prompt);
  const [currentCode, setCurrentCode] = useState(AI_MOCK_PROMPTS[0].code);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [liveCounter, setLiveCounter] = useState(142857);

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Live counter ticking for active pipelines
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter((prev) => prev + Math.floor(Math.random() * 8 + 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handlePromptSelect = (promptText: string) => {
    setAiPrompt(promptText);
    const match = AI_MOCK_PROMPTS.find((p) => p.prompt === promptText);
    if (match) {
      setCurrentCode(match.code);
    }
  };

  const generateAiTransform = async () => {
    if (!aiPrompt) {
      addToast('Please enter an AI prompt first', 'error');
      return;
    }

    setIsGenerating(true);
    setGenerationStep(0);

    const steps = [
      'Analyzing schema maps of chosen connectors...',
      'Synthesizing static typing assertions...',
      'Compiling optimization paths with StitchNexus-3.5-Turbo...',
      'Running automated sandbox validation tests...',
      'Formatting code outputs...',
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length - 1) {
        current++;
        setGenerationStep(current);
      }
    }, 350);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      if (!response.ok) {
        throw new Error('API failed');
      }

      const data = await response.json();
      if (data && data.code) {
        setCurrentCode(data.code);
        addToast('AI Code Generation completed!', 'success');
      } else {
        throw new Error('Empty code returned');
      }
    } catch (error) {
      console.warn('Backend Gemini API offline, using local mapping:', error);
      // Find predefined or generate fallback
      const match = AI_MOCK_PROMPTS.find((p) =>
        p.prompt.toLowerCase().includes(aiPrompt.toLowerCase())
      );

      if (match) {
        setCurrentCode(match.code);
      } else {
        // Generate customized code template based on custom prompt
        setCurrentCode(`// AI-Generated TypeScript Transformation (Offline Mode)
// Prompt: ${aiPrompt}
export function transform(event: any): any {
  // Custom parsing rule mapped automatically
  const keys = Object.keys(event);
  keys.forEach(key => {
    if (typeof event[key] === 'string' && event[key].includes('@')) {
      // Auto-detected email mapping rule
      event[key + '_verified'] = true;
    }
  });

  // Inject metadata
  event.nexus_meta = {
    processed_at: new Date().toISOString(),
    transformation_version: '3.5.2'
  };

  return event;
}`);
      }
      addToast('AI Code Generation completed in Sandbox!', 'success');
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  const createPipeline = () => {
    if (!pipelineName) {
      addToast('Please specify a pipeline name', 'error');
      return;
    }

    const newPipeline: Pipeline = {
      id: Math.random().toString(36).substring(2, 9),
      name: pipelineName,
      source: selectedSource,
      transformerPrompt: aiPrompt,
      transformerCode: currentCode,
      destination: selectedDest,
      active: true,
      eventsProcessed: 0,
    };

    setPipelines((prev) => [newPipeline, ...prev]);
    setPipelineName('');
    addToast(`Pipeline "${pipelineName}" successfully deployed!`, 'success');
  };

  const deletePipeline = (id: string) => {
    setPipelines((prev) => prev.filter((p) => p.id !== id));
    addToast('Pipeline deleted', 'info');
  };

  const togglePipelineActive = (id: string) => {
    setPipelines((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newState = !p.active;
          addToast(
            `Pipeline "${p.name}" is now ${newState ? 'Running' : 'Paused'}`,
            'info'
          );
          return { ...p, active: newState };
        }
        return p;
      })
    );
  };

  const runSamplePipelineTest = (pipeline: Pipeline) => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);

    const timestamp = () => new Date().toLocaleTimeString();

    const script = [
      {
        type: 'info' as const,
        msg: `[NEXUS] Initializing sandbox worker nodes for "${pipeline.name}"...`,
      },
      {
        type: 'info' as const,
        msg: `[CONNECT] Establishing TLS 1.3 tunnels to Source: ${pipeline.source.toUpperCase()}...`,
      },
      {
        type: 'success' as const,
        msg: `[CONNECT] Secure handshake completed. Schema drift check: PASSED.`,
      },
      {
        type: 'info' as const,
        msg: `[INGEST] Pulling batch events (5,000 records loaded)...`,
      },
      {
        type: 'ai' as const,
        msg: `[AI] Applying prompt mapping: "${pipeline.transformerPrompt}"`,
      },
      {
        type: 'info' as const,
        msg: `[CODE] Compiling generated transform schema successfully.`,
      },
      {
        type: 'success' as const,
        msg: `[TRANSFORM] 4,912 events transformed cleanly. 88 minor skipped (minors filter).`,
      },
      {
        type: 'info' as const,
        msg: `[DELIVER] Dispatching secure stream chunks to Destination: ${pipeline.destination.toUpperCase()}...`,
      },
      {
        type: 'success' as const,
        msg: `[SYNC] Database rows committed. Synchronization: 100% SUCCESS.`,
      },
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < script.length) {
        setLogs((prev) => [
          ...prev,
          {
            timestamp: timestamp(),
            type: script[current].type,
            message: script[current].msg,
          },
        ]);
        current++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        addToast('Pipeline dry-run execution completed!', 'success');

        // Increase events count for that pipeline
        setPipelines((prev) =>
          prev.map((p) => {
            if (p.id === pipeline.id) {
              return {
                ...p,
                eventsProcessed: p.eventsProcessed + 4912,
                lastRun: 'Just now',
              };
            }
            return p;
          })
        );
      }
    }, 700);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(currentCode).then(() => {
      addToast('Copied transformation code to clipboard', 'success');
    });
  };

  return (
    <div className="container py-12 space-y-8 animate-fade-in relative z-10 max-w-7xl mx-auto">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/10 px-2.5 py-1 rounded-full">
            Developer Sandbox
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mt-3 font-sans">
            Data Orchestrator Workspace
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Configure custom data pipelines with embedded AI schema mappings and inspect live operations.
          </p>
        </div>

        {/* User stats widget */}
        <div className="flex items-center gap-4 bg-slate-950/40 border border-slate-800 rounded-2xl p-4">
          <div className="h-10 w-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Active Workspace Plan</p>
            <p className="text-sm font-bold text-slate-100 flex items-center gap-1.5 capitalize">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {user.plan} Account
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Pipeline Configurator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-5 shadow-xl glass">
            <h3 className="text-sm font-bold text-slate-300 tracking-wide uppercase flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              Deploy New Pipeline
            </h3>

            {/* Pipeline Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pipeline Name</label>
              <input
                type="text"
                placeholder="Elastic Transaction Flow"
                value={pipelineName}
                onChange={(e) => setPipelineName(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 px-4 text-slate-200 placeholder-slate-600 outline-none transition-all text-sm font-medium"
              />
            </div>

            {/* Source & Destination */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Source Node</label>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 px-4 text-slate-200 outline-none transition-all text-sm font-medium"
                >
                  {MOCK_CONNECTORS.sources.map((src) => (
                    <option key={src.id} value={src.id}>
                      {src.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Destination Node</label>
                <select
                  value={selectedDest}
                  onChange={(e) => setSelectedDest(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 px-4 text-slate-200 outline-none transition-all text-sm font-medium"
                >
                  {MOCK_CONNECTORS.destinations.map((dst) => (
                    <option key={dst.id} value={dst.id}>
                      {dst.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Prompt Configurator */}
            <div className="space-y-2 border-t border-slate-800/80 pt-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  AI Transformation prompt
                </label>
                <span className="text-[10px] text-slate-500">StitchNexus AI engine v3.5</span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Mask user phone numbers and E.164 normalize"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 pl-4 pr-24 text-slate-200 placeholder-slate-600 outline-none transition-all text-sm font-medium"
                />
                <button
                  onClick={generateAiTransform}
                  className="absolute right-1.5 top-1.5 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:brightness-110 text-slate-950 font-bold px-3 py-1 text-xs rounded-lg transition-all shadow-md flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  Generate
                </button>
              </div>

              {/* Preloaded prompt suggestion chips */}
              <div className="flex flex-wrap gap-2 pt-1.5">
                {AI_MOCK_PROMPTS.map((sample) => (
                  <button
                    key={sample.prompt}
                    type="button"
                    onClick={() => handlePromptSelect(sample.prompt)}
                    className={`text-[10px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                      aiPrompt === sample.prompt
                        ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {sample.prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick deployment trigger */}
            <button
              onClick={createPipeline}
              className="w-full py-3 bg-cyan-400 hover:brightness-110 text-slate-950 font-extrabold rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.15)] flex items-center justify-center gap-1.5 text-sm"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              Deploy Active Pipeline
            </button>
          </div>

          {/* Connectors Cheat sheet */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase">VPC Integration Credentials</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-800/40 pb-2 text-slate-400">
                <span>VPC ID</span>
                <span className="font-mono font-bold text-slate-200">vpc-08a9f2ce3</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/40 pb-2 text-slate-400">
                <span>DNS Tunnel Endpoint</span>
                <span className="font-mono font-bold text-slate-200">tunnel.stitchnexus.internal</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Gateway Status</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Peered Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Code Viewer & Operations (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Code IDE Panel */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[300px]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/40">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-300 font-mono">transformation-mapper.ts</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy code
              </button>
            </div>

            <div className="flex-1 p-5 font-mono text-xs text-slate-300 overflow-x-auto bg-slate-950 relative">
              {isGenerating ? (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <Sparkles className="w-10 h-10 text-indigo-400 animate-spin" />
                  <div className="space-y-1 max-w-sm">
                    <p className="font-semibold text-slate-200">StitchNexus AI Agent Generating Code...</p>
                    <p className="text-[10px] text-slate-500 font-medium">{generationStep + 1}/5: {['Analyzing maps...', 'Typing props...', 'Optimizing code...', 'Validating tests...', 'Formatting output...'][generationStep]}</p>
                  </div>
                </div>
              ) : null}

              <pre className="leading-relaxed">
                <code>{currentCode}</code>
              </pre>
            </div>
          </div>

          {/* Active pipelines list */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-xl glass">
            <h3 className="text-sm font-bold text-slate-300 tracking-wide uppercase">Active Deployed Pipelines</h3>

            <div className="space-y-3">
              {pipelines.map((pipe) => {
                const sourceConnector = MOCK_CONNECTORS.sources.find((c) => c.id === pipe.source);
                const destConnector = MOCK_CONNECTORS.destinations.find((c) => c.id === pipe.destination);

                return (
                  <div
                    key={pipe.id}
                    className="p-4 bg-slate-950/65 border border-slate-800/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-100 truncate">{pipe.name}</h4>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${
                          pipe.active
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-slate-800 border-slate-700 text-slate-500'
                        }`}>
                          {pipe.active ? 'Operational' : 'Paused'}
                        </span>
                      </div>

                      {/* Path visualization */}
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-semibold text-slate-300 capitalize">{sourceConnector?.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                        <span className="text-indigo-400 font-mono text-[10px] max-w-[120px] truncate">
                          &ldquo;{pipe.transformerPrompt}&rdquo;
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                        <span className="font-semibold text-slate-300 capitalize">{destConnector?.label}</span>
                      </div>

                      <div className="flex items-center gap-3 text-[10px] text-slate-500">
                        <span>
                          Synced:{' '}
                          <span className="text-slate-300 font-semibold">
                            {(pipe.eventsProcessed || liveCounter).toLocaleString()} events
                          </span>
                        </span>
                        <span>•</span>
                        <span>Last Run: {pipe.lastRun || 'Never'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {pipe.active && (
                        <button
                          onClick={() => runSamplePipelineTest(pipe)}
                          disabled={isRunning}
                          className="p-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/30 text-indigo-400 rounded-xl transition-all disabled:opacity-50 flex items-center gap-1.5 text-xs font-semibold"
                          title="Dry Run Pipeline Test"
                        >
                          <Play className="w-3.5 h-3.5 fill-indigo-400" />
                          Dry Run
                        </button>
                      )}

                      <button
                        onClick={() => togglePipelineActive(pipe.id)}
                        className="p-2 text-slate-400 hover:text-slate-100 rounded-xl hover:bg-slate-900 transition-colors"
                        title={pipe.active ? 'Pause Pipeline' : 'Resume Pipeline'}
                      >
                        {pipe.active ? <ToggleRight className="w-6 h-6 text-cyan-400" /> : <ToggleLeft className="w-6 h-6 text-slate-600" />}
                      </button>

                      <button
                        onClick={() => deletePipeline(pipe.id)}
                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl border border-transparent hover:border-rose-500/10 transition-all"
                        title="Delete Pipeline"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Operational Log Console */}
          {logs.length > 0 && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[220px]">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/40">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-300 font-mono">Operation Stream</span>
                </div>
                {isRunning && (
                  <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/15 px-2 py-0.5 rounded-full animate-pulse">
                    Live Logs
                  </span>
                )}
              </div>

              <div className="flex-1 p-5 font-mono text-[11px] text-slate-400 overflow-y-auto space-y-1.5 bg-slate-950">
                {logs.map((log, index) => {
                  let textClass = 'text-slate-400';
                  if (log.type === 'success') textClass = 'text-emerald-400';
                  else if (log.type === 'ai') textClass = 'text-indigo-400 font-bold';
                  else if (log.type === 'error') textClass = 'text-rose-400';

                  return (
                    <div key={index} className="flex gap-4">
                      <span className="text-slate-600 select-none">{log.timestamp}</span>
                      <span className={textClass}>{log.message}</span>
                    </div>
                  );
                })}
                <div ref={logsEndRef} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
