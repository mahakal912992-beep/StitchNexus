/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CLIENT_TESTIMONIALS } from '../data/mockData';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#05070f] border-t border-slate-900/60 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-16 space-y-4">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/10 px-3 py-1 rounded-full">
            Client Success
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-100 font-sans tracking-tight">
            Loved by Data Architects and Engineers
          </h2>
          <p className="text-sm md:text-base text-slate-400 font-sans leading-relaxed">
            See how scaling teams utilize StitchNexus to offload custom ETL pipelines, lower cloud server overhead, and preserve pipeline uptime.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIENT_TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-6 bg-slate-950/40 border border-slate-900/80 rounded-2xl flex flex-col justify-between space-y-6 hover:border-slate-800 hover:bg-slate-900/10 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic font-sans">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-900/40">
                <div className="h-9 w-9 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs select-none">
                  {review.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{review.author}</h4>
                  <p className="text-[10px] text-slate-500">
                    {review.role} • <span className="font-semibold text-slate-400">{review.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
