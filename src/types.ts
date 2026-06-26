/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Currency = 'USD' | 'EUR' | 'INR';
export type BillingPeriod = 'monthly' | 'annual';

export interface PricingPlan {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  description: string;
  price: {
    USD: number;
    EUR: number;
    INR: number;
  };
  features: string[];
  ctaText: string;
  featured?: boolean;
}

export interface User {
  email: string;
  name: string;
  avatarUrl?: string;
  plan: 'starter' | 'pro' | 'enterprise';
  isLoggedIn: boolean;
}

export interface PipelineNode {
  id: string;
  type: 'source' | 'transformer' | 'destination';
  label: string;
  icon: string;
  status: 'connected' | 'idle' | 'error';
  config?: Record<string, string>;
}

export interface Pipeline {
  id: string;
  name: string;
  source: string;
  transformerPrompt: string;
  transformerCode: string;
  destination: string;
  active: boolean;
  eventsProcessed: number;
  lastRun?: string;
}

export interface LogEntry {
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'error' | 'ai';
  message: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}
