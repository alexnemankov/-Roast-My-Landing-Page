import React from 'react';
import { RoastResponse } from '../types';

interface RoastDisplayProps {
  data: RoastResponse;
  onReset: () => void;
}

export const RoastDisplay: React.FC<RoastDisplayProps> = ({ data, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* First Impression */}
      <div className="bg-brand-card border border-red-900/30 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
        <h2 className="text-2xl font-bold text-red-500 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          The Gut Punch
        </h2>
        <p className="text-3xl font-black text-white italic leading-tight">
          "{data.firstImpression}"
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* The Roast */}
        <div className="bg-brand-card border border-neutral-700 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-orange-500 mb-6 flex items-center gap-2">
             🔥 The Roast
          </h2>
          <ul className="space-y-4">
            {data.roast.map((point, index) => (
              <li key={index} className="flex gap-3 text-brand-text">
                <span className="text-orange-500 font-bold shrink-0 mt-1">✗</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The Fix */}
        <div className="bg-brand-card border border-neutral-700 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-green-500 mb-6 flex items-center gap-2">
             🛠️ The Fix
          </h2>
          <ul className="space-y-4">
            {data.fixes.map((point, index) => (
              <li key={index} className="flex gap-3 text-brand-text">
                <span className="text-green-500 font-bold shrink-0 mt-1">✓</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center pt-8">
        <button 
          onClick={onReset}
          className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 border border-neutral-600 hover:border-brand-accent group"
        >
          <span className="group-hover:text-brand-accent transition-colors">Roast Another One</span>
        </button>
      </div>
    </div>
  );
};
