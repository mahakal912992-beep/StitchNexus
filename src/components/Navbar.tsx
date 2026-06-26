/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { Search, Moon, Sun, Terminal, LogOut, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    user,
    logout,
    setIsAuthModalOpen,
    isDark,
    toggleTheme,
    currency,
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Monitor scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut label based on OS
  const getShortcutLabel = () => {
    if (typeof navigator !== 'undefined') {
      return navigator.userAgent.toLowerCase().includes('mac') ? '⌘K' : 'Ctrl+K';
    }
    return 'Ctrl+K';
  };

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (activeView !== 'landing') {
      setActiveView('landing');
    }
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[100] border-b transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-slate-950/90 shadow-2xl backdrop-blur-md border-slate-800/80'
          : 'py-5 bg-transparent border-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <button
          onClick={() => {
            setActiveView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-slate-100 hover:text-cyan-400 transition-colors focus-visible:outline-none"
        >
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.2)" strokeWidth="1" />
            <path d="M8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 16C8 20.4183 11.5817 24 16 24" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="16" r="3" fill="#22d3ee" className="animate-pulse" />
            <circle cx="8" cy="16" r="1.5" fill="#6366f1" />
            <circle cx="24" cy="16" r="1.5" fill="#a855f7" />
          </svg>
          <span className="text-lg font-black tracking-tighter font-sans uppercase bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text text-transparent">
            StitchNexus
          </span>
        </button>

        {/* Center: Navigation Links */}
        {activeView === 'landing' && (
          <div className="hidden md:flex items-center gap-1.5 bg-slate-950/40 border border-slate-900 rounded-full p-1 shadow-inner">
            <button
              onClick={() => handleNavClick('features')}
              className="text-xs font-semibold px-4 py-2 text-slate-400 hover:text-slate-100 transition-colors rounded-full"
            >
              Platform
            </button>
            <button
              onClick={() => handleNavClick('preview')}
              className="text-xs font-semibold px-4 py-2 text-slate-400 hover:text-slate-100 transition-colors rounded-full"
            >
              Solutions
            </button>
            <button
              onClick={() => (window as any).openStitchNexusPalette?.()}
              className="text-xs font-semibold px-4 py-2 text-slate-400 hover:text-slate-100 transition-colors rounded-full"
            >
              Command Palette
            </button>
            <button
              onClick={() => handleNavClick('pricing')}
              className="text-xs font-semibold px-4 py-2 text-slate-400 hover:text-slate-100 transition-colors rounded-full"
            >
              Pricing
            </button>
          </div>
        )}

        {/* Right side: Utilities & Auth */}
        <div className="hidden md:flex items-center gap-4">
          {/* Command palette search bar button */}
          <button
            onClick={() => (window as any).openStitchNexusPalette?.()}
            className="flex items-center gap-4 px-3 py-1.5 bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-500 hover:text-slate-300 rounded-xl transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span className="text-xs font-medium text-slate-500">Search...</span>
            <kbd className="inline-flex items-center h-5 select-none rounded border border-slate-800 bg-slate-900 px-1.5 font-mono text-[9px] font-semibold text-slate-500">
              {getShortcutLabel()}
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 border border-slate-800/80 hover:border-slate-700 bg-slate-950/20 text-slate-400 hover:text-slate-100 rounded-xl transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-cyan-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          {/* Authentication Section */}
          {user.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1 rounded-full border border-slate-800 bg-slate-950/30 hover:border-slate-700 transition-colors"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border border-slate-800 bg-slate-900"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="32"
                  height="32"
                />
                <span className="text-xs font-bold text-slate-300 pr-2">{user.name}</span>
              </button>

              {userDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl glass z-50 animate-scale-up">
                    <div className="px-3 py-2 border-b border-slate-800/60">
                      <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Signed in as</p>
                      <p className="text-xs font-semibold text-slate-200 truncate">{user.email}</p>
                      <span className="text-[9px] font-extrabold text-cyan-400 bg-cyan-500/10 border border-cyan-500/10 px-1.5 py-0.5 rounded-full mt-1.5 inline-block capitalize">
                        {user.plan} account
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setActiveView(activeView === 'console' ? 'landing' : 'console');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 rounded-xl transition-all mt-1"
                    >
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      {activeView === 'console' ? 'Go to Landing Page' : 'Go to Sandbox Console'}
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-xs font-bold text-slate-400 hover:text-slate-100 transition-colors px-3 py-2"
              >
                Log In
              </button>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-xs font-extrabold text-slate-950 bg-slate-50 hover:bg-white rounded-full py-2 px-5 transition-all shadow-md flex items-center gap-1 group"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 border border-slate-800/80 bg-slate-950/20 text-slate-400 rounded-xl"
          >
            {isDark ? <Sun className="w-4 h-4 text-cyan-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-slate-800/80 bg-slate-950/20 text-slate-400 rounded-xl"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drop tray */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden border-b border-slate-800 bg-slate-950/95 glass p-6 space-y-4 animate-slide-in"
        >
          {activeView === 'landing' && (
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleNavClick('features')}
                className="text-left py-2.5 text-sm font-semibold text-slate-400 hover:text-slate-100"
              >
                Platform Capabilities
              </button>
              <button
                onClick={() => handleNavClick('preview')}
                className="text-left py-2.5 text-sm font-semibold text-slate-400 hover:text-slate-100"
              >
                Interactive Solutions
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  (window as any).openStitchNexusPalette?.();
                }}
                className="text-left py-2.5 text-sm font-semibold text-slate-400 hover:text-slate-100"
              >
                Search Commands
              </button>
              <button
                onClick={() => handleNavClick('pricing')}
                className="text-left py-2.5 text-sm font-semibold text-slate-400 hover:text-slate-100"
              >
                Subscription Pricing
              </button>
            </div>
          )}

          <div className="border-t border-slate-800 pt-4 flex flex-col gap-3">
            {user.isLoggedIn ? (
              <>
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border border-slate-800"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    width="40"
                    height="40"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-200">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveView(activeView === 'console' ? 'landing' : 'console');
                  }}
                  className="w-full py-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold rounded-xl text-center text-sm"
                >
                  {activeView === 'console' ? 'Go to Landing Page' : 'Go to Sandbox Console'}
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-3 border border-slate-800 hover:bg-slate-900 text-slate-400 font-bold rounded-xl text-center text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-3 border border-slate-800 bg-slate-950/40 text-slate-200 font-bold rounded-xl text-center text-sm"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-3 bg-slate-50 text-slate-950 font-extrabold rounded-xl text-center text-sm"
                >
                  Get Started Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
