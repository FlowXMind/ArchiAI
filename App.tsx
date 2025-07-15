import { useState, useCallback } from 'react';
import { ArchitectInput } from './components/ArchitectInput';
import { ArchitectureOutput } from './components/ArchitectureOutput';
import { generateArchitecturePlan } from './services/geminiService';
import { ArchitectureResponse, ArchitectureType } from './types';

function App() {
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [architectureType, setArchitectureType] = useState<ArchitectureType>(ArchitectureType.MICROSERVICES);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [architectureData, setArchitectureData] = useState<ArchitectureResponse | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!projectDescription) {
      setError("Please provide a project description.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setArchitectureData(null);

    try {
      const result = await generateArchitecturePlan(projectDescription, architectureType);
      setArchitectureData(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(`Failed to generate architecture: ${e.message}`);
      } else {
        setError("An unknown error occurred.");
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [projectDescription, architectureType]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 lg:p-16">
      <header className="w-full max-w-7xl text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-50">
          AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Software Architect</span>
        </h1>
        <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
          Describe your project and get a complete architectural plan, from tech stack to deployment diagrams.
        </p>
      </header>
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <ArchitectInput
            projectDescription={projectDescription}
            setProjectDescription={setProjectDescription}
            architectureType={architectureType}
            setArchitectureType={setArchitectureType}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="lg:col-span-8">
          <ArchitectureOutput
            data={architectureData}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <footer className="w-full max-w-7xl mt-16 flex flex-col items-center justify-center">
        <div className="w-full flex flex-row items-center justify-between bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 border border-slate-700/60 rounded-2xl shadow-lg shadow-slate-900/40 px-6 py-4">
          {/* Left: Logo and Portfolio */}
          <a href="https://thbz.in/#projects" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
            <span className="font-bold text-lg bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent group-hover:underline">THBZ</span>
            <span className="text-slate-400 text-sm group-hover:text-sky-400 transition">Projects</span>
          </a>
          {/* Center: Social Icons */}
          <div className="flex items-center gap-6">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              {/* GitHub official logo */}
              <svg className="h-5 w-5 text-slate-400 hover:text-black transition" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"/></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              {/* LinkedIn official logo */}
              <svg className="h-5 w-5 text-slate-400 hover:text-[#0A66C2] transition" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667h-3.554V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.369 4.267 5.455v6.285zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.068 0-1.143.925-2.069 2.069-2.069 1.143 0 2.068.926 2.068 2.069 0 1.142-.925 2.068-2.068 2.068zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.222 0z"/></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              {/* Instagram official logo, fixed */}
              <svg className="h-5 w-5 text-slate-400 hover:text-[#E4405F] transition" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 2.25a6.25 6.25 0 1 1 0 12.5 6.25 6.25 0 0 1 0-12.5zm0 1.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5zm6.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
            </a>
          </div>
          {/* Right: Copyright and Tech Stack */}
          <div className="flex flex-col items-end text-xs text-slate-500">
            <div>© 2025 (THBZ). All rights reserved.</div>
            <div className="flex items-center gap-1 mt-1">
              <span>Built with React, Vite, Tailwind CSS, TypeScript, Google Gemini, Cursor, and</span> <span className="text-pink-400 ml-1">♥</span>
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'inline',verticalAlign:'middle'}}><path d="M16 2C8.268 2 2 8.268 2 16c0 7.732 6.268 14 14 14s14-6.268 14-14C30 8.268 23.732 2 16 2zm0 26C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" fill="#3B82F6"/><path d="M16 8a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" fill="#6366F1"/></svg>
             
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
