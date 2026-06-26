/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from './AppContext';
import { X, Mail, Lock, User, Sparkles, Github } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, addToast } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !name)) {
      addToast('Please fill in all fields', 'error');
      return;
    }

    setIsLoading(true);
    // Simulate real auth delay
    setTimeout(() => {
      setIsLoading(false);
      const displayName = isSignUp ? name : email.split('@')[0];
      login(displayName, email);
    }, 1200);
  };

  const handleOAuthLogin = (provider: 'Google' | 'GitHub') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const mockName = provider === 'Google' ? 'Aether Dev' : 'StackMaster';
      const mockEmail = `${mockName.toLowerCase().replace(' ', '')}@gmail.com`;
      login(mockName, mockEmail);
      addToast(`Successfully authenticated with ${provider}!`, 'success');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 glass p-8 shadow-2xl animate-scale-up">
        {/* Glow border background effect */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />

        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-100 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 mb-3 border border-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 font-sans">
            {isSignUp ? 'Create your StitchNexus account' : 'Welcome back to StitchNexus'}
          </h3>
          <p className="text-sm text-slate-400 mt-1 font-sans">
            {isSignUp
              ? 'Get started with fully automated AI data pipelines.'
              : 'Log in to manage and monitor your real-time pipelines.'}
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => handleOAuthLogin('Google')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-900/50 rounded-xl text-slate-300 hover:text-slate-100 text-sm font-medium transition-all"
            disabled={isLoading}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google
          </button>
          <button
            onClick={() => handleOAuthLogin('GitHub')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-900/50 rounded-xl text-slate-300 hover:text-slate-100 text-sm font-medium transition-all"
            disabled={isLoading}
          >
            <Github className="w-4 h-4 text-slate-300" />
            GitHub
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase tracking-widest font-semibold">Or continue with</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label htmlFor="fullNameInput" className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  id="fullNameInput"
                  type="text"
                  placeholder="Aether Explorer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2 px-10 text-slate-200 placeholder-slate-600 outline-none transition-all text-sm"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label htmlFor="emailAddressInput" className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                id="emailAddressInput"
                type="email"
                placeholder="developer@stitchnexus.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2 px-10 text-slate-200 placeholder-slate-600 outline-none transition-all text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="passwordInput" className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                id="passwordInput"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2 px-10 text-slate-200 placeholder-slate-600 outline-none transition-all text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-xl transition-all hover:brightness-110 flex items-center justify-center gap-2 mt-6 shadow-[0_0_20px_rgba(6,182,212,0.2)] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : isSignUp ? (
              'Create Account'
            ) : (
              'Log In'
            )}
          </button>
        </form>

        {/* Form footer link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-slate-400 hover:text-cyan-400 transition-colors font-medium"
          >
            {isSignUp
              ? 'Already have an account? Log in instead'
              : "Don't have an account? Create one now"}
          </button>
        </div>
      </div>
    </div>
  );
};
