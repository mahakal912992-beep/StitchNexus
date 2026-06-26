/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PricingPlan } from '../types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small teams exploring data automation.',
    price: {
      USD: 0,
      EUR: 0,
      INR: 0,
    },
    features: [
      'Up to 1M events/month',
      '3 active pipelines',
      '10 basic connectors',
      'Community support (Discord)',
      'Basic logging and observability',
    ],
    ctaText: 'Get Started Free',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams that need reliable, scalable data automation with AI enrichment.',
    price: {
      USD: 99,
      EUR: 89,
      INR: 7999,
    },
    features: [
      'Up to 100M events/month',
      'Unlimited pipelines',
      'All 200+ connectors included',
      'AI-driven transformations (50K calls)',
      'Priority slack support (4h response)',
      'Advanced observability & alerts',
      'Team collaboration (10 seats)',
    ],
    ctaText: 'Start Pro Trial',
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations requiring enterprise security, compliance, and unlimited scale.',
    price: {
      USD: 299,
      EUR: 269,
      INR: 24999,
    },
    features: [
      'Unlimited events & pipelines',
      'Custom connectors development',
      'Unlimited AI enrichment calls',
      'Dedicated SRE team (1h SLA)',
      'SOC 2 Type II / HIPAA / GDPR compliance',
      'SSO/SAML 2.0 & VPC isolation',
      'Unlimited seats & full audit logging',
    ],
    ctaText: 'Contact Sales',
  },
];

export const CLIENT_TESTIMONIALS = [
  {
    id: '1',
    stars: 5,
    quote: 'StitchNexus cut our pipeline build time from 3 weeks to 2 days. The AI enrichment layer alone saved us $400K in engineering hours this year.',
    author: 'Sarah Chen',
    role: 'Head of Data Engineering',
    company: 'Meridian AI',
    initials: 'SC',
  },
  {
    id: '2',
    stars: 5,
    quote: "The bento-style UI for managing features is genuinely delightful. Best DX I've seen in a data tool. We migrated from Fivetran in one sprint.",
    author: 'Marcus Webb',
    role: 'Principal Engineer',
    company: 'GridScale AI',
    initials: 'MW',
  },
  {
    id: '3',
    stars: 5,
    quote: '99.99% uptime, SOC 2 compliance, and a support team that responds in under an hour. Enterprise-grade at a price point our CFO actually approved.',
    author: 'Priya Nair',
    role: 'VP Engineering',
    company: 'Quantum Systems',
    initials: 'PN',
  },
  {
    id: '4',
    stars: 5,
    quote: 'We handle 2 billion events a day through StitchNexus. Not a single incident in 14 months. The observability dashboard is exceptional.',
    author: 'James Okafor',
    role: 'CTO',
    company: 'Synapse IO',
    initials: 'JO',
  },
  {
    id: '5',
    stars: 5,
    quote: "The command palette alone is worth the subscription. Ctrl+K for everything — deploying pipelines, checking logs, switching connectors. It's magic.",
    author: 'Ana Kowalski',
    role: 'Data Architect',
    company: 'ClearPath Inc',
    initials: 'AK',
  },
  {
    id: '6',
    stars: 5,
    quote: 'Switched from a custom Airflow + dbt stack. StitchNexus does everything in a fraction of the infrastructure cost. The AI-generated transforms are eerily accurate.',
    author: 'David Tan',
    role: 'Head of Analytics',
    company: 'VeloStack',
    initials: 'DT',
  },
];

export const SECURITY_BADGES = [
  {
    id: 'soc2',
    icon: 'Shield',
    title: 'SOC 2 Type II Certified',
    description: 'Independently audited annually to verify operational safety and security controls.',
  },
  {
    id: 'gdpr',
    icon: 'FileText',
    title: 'GDPR Compliant',
    description: 'Strict adherence to European data privacy standards, with native EU residency hosting.',
  },
  {
    id: 'hipaa',
    icon: 'Activity',
    title: 'HIPAA Compliant',
    description: 'Enables hosting and processing of protected health information securely.',
  },
  {
    id: 'vpc',
    icon: 'Lock',
    title: 'VPC Peering & Isolation',
    description: 'Deploy inside isolated subnets with custom VPN/mTLS tunnels for zero-trust data paths.',
  },
  {
    id: 'encryption',
    icon: 'Key',
    title: 'End-to-End Encryption',
    description: 'AES-256 for data at rest, TLS 1.3 for data in motion, with customer-managed keys.',
  },
  {
    id: 'audit',
    icon: 'Clock',
    title: 'Immutable Audit Logs',
    description: 'Cryptographically signed audit logs capturing every user and machine event, with 7-year retention.',
  },
];

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'How quickly can I get started?',
    answer: 'Connect your first data source in under 5 minutes using our guided setup wizard. Pre-built connectors handle authentication automatically — just enter your credentials and select your tables. Your first pipeline can be live in under 15 minutes.',
  },
  {
    id: 'faq-2',
    question: 'Is my data stored by StitchNexus?',
    answer: 'StitchNexus is a data movement and processing platform — we do not persist your operational data. Events pass through our secure processing layer in-memory and are immediately forwarded to your destination. Only metadata (pipeline configs, performance metrics, and logs) is stored securely in your designated cloud region.',
  },
  {
    id: 'faq-3',
    question: 'Can I migrate from Fivetran, Airbyte, or dbt?',
    answer: 'Yes. We offer a one-click migration wizard for Fivetran and Airbyte connector configurations. dbt model definitions can be imported and converted to our AI-enhanced SQL/TypeScript transforms automatically. Our technical team provides hands-on migration assistance for Pro and Enterprise users.',
  },
  {
    id: 'faq-4',
    question: 'What happens if I exceed my event limit?',
    answer: 'We never drop your data. If you approach your monthly limit, we will notify you proactively. Overages are billed at a highly affordable flat per-million-event rate. You can easily set spend caps to prevent unexpected billing, or configure auto-upgrade thresholds.',
  },
  {
    id: 'faq-5',
    question: 'What SLA do you guarantee?',
    answer: 'Starter plans receive best-effort support. Pro plans carry a 99.9% uptime SLA with 4-hour response times. Enterprise plans guarantee 99.99% uptime with 1-hour responses backed by dedicated SRE support and financial credits.',
  },
  {
    id: 'faq-6',
    question: 'Do you offer an on-premise or private cloud deployment?',
    answer: 'Yes. Enterprise customers can deploy StitchNexus within their own AWS, GCP, or Azure VPC. We provide fully supported Terraform modules, Helm charts, and continuous updates via secure container registries.',
  },
];

export const MOCK_CONNECTORS = {
  sources: [
    { id: 'snowflake', label: 'Snowflake', icon: 'Database' },
    { id: 'postgresql', label: 'PostgreSQL', icon: 'Database' },
    { id: 'kafka', label: 'Apache Kafka', icon: 'Zap' },
    { id: 'salesforce', label: 'Salesforce', icon: 'Cloud' },
    { id: 'google_sheets', label: 'Google Sheets', icon: 'Grid' },
    { id: 's3', label: 'Amazon S3', icon: 'FileCode' },
  ],
  destinations: [
    { id: 'bigquery', label: 'Google BigQuery', icon: 'Server' },
    { id: 'snowflake_dest', label: 'Snowflake Analytics', icon: 'Database' },
    { id: 'postgresql_dest', label: 'PostgreSQL DW', icon: 'Database' },
    { id: 'slack', label: 'Slack Alerts', icon: 'Slack' },
    { id: 'elasticsearch', label: 'Elasticsearch', icon: 'Search' },
    { id: 's3_dest', label: 'Amazon S3 Bucket', icon: 'FileCode' },
  ],
};

export const AI_MOCK_PROMPTS = [
  {
    prompt: 'Filter out users under 18 and mask their email domains',
    code: `// AI-Generated TypeScript Transformation
export function transform(event: any): any {
  if (event.age < 18) {
    return null; // Skip records for minors
  }
  
  if (event.email) {
    const [localPart, domain] = event.email.split('@');
    if (domain) {
      // Mask email domain for privacy preservation
      event.email_masked = \`\${localPart}@masked-domain.com\`;
    }
  }
  
  event.processed_at = new Date().toISOString();
  event.security_classification = 'restricted';
  return event;
}`,
  },
  {
    prompt: 'Extract phone numbers and normalize to E.164 format',
    code: `// AI-Generated TypeScript Transformation
export function transform(event: any): any {
  if (event.phone) {
    // Strip non-numeric characters except +
    let cleaned = event.phone.replace(/[^\\d+]/g, '');
    
    // Auto-prepend US country code if 10 digits
    if (cleaned.length === 10) {
      cleaned = '+1' + cleaned;
    } else if (cleaned.length > 10 && !cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    }
    
    event.normalized_phone = cleaned;
  }
  return event;
}`,
  },
  {
    prompt: 'Calculate order subtotal, tax of 8.25%, and total price',
    code: `// AI-Generated TypeScript Transformation
export function transform(event: any): any {
  if (event.items && Array.isArray(event.items)) {
    const subtotal = event.items.reduce((acc: number, item: any) => {
      return acc + (item.price * (item.quantity || 1));
    }, 0);
    
    event.summary = {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat((subtotal * 0.0825).toFixed(2)),
      total: parseFloat((subtotal * 1.0825).toFixed(2))
    };
  }
  return event;
}`,
  },
];
