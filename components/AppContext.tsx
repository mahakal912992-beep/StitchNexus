/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency, BillingPeriod, User, ToastMessage } from '../types';

interface AppContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  billingPeriod: BillingPeriod;
  setBillingPeriod: (bp: BillingPeriod) => void;
  user: User;
  login: (name: string, email: string) => void;
  logout: () => void;
  upgradeUserPlan: (plan: 'starter' | 'pro' | 'enterprise') => void;
  activeView: 'landing' | 'console';
  setActiveView: (view: 'landing' | 'console') => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  checkoutPlanId: 'starter' | 'pro' | 'enterprise' | null;
  openCheckout: (planId: 'starter' | 'pro' | 'enterprise') => void;
  closeCheckout: () => void;
  toasts: ToastMessage[];
  addToast: (message: string, type: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [billingPeriod, setBillingPeriodState] = useState<BillingPeriod>('monthly');
  const [activeView, setActiveView] = useState<'landing' | 'console'>('landing');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutPlanId, setCheckoutPlanId] = useState<'starter' | 'pro' | 'enterprise' | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isDark, setIsDark] = useState(true);

  const [user, setUser] = useState<User>(() => {
    const stored = localStorage.getItem('sn_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // ignore
      }
    }
    return {
      email: '',
      name: '',
      plan: 'starter',
      isLoggedIn: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('sn_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    addToast(`Currency switched to ${c}`, 'info');
  };

  const setBillingPeriod = (bp: BillingPeriod) => {
    setBillingPeriodState(bp);
    addToast(bp === 'annual' ? 'Billing period: Annual (20% Off)' : 'Billing period: Monthly', 'info');
  };

  const login = (name: string, email: string) => {
    setUser({
      name,
      email,
      plan: 'starter',
      isLoggedIn: true,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
    });
    setIsAuthModalOpen(false);
    addToast(`Welcome back, ${name}!`, 'success');
  };

  const logout = () => {
    setUser({
      name: '',
      email: '',
      plan: 'starter',
      isLoggedIn: false,
    });
    setActiveView('landing');
    addToast('Logged out successfully', 'info');
  };

  const upgradeUserPlan = (plan: 'starter' | 'pro' | 'enterprise') => {
    setUser((prev) => ({
      ...prev,
      plan,
    }));
  };

  const openCheckout = (planId: 'starter' | 'pro' | 'enterprise') => {
    if (!user.isLoggedIn) {
      setIsAuthModalOpen(true);
      addToast('Please sign in or create an account to process payment', 'info');
      return;
    }
    setCheckoutPlanId(planId);
    setIsCheckoutModalOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutModalOpen(false);
    setCheckoutPlanId(null);
  };

  const addToast = (message: string, type: 'success' | 'info' | 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    addToast(`Switched to ${!isDark ? 'Dark' : 'Light'} Mode`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
        billingPeriod,
        setBillingPeriod,
        user,
        login,
        logout,
        upgradeUserPlan,
        activeView,
        setActiveView,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        checkoutPlanId,
        openCheckout,
        closeCheckout,
        toasts,
        addToast,
        removeToast,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
