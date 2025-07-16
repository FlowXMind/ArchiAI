import React, { useState } from 'react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './icons/SocialIcons';

// Simple info icon SVG
const InfoIcon = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
  </svg>
);

const DEPLOYMENT_DETAILS = {
  platform: process.env.VITE_DEPLOYMENT_PLATFORM || 'N/A',
  domain: process.env.VITE_DEPLOYMENT_DOMAIN || 'N/A',
  buildTime: process.env.VITE_BUILD_TIME || 'N/A',
  commit: process.env.VITE_GIT_COMMIT || 'N/A',
};

const Footer: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

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

            <div className="flex items-center gap-2 text-xs text-gray-500 text-center sm:text-right relative">
                <span>
                  © {new Date().getFullYear()} Tony Sebastian (THBZ). All rights reserved.<br />
                  <span className="text-[10px] text-gray-600">
                      Built with React, TypeScript, Tailwind, Gemini, Recharts & ❤️
                  </span>
                </span>
                {/* Deployment details icon */}
                <button
                  className="ml-2 p-1 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="View deployment details"
                  onClick={() => setShowDetails((v) => !v)}
                  tabIndex={0}
                  type="button"
                >
                  <InfoIcon className="h-4 w-4 text-gray-400 hover:text-blue-400" />
                </button>
                {/* Tooltip/Popover */}
                {showDetails && (
                  <div className="absolute right-0 bottom-full mb-2 z-50 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-4 text-xs text-gray-200 min-w-[220px] animate-fade-in">
                    <div className="font-bold text-blue-400 mb-1">Deployment Details</div>
                    <div><span className="font-semibold">Platform:</span> {DEPLOYMENT_DETAILS.platform}</div>
                    <div><span className="font-semibold">Domain:</span> {DEPLOYMENT_DETAILS.domain}</div>
                    <div><span className="font-semibold">Build Time:</span> {DEPLOYMENT_DETAILS.buildTime}</div>
                    <div><span className="font-semibold">Commit:</span> {DEPLOYMENT_DETAILS.commit}</div>
                    <button
                      className="mt-2 px-2 py-1 bg-gray-800 rounded text-gray-300 hover:bg-gray-700 text-xs"
                      onClick={() => setShowDetails(false)}
                    >Close</button>
                  </div>
                )}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;