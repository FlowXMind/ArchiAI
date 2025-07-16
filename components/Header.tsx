import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { View } from '../types'; // Import View type

interface HeaderProps {
    onReset: () => void;
    hasData: boolean;
    currentView: View; // Add currentView prop
    setCurrentView: (view: View) => void; // Add setCurrentView prop
}

const Header: React.FC<HeaderProps> = ({ onReset, hasData, currentView, setCurrentView }) => (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="relative flex items-center justify-center bg-gray-900/70 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full h-16 px-8">
            <div className="flex items-center space-x-3">
                <LogoIcon className="h-9 w-9" />
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 tracking-tight animate-gradient-text">ArchiAi</span>
            </div>

            {hasData && (
                <div className="flex items-center space-x-4 ml-6">
                    <div className="relative flex items-center rounded-full bg-gray-800/50 p-1">
                        <div
                            className="absolute top-1 left-1 h-8 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{
                                transform: currentView === 'prd' ? 'translateX(calc(100% + 4px))' : 'translateX(0)',
                            }}
                            aria-hidden="true"
                        />
                        <button
                            onClick={() => setCurrentView('dashboard')}
                            aria-current={currentView === 'dashboard'}
                            className="relative z-10 w-24 h-8 rounded-full text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-blue-400 text-white"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => setCurrentView('prd')}
                            aria-current={currentView === 'prd'}
                            className="relative z-10 w-24 h-8 rounded-full text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-blue-400 text-white"
                        >
                            PRD
                        </button>
                    </div>
                    <button
                        onClick={onReset}
                        className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold text-xs rounded-full shadow-md transition-colors duration-300 border border-gray-700"
                    >
                        New Project
                    </button>
                </div>
            )}
        </div>
        <style>{`
            @keyframes animate-gradient-text {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .animate-gradient-text {
                background-size: 200% auto;
                animation: animate-gradient-text 5s ease-in-out infinite;
            }
        `}</style>
    </header>
);

export default Header;