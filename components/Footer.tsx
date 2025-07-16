import React from 'react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './icons/SocialIcons';

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full mt-auto py-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-2xl">
            <div className="flex items-center gap-3 text-center sm:text-left">
                 <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">THBZ</span>
                 <span className="text-gray-400 text-sm">Projects</span>
            </div>
    
            <div className="flex gap-5 text-2xl">
                <a href="https://github.com/tonysebastine" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
                    <GithubIcon className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/in/tonysebastine/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 transform hover:scale-110">
                    <LinkedinIcon className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/thb_tz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors duration-200 transform hover:scale-110">
                    <InstagramIcon className="h-6 w-6" />
                </a>
            </div>

            <div className="text-xs text-gray-500 text-center sm:text-right">
                © {new Date().getFullYear()} Tony Sebastian (THBZ). All rights reserved.<br />
                <span className="text-[10px] text-gray-600">
                    Built with React, TypeScript, Tailwind, Gemini, Recharts & ❤️
                </span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;