import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

interface HeaderProps {
    onReset: () => void;
    hasData: boolean;
}

const Header: React.FC<HeaderProps> = ({ onReset, hasData }) => (
    <header className="bg-black/70 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                    <LogoIcon className="h-8 w-8" />
                    <span className="text-xl font-bold text-gray-100">ArchiAi</span>
                </div>
                {hasData && (
                     <button
                        onClick={onReset}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold text-sm rounded-lg shadow-md transition-colors duration-300 border border-gray-700"
                    >
                        New Project
                    </button>
                )}
            </div>
        </div>
    </header>
);

export default Header;