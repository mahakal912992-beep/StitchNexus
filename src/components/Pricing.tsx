/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from './AppContext';
import { PRICING_PLANS } from '../data/mockData';
import { Check, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

export const Pricing: React.FC = () => {
  const {
    currency,
    setCurrency,
    billingPeriod,
    setBillingPeriod,
    openCheckout,
    user,
  } = useApp();

  const currencySymbols = { USD: '$', EUR: '€', INR: '₹' };
  const symbol = currencySymbols[currency];

  return (
    <section id="pricing" className="py-24 bg-[#02040a] relative overflow-hidden border-t border-slate-900/60">
      {/* Background glowing highlights */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl text-left space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/10 px-3 py-1 rounded-full">
              Flexible Subscriptions
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-100 font-sans tracking-tight">
              Pay-As-You-Grow Matrix
            </h2>
            <p className="text-sm md:text-base text-slate-400 font-sans">
              Choose the perfect plan for your ingestion scale. Upgrade or downgrade instantly as pipeline volumes fluctuate.
            </p>
          </div>

          {/* Pricing Controls: Toggle & Currency Dropdown */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-950/60 border border-slate-900 p-2 rounded-2xl">
            {/* Currency Selector */}
            <div className="flex bg-slate-900/60 rounded-xl border border-slate-800/60 p-0.5">
              {(['USD', 'EUR', 'INR'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                    currency === curr
                      ? 'bg-slate-950 text-cyan-400 border border-slate-850 shadow'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Monthly/Annual Switch */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-900/60 rounded-xl border border-slate-800/60">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`text-xs font-bold transition-colors cursor-pointer ${
                  billingPeriod === 'monthly' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Monthly
              </button>
              <div
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
                className="w-9 h-5 rounded-full bg-slate-950 border border-slate-800 flex items-center p-0.5 cursor-pointer"
              >
                <div
                  className={`h-3.5 w-3.5 rounded-full bg-cyan-400 transition-transform duration-300 ${
                    billingPeriod === 'annual' ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer ${
                  billingPeriod === 'annual' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Annual
                <span className="text-[8px] font-black bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const baseRate = plan.price[currency];
            const finalRate = billingPeriod === 'annual' ? Math.round(baseRate * 0.8) : baseRate;
            const isCurrent = user.isLoggedIn && user.plan === plan.id;
            const isFeatured = plan.featured;

            return (
              <div
                key={plan.id}
                className={`group relative rounded-3xl border p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-indigo-500/40 shadow-[0_0_50px_rgba(99,102,241,0.08)] text-slate-100'
                    : 'bg-slate-950/40 border-slate-900/80 text-slate-300 hover:border-slate-800'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow shadow-cyan-400/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-slate-950" />
                    Most Popular
                  </div>
                )}

                {/* Card Top: Details & Pricing */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-sans tracking-tight text-slate-100">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 font-sans">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    {baseRate === 0 ? (
                      <span className="text-4xl font-extrabold text-slate-50">Free</span>
                    ) : (
                      <>
                        <span className="text-4xl font-black text-slate-50 tracking-tight font-mono">
                          {symbol}
                          {finalRate.toLocaleString()}
                        </span>
                        <span className="text-slate-400 text-xs font-semibold uppercase">
                          / {billingPeriod === 'annual' ? 'mo (billed yr)' : 'month'}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Pricing Discount details / Savings */}
                  {billingPeriod === 'annual' && baseRate > 0 && (
                    <div className="text-[10px] font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-xl">
                      Save {symbol}
                      {((baseRate - finalRate) * 12).toLocaleString()} per year
                    </div>
                  )}

                  {/* Features List */}
                  <div className="border-t border-slate-900 pt-6 space-y-4">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Included Features</p>
                    <ul className="space-y-3.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs">
                          <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-normal">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-8 mt-auto">
                  {isCurrent ? (
                    <div className="w-full text-center py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 uppercase tracking-wide">
                      <Check className="w-4 h-4" />
                      Active Subscriber
                    </div>
                  ) : plan.id === 'enterprise' ? (
                    <a
                      href="mailto:sales@stitchnexus.ai"
                      className="w-full text-center block py-3 border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-200 hover:text-slate-50 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {plan.ctaText}
                    </a>
                  ) : (
                    <button
                      onClick={() => openCheckout(plan.id)}
                      className={`w-full py-3.5 text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all cursor-pointer ${
                        isFeatured
                          ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 hover:brightness-110 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-850'
                      }`}
                    >
                      {plan.ctaText}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
