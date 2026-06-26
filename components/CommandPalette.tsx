/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from './AppContext';
import { Search, Terminal, Moon, Sun, ArrowUpRight, DollarSign, Database, FileText, Check } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    currency,
    setCurrency,
    billingPeriod,
    setBillingPeriod,
    user,
    logout,
    setIsAuthModalOpen,
    activeView,
    setActiveView,
    isDark,
    toggleTheme,
    addToast,
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

  // Trigger palette on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      // Timeout to ensure input is mounted
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const commands = [
    {
      category: 'Navigation',
      items: [
        {
          id: 'nav-home',
          label: 'Go to Home / Landing Page',
          description: 'View the product introduction and features.',
          icon: Database,
          action: () => {
            setActiveView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          },
        },
        {
          id: 'nav-console',
          label: 'Open Developer Sandbox Console',
          description: 'Access the interactive workspace to run pipelines.',
          icon: Terminal,
          action: () => {
            setActiveView('console');
          },
        },
        {
          id: 'scroll-features',
          label: 'Jump to Platform Capabilities',
          description: 'Scroll directly to our bento/accordion features section.',
          icon: Database,
          action: () => {
            setActiveView('landing');
            setTimeout(() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          },
        },
        {
          id: 'scroll-pricing',
          label: 'Jump to Subscription Pricing',
          description: 'Scroll to the customizable subscription plans.',
          icon: DollarSign,
          action: () => {
            setActiveView('landing');
            setTimeout(() => {
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          },
        },
      ],
    },
    {
      category: 'System Config',
      items: [
        {
          id: 'theme-toggle',
          label: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`,
          description: 'Toggle the system visual style preferences.',
          icon: isDark ? Sun : Moon,
          action: () => toggleTheme(),
        },
        {
          id: 'curr-usd',
          label: 'Set Currency to USD ($)',
          description: 'Display all prices in United States Dollars.',
          icon: DollarSign,
          shortcut: currency === 'USD' ? 'Active' : undefined,
          action: () => setCurrency('USD'),
        },
        {
          id: 'curr-eur',
          label: 'Set Currency to EUR (€)',
          description: 'Display all prices in Euros.',
          icon: DollarSign,
          shortcut: currency === 'EUR' ? 'Active' : undefined,
          action: () => setCurrency('EUR'),
        },
        {
          id: 'curr-inr',
          label: 'Set Currency to INR (₹)',
          description: 'Display all prices in Indian Rupees.',
          icon: DollarSign,
          shortcut: currency === 'INR' ? 'Active' : undefined,
          action: () => setCurrency('INR'),
        },
        {
          id: 'bill-monthly',
          label: 'Set Billing Cycle to Monthly',
          description: 'View non-discounted month-to-month rates.',
          icon: FileText,
          shortcut: billingPeriod === 'monthly' ? 'Active' : undefined,
          action: () => setBillingPeriod('monthly'),
        },
        {
          id: 'bill-annual',
          label: 'Set Billing Cycle to Annual (20% Off)',
          description: 'View heavily discounted yearly subscription rates.',
          icon: FileText,
          shortcut: billingPeriod === 'annual' ? 'Active' : undefined,
          action: () => setBillingPeriod('annual'),
        },
      ],
    },
    {
      category: 'User Account',
      items: user.isLoggedIn
        ? [
            {
              id: 'user-logout',
              label: 'Sign Out / Log Out',
              description: 'Disconnect current session safely.',
              icon: Moon,
              action: () => logout(),
            },
          ]
        : [
            {
              id: 'user-login',
              label: 'Sign In / Register',
              description: 'Unlock developer console with mock cloud workspace access.',
              icon: Sun,
              action: () => setIsAuthModalOpen(true),
            },
          ],
    },
  ];

  // Flatten items for single index keyboard navigation
  const flatItems = commands.flatMap((cat) => cat.items);

  // Filter based on query
  const filteredCommands = commands
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const flatFilteredItems = filteredCommands.flatMap((cat) => cat.items);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, flatFilteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatFilteredItems.length) % Math.max(1, flatFilteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatFilteredItems[selectedIndex]) {
        flatFilteredItems[selectedIndex].action();
        setIsOpen(false);
      }
    }
  };

  if (!isOpen) {
    // Expose global opener function to window object so we can trigger from anywhere
    (window as any).openStitchNexusPalette = () => setIsOpen(true);
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9995] flex items-start justify-center p-4 pt-[15vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={() => setIsOpen(false)} />

      {/* Palette Container */}
      <div
        ref={paletteRef}
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 glass shadow-2xl animate-scale-up"
      >
        {/* Search header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search sections..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 border-none outline-none text-base"
          />
          <kbd className="hidden sm:inline-flex items-center h-5 select-none rounded border border-slate-800 bg-slate-950 px-1.5 font-mono text-[10px] font-medium text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Dynamic Results */}
        <div className="max-h-[380px] overflow-y-auto p-2">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {cat.category}
                </div>

                {cat.items.map((item) => {
                  const globalIndex = flatFilteredItems.findIndex((fi) => fi.id === item.id);
                  const isSelected = globalIndex === selectedIndex;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                        isSelected ? 'bg-slate-800 text-slate-100' : 'text-slate-300 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center border border-slate-800/60 ${
                          isSelected ? 'bg-slate-950 text-cyan-400' : 'bg-slate-950/40 text-slate-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate pr-4">
                          <p className="text-sm font-semibold truncate">{item.label}</p>
                          <p className={`text-xs truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {item.shortcut ? (
                        <span className="flex-shrink-0 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/10 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          {item.shortcut}
                        </span>
                      ) : (
                        isSelected && <ArrowUpRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm">
              No matching commands or actions found. Try typing &apos;pricing&apos; or &apos;theme&apos;.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-end gap-4 px-5 py-3 border-t border-slate-800/60 bg-slate-950/20 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <kbd className="bg-slate-950 border border-slate-800 px-1 py-0.5 rounded">↑↓</kbd> Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-slate-950 border border-slate-800 px-1 py-0.5 rounded">Enter</kbd> Select
          </span>
        </div>
      </div>
    </div>
  );
};
