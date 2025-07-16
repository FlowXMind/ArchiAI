import React from 'react';
import { View } from '../types';

interface NavProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Nav: React.FC<NavProps> = ({ currentView, setCurrentView }) => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <div className="relative flex items-center rounded-full bg-gray-900/70 backdrop-blur-xl border border-white/10 shadow-2xl p-1">
        {/* Sliding background */}
        <div
          className="absolute top-1 left-1 h-10 w-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: currentView === 'prd' ? 'translateX(calc(100% + 4px))' : 'translateX(0)',
          }}
          aria-hidden="true"
        />

        {/* Buttons */}
        <button
          onClick={() => setCurrentView('dashboard')}
          aria-current={currentView === 'dashboard'}
          className="relative z-10 w-28 h-10 rounded-full text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-blue-400 text-white"
        >
          Dashboard
        </button>
        <button
          onClick={() => setCurrentView('prd')}
          aria-current={currentView === 'prd'}
          className="relative z-10 w-28 h-10 rounded-full text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-blue-400 text-white"
        >
          PRD
        </button>
      </div>
    </div>
  );
};

export default Nav;