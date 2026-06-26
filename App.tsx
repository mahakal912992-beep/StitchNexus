/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, Suspense } from 'react';
import { AppProvider, useApp } from './components/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { InteractiveDashboard } from './components/InteractiveDashboard';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { ArrowUp } from 'lucide-react';

// Lazy load non-critical fold components to optimize performance & lighthouse scores
const Pricing = React.lazy(() => import('./components/Pricing').then(m => ({ default: m.Pricing })));
const Testimonials = React.lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const Security = React.lazy(() => import('./components/Security').then(m => ({ default: m.Security })));
const FAQ = React.lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const AuthModal = React.lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));
const CheckoutModal = React.lazy(() => import('./components/CheckoutModal').then(m => ({ default: m.CheckoutModal })));
const CommandPalette = React.lazy(() => import('./components/CommandPalette').then(m => ({ default: m.CommandPalette })));
const SandboxConsole = React.lazy(() => import('./components/SandboxConsole').then(m => ({ default: m.SandboxConsole })));

// Non-shifting, elegant dynamic fallback loader
const SuspenseLoader: React.FC = () => (
  <div className="py-24 flex flex-col items-center justify-center gap-4 text-center bg-[#02040a]" style={{ minHeight: '120px' }}>
    <div className="relative h-8 w-8">
      <div className="absolute inset-0 rounded-full border-2 border-cyan-500/10" />
      <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 animate-spin" />
    </div>
    <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Loading Module...</span>
  </div>
);

const AppContent: React.FC = () => {
  const { activeView } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height progress and Back to Top triggers
  useEffect(() => {
    const handleScroll = () => {
      // 1. Progress line calculations
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // 2. Back to top visibility check
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500/10 selection:text-cyan-400">
      {/* Scroll Linked Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 z-[1000] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Primary Sticky Header */}
      <Navbar />

      {/* Main Structural Body */}
      <main className="flex-1">
        <Suspense fallback={<SuspenseLoader />}>
          {activeView === 'landing' ? (
            <>
              <Hero />
              <Features />
              <InteractiveDashboard />
              <Pricing />
              <Testimonials />
              <Security />
              <FAQ />
            </>
          ) : (
            <div className="pt-20">
              <SandboxConsole />
            </div>
          )}
        </Suspense>
      </main>

      {/* Unified Brand Footer */}
      <Footer />

      {/* Floating Control Modals */}
      <Suspense fallback={null}>
        <AuthModal />
        <CheckoutModal />
        <CommandPalette />
      </Suspense>
      <ToastContainer />

      {/* Back to Top Floating Trigger */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 left-6 z-50 p-3 rounded-full border border-slate-800 bg-slate-950/80 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20 shadow-2xl transition-all duration-300 hover:-translate-y-1 group backdrop-blur-md cursor-pointer"
          aria-label="Scroll Back to Top"
        >
          <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
        </button>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
