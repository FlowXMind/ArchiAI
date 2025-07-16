import React from 'react';
import { View } from '../types';

interface NavProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Nav: React.FC<NavProps> = ({ currentView, setCurrentView }) => {
  return (
    <div className="relative flex w-full max-w-[220px] items-center rounded-full bg-gray-900 p-1">
      {/* Sliding background */}
      <div
        className="absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-transform duration-300 ease-in-out"
        style={{
          transform: currentView === 'prd' ? 'translateX(calc(100% + 4px))' : 'translateX(0)',
        }}
        aria-hidden="true"
      />

      {/* Buttons */}
      <button
        onClick={() => setCurrentView('dashboard')}
        aria-current={currentView === 'dashboard'}
        className={`relative z-10 w-1/2 rounded-full py-1.5 text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
          currentView === 'dashboard' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        Dashboard
      </button>
      <button
        onClick={() => setCurrentView('prd')}
        aria-current={currentView === 'prd'}
        className={`relative z-10 w-1/2 rounded-full py-1.5 text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
          currentView === 'prd' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        PRD
      </button>
    </div>
  );
};

export default Nav;