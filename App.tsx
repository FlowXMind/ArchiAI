import React, { useState, useCallback, useEffect } from 'react';
import { ArchitectureData, View } from './types';
import { generateArchitecturePlan } from './services/geminiService';
import ProjectInputForm from './components/ProjectInputForm';
import Dashboard from './components/Dashboard';
import PrdDisplay from './components/PrdDisplay';
import Loader from './components/common/Loader';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundAnimation from './components/common/BackgroundAnimation';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<ArchitectureData | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGenerate = useCallback(async (projectDescription: string) => {
    if (!projectDescription) {
      setError("Project description cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setApiResponse(null);
    try {
      const data = await generateArchitecturePlan(projectDescription);
      setApiResponse(data);
      setCurrentView('dashboard');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetApp = () => {
    setApiResponse(null);
    setError(null);
    setIsLoading(false);
    setCurrentView('dashboard');
  };

  const handleTryAgain = () => {
    setError(null);
    setApiResponse(null);
    setIsLoading(false);
  }

  return (
    <div className={`min-h-screen bg-black text-gray-200 transition-opacity duration-1000 flex flex-col relative ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <BackgroundAnimation />
      <Header
        onReset={resetApp}
        hasData={!!apiResponse}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      <main className="relative z-10 w-full flex-grow p-4 sm:p-6 lg:p-8 max-w-8xl mx-auto mt-[3.5rem] mb-[0rem]">
        {!apiResponse && !isLoading && !error && (
          <ProjectInputForm onGenerate={handleGenerate} />
        )}
        
        {isLoading && <Loader />}

        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center text-center bg-gray-900 p-8 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Generation Failed</h2>
            <p className="text-gray-300 mb-6 max-w-md">{error}</p>
            <button
              onClick={handleTryAgain}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {apiResponse && !isLoading && (
          <div className="animate-fade-in">
            <div className="mb-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">{apiResponse.projectName}</h1>
              <p className="text-lg text-gray-400">{apiResponse.projectSummary}</p>
            </div>
            <div className="mt-6">
              {currentView === 'dashboard' && <Dashboard data={apiResponse} />}
              {currentView === 'prd' && <PrdDisplay prd={apiResponse.prd} projectName={apiResponse.projectName} />}
            </div>
          </div>
        )}
      </main>
      {!isLoading && <Footer />}
    </div>
  );
};

export default App;