import React, { useState } from 'react';
import { Header } from './components/Header';
import { UploadArea } from './components/UploadArea';
import { RoastDisplay } from './components/RoastDisplay';
import { roastLandingPage } from './services/geminiService';
import { LoadingState, RoastResponse } from './types';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [roastData, setRoastData] = useState<RoastResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = async (base64: string, mimeType: string) => {
    setLoadingState(LoadingState.ANALYZING);
    setError(null);
    try {
      const data = await roastLandingPage(base64, mimeType);
      setRoastData(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (e) {
      console.error(e);
      setLoadingState(LoadingState.ERROR);
      setError("The AI was too stunned by your website to speak. (API Error - check your key or try again)");
    }
  };

  const handleReset = () => {
    setLoadingState(LoadingState.IDLE);
    setRoastData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto flex-grow flex flex-col">
        
        <Header />

        <main className="flex-grow flex flex-col items-center justify-start mt-8 w-full">
          
          {loadingState === LoadingState.IDLE && (
            <UploadArea 
              onImageSelected={handleImageSelected} 
              isLoading={false} 
            />
          )}

          {loadingState === LoadingState.ANALYZING && (
            <div className="flex flex-col items-center justify-center mt-20 space-y-6 animate-fade-in">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-neutral-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-brand-accent border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </div>
              <h2 className="text-2xl font-bold text-white animate-pulse-fast">
                Analyzing the cringe...
              </h2>
              <p className="text-brand-sub">Summoning the spirit of Gordon Ramsay</p>
            </div>
          )}

          {loadingState === LoadingState.ERROR && (
             <div className="text-center mt-12 max-w-lg bg-red-900/20 border border-red-800 p-8 rounded-xl">
               <h3 className="text-xl font-bold text-red-500 mb-2">Error</h3>
               <p className="text-brand-text mb-6">{error}</p>
               <button 
                onClick={handleReset}
                className="bg-neutral-800 hover:bg-neutral-700 text-white py-2 px-6 rounded-lg transition-colors"
               >
                 Try Again
               </button>
             </div>
          )}

          {loadingState === LoadingState.SUCCESS && roastData && (
            <RoastDisplay data={roastData} onReset={handleReset} />
          )}

        </main>

        <footer className="mt-20 py-6 text-center text-neutral-600 text-sm">
          <p>Powered by Google Gemini 2.5 • Use at your own emotional risk</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
