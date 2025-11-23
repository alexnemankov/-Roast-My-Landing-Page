import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-12 px-4">
      <div className="inline-block p-2 px-4 rounded-full bg-brand-accent/10 border border-brand-accent/20 mb-4">
        <span className="text-brand-accent font-bold text-sm tracking-wider uppercase">Beta Version</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-6 drop-shadow-sm">
        🔥 Roast My Landing Page
      </h1>
      <p className="text-xl md:text-2xl text-brand-sub max-w-2xl mx-auto font-light leading-relaxed">
        Upload a screenshot. Prepare to cry. <span className="text-white font-semibold">Then fix your site.</span>
      </p>
    </header>
  );
};
