import React from 'react';
import { ArchitectureType } from '../types';
import { ARCHITECTURE_TYPES } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface ArchitectInputProps {
  projectDescription: string;
  setProjectDescription: (value: string) => void;
  architectureType: ArchitectureType;
  setArchitectureType: (value: ArchitectureType) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

export const ArchitectInput: React.FC<ArchitectInputProps> = ({
  projectDescription,
  setProjectDescription,
  architectureType,
  setArchitectureType,
  isLoading,
  onSubmit,
}) => {
  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-8 shadow-2xl shadow-slate-900/50 h-full flex flex-col">
      <h2 className="text-3xl font-bold text-sky-300 mb-6">Project Details</h2>
      
      <div className="flex-grow flex flex-col space-y-6">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
            Describe your project
          </label>
          <textarea
            id="description"
            rows={8}
            className="w-full bg-slate-900/70 border border-slate-700 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 placeholder-slate-500 shadow-inner shadow-slate-900/50"
            placeholder="e.g., A real-time chat application for remote teams with video calling and file sharing..."
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="architecture" className="block text-sm font-medium text-slate-300 mb-2">
            Preferred Architecture Style
          </label>
          <div className="relative">
            <select
              id="architecture"
              className="w-full appearance-none bg-slate-900/70 border border-slate-700 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 shadow-inner shadow-slate-900/50"
              value={architectureType}
              onChange={(e) => setArchitectureType(e.target.value as ArchitectureType)}
            >
              {ARCHITECTURE_TYPES.map((type) => (
                <option key={type} value={type} className="bg-slate-800 text-slate-200">{type}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <button
          onClick={onSubmit}
          disabled={isLoading || !projectDescription}
          className="w-full flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500/50 transform enabled:hover:-translate-y-1"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2"/>
              Generate Architecture
            </>
          )}
        </button>
      </div>
    </div>
  );
};