import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

interface HeaderProps {
    onReset: () => void;
    hasData: boolean;
}

const Header: React.FC<HeaderProps> = ({ onReset, hasData }) => (
    <header className="relative z-50 py-4">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="relative flex items-center bg-gray-900/70 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full h-12 px-4">
                <div className="flex items-center space-x-2">
                    <LogoIcon className="h-6 w-6" />
                    <span className="text-lg font-bold text-gray-100">ArchiAi</span>
                </div>
                {hasData && (
                     <button
                        onClick={onReset}
                        className="ml-4 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold text-xs rounded-full shadow-md transition-colors duration-300 border border-gray-700"
                    >
                        New Project
                    </button>
                )}
            </div>
        </div>
    </header>
);

export default Header;