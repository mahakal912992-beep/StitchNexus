/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { PRICING_PLANS } from '../data/mockData';
import { X, CreditCard, Lock, CheckCircle2, Shield, Calendar, ArrowRight, Loader } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    closeCheckout,
    checkoutPlanId,
    currency,
    billingPeriod,
    upgradeUserPlan,
    addToast,
    setActiveView,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Card & Billing Info, 2: Processing, 3: Success
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [country, setCountry] = useState('US');
  const [zip, setZip] = useState('');
  const [processingState, setProcessingState] = useState(0);

  const plan = PRICING_PLANS.find((p) => p.id === checkoutPlanId);

  useEffect(() => {
    if (!isCheckoutModalOpen) {
      setStep(1);
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setNameOnCard('');
      setZip('');
      setProcessingState(0);
    }
  }, [isCheckoutModalOpen]);

  if (!isCheckoutModalOpen || !plan) return null;

  // Price calculations
  const basePrice = plan.price[currency];
  const finalPrice = billingPeriod === 'annual' ? Math.round(basePrice * 0.8) : basePrice;
  const savings = billingPeriod === 'annual' ? Math.round(basePrice * 0.2) * 12 : 0;

  const currencySymbols = { USD: '$', EUR: '€', INR: '₹' };
  const symbol = currencySymbols[currency];

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = value.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(value);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setExpiry(value.substring(0, 5));
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    setCvc(value.substring(0, 4));
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, '').length < 16) {
      addToast('Invalid Card Number', 'error');
      return;
    }
    if (expiry.length < 5) {
      addToast('Invalid Expiration Date', 'error');
      return;
    }
    if (cvc.length < 3) {
      addToast('Invalid CVC', 'error');
      return;
    }
    if (!nameOnCard) {
      addToast('Please enter Cardholder Name', 'error');
      return;
    }

    setStep(2);

    // Multi-stage secure checkout simulation
    const milestones = [
      'Establishing secure connection with StitchNexus gateway...',
      'Encrypting details using zero-knowledge standards...',
      'Processing secure token with Stripe API...',
      'Activating subscription with bank verification...',
      'Provisioning custom container nodes...',
      'Completed! Subscription activated.',
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < milestones.length - 1) {
        current++;
        setProcessingState(current);
      } else {
        clearInterval(interval);
        setStep(3);
        upgradeUserPlan(plan.id);
        addToast(`Subscription upgraded to StitchNexus ${plan.name}!`, 'success');
      }
    }, 900);
  };

  const processingMilestones = [
    'Initializing secure handshakes...',
    'Encrypting card data with RSA key...',
    'Authorizing subscription package...',
    'Upgrading workspace privileges...',
  ];

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" onClick={closeCheckout} />

      {/* Modal */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 glass shadow-2xl animate-scale-up max-h-[90vh] flex flex-col">
        {/* Glow border header */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500" />

        <button
          onClick={closeCheckout}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-100 transition-colors p-1.5 rounded-lg hover:bg-slate-800 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 && (
          <div className="flex flex-col md:flex-row h-full overflow-y-auto">
            {/* Left side: Form */}
            <form onSubmit={handleSubmitPayment} className="flex-1 p-8 space-y-6 md:border-r border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Secure Payment</h3>
                  <p className="text-xs text-slate-400 mt-0.5">SSL Secured • PCI-DSS Compliant Gateway</p>
                </div>
              </div>

              {/* Card Inputs */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="nameOnCardInput" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Name on Card</label>
                  <input
                    id="nameOnCardInput"
                    type="text"
                    required
                    placeholder="Sarah Chen"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 px-4 text-slate-200 placeholder-slate-600 outline-none transition-all text-sm font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="cardNumberInput" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      id="cardNumberInput"
                      type="text"
                      required
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 pl-11 pr-4 text-slate-200 placeholder-slate-600 outline-none transition-all text-sm font-mono font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="expiryInput" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Expiration Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        id="expiryInput"
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={handleExpiryChange}
                        className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 pl-11 pr-4 text-slate-200 placeholder-slate-600 outline-none transition-all text-sm font-mono font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="cvvInput" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">CVC / CVV</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        id="cvvInput"
                        type="password"
                        required
                        placeholder="•••"
                        value={cvc}
                        onChange={handleCvcChange}
                        className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 pl-11 pr-4 text-slate-200 placeholder-slate-600 outline-none transition-all text-sm font-mono font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="countrySelectInput" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Country</label>
                    <select
                      id="countrySelectInput"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 px-4 text-slate-200 outline-none transition-all text-sm font-medium"
                    >
                      <option value="US">United States</option>
                      <option value="IN">India</option>
                      <option value="DE">Germany</option>
                      <option value="GB">United Kingdom</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="zipInput" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ZIP / Postal Code</label>
                    <input
                      id="zipInput"
                      type="text"
                      required
                      placeholder="10001"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full bg-slate-950/60 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-2.5 px-4 text-slate-200 placeholder-slate-600 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:brightness-110 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2 mt-6 shadow-[0_0_20px_rgba(52,211,153,0.2)]"
              >
                Pay Securely {symbol}
                {finalPrice.toLocaleString()}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5" />
                <span>Your information is protected by 256-bit AES encryption.</span>
              </div>
            </form>

            {/* Right side: Plan summary */}
            <div className="w-full md:w-[320px] bg-slate-950/50 p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 tracking-wider uppercase">Order Summary</h4>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-base font-bold text-slate-200">{plan.name} Plan</span>
                    <span className="text-slate-400 text-sm">
                      {billingPeriod === 'annual' ? 'Billed annually' : 'Billed monthly'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                </div>

                <div className="border-t border-slate-800/80 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Base Price</span>
                    <span>
                      {symbol}
                      {basePrice}/mo
                    </span>
                  </div>
                  {billingPeriod === 'annual' && (
                    <div className="flex justify-between text-sm text-emerald-400 font-medium">
                      <span>Annual Discount (20%)</span>
                      <span>
                        -{symbol}
                        {Math.round(basePrice * 0.2)}/mo
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-800 pt-4 flex items-baseline justify-between">
                  <span className="text-sm font-bold text-slate-100">Total Billed</span>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-slate-50">
                      {symbol}
                      {finalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {billingPeriod === 'annual' ? '/year' : '/month'}
                    </span>
                  </div>
                </div>

                {savings > 0 && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                    <p className="text-xs font-bold text-emerald-400">
                      You save {symbol}
                      {savings.toLocaleString()} per year with annual billing!
                    </p>
                  </div>
                )}
              </div>

              {/* Guarantees */}
              <div className="space-y-3 pt-6 border-t border-slate-900">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>Instant pipeline provisioning</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-16 flex flex-col items-center justify-center text-center space-y-8 min-h-[400px]">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-cyan-500/10 animate-ping" />
              <Loader className="w-16 h-16 text-cyan-400 animate-spin" />
            </div>

            <div className="max-w-md space-y-3">
              <h3 className="text-lg font-bold text-slate-100">Securing Subscription Transaction...</h3>
              <p className="text-sm text-slate-400">Please do not refresh the page or click back.</p>
            </div>

            {/* Custom Milestone indicators */}
            <div className="w-full max-w-sm space-y-2.5">
              {processingMilestones.map((milestone, idx) => {
                const isActive = idx === processingState;
                const isCompleted = idx < processingState;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-slate-950 border-cyan-500/30 text-slate-200 shadow-md'
                        : isCompleted
                        ? 'bg-slate-900/40 border-emerald-500/10 text-slate-400'
                        : 'bg-transparent border-transparent text-slate-600'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-scale-up" />
                      ) : isActive ? (
                        <Loader className="w-4 h-4 text-cyan-400 animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-700" />
                      )}
                    </div>
                    <span className="text-xs font-semibold">{milestone}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-16 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px] relative">
            {/* Confetti simulation divs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full opacity-65 animate-fall"
                  style={{
                    backgroundColor: ['#4ade80', '#38bdf8', '#c084fc', '#fbbf24'][i % 4],
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 20}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>

            <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="max-w-md space-y-2">
              <h3 className="text-2xl font-black text-slate-50">Upgrade Completed!</h3>
              <p className="text-sm text-slate-300">
                Thank you for subscribing to StitchNexus {plan.name}. Your billing plan is active, and your cloud workspace privileges have been instantly elevated.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => {
                  closeCheckout();
                  setActiveView('console');
                }}
                className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:brightness-110 text-slate-950 font-bold rounded-xl transition-all shadow-[0_0_25px_rgba(52,211,153,0.3)]"
              >
                Go to Sandbox Console
              </button>
              <button
                onClick={closeCheckout}
                className="px-6 py-3 border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-300 hover:text-slate-100 rounded-xl transition-colors font-semibold"
              >
                Close Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
