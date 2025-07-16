import React, { useState, useEffect } from 'react';

const loadingSteps = [
    "Analyzing your idea...",
    "Designing smart architecture...",
    "Selecting the best tech stack...",
    "Estimating costs & resources...",
    "Planning security & scalability...",
    "Building your roadmap...",
    "Finalizing your PRD..."
];

// Neural Network / Circuit Board Animation
const NeuralNetworkAnimation = () => (
    <div className="relative w-64 h-64">
        <style>{`
            .node {
                fill: #a78bfa;
                animation: pulse-node 2s ease-in-out infinite alternate;
                transform-origin: center center;
            }
            .line {
                stroke: #60a5fa;
                stroke-width: 1;
                stroke-linecap: round;
                stroke-dasharray: 10 10;
                animation: flow 3s linear infinite;
            }
            .line-reverse {
                animation-direction: reverse;
            }
            .glow {
                filter: url(#nodeGlow);
            }

            @keyframes pulse-node {
                0% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.2); opacity: 1; }
                100% { transform: scale(1); opacity: 0.8; }
            }
            @keyframes flow {
                to {
                    stroke-dashoffset: -20;
                }
            }
        `}</style>
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
                <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Lines (connections) */}
            <line x1="50" y1="50" x2="100" y2="100" className="line" />
            <line x1="100" y1="100" x2="150" y2="50" className="line line-reverse" />
            <line x1="50" y1="150" x2="100" y2="100" className="line" />
            <line x1="100" y1="100" x2="150" y2="150" className="line line-reverse" />
            <line x1="50" y1="50" x2="50" y2="150" className="line" />
            <line x1="150" y1="50" x2="150" y2="150" className="line line-reverse" />
            <line x1="50" y1="100" x2="150" y2="100" className="line" />
            <line x1="100" y1="50" x2="100" y2="150" className="line line-reverse" />


            {/* Nodes (pulsing) */}
            <circle cx="50" cy="50" r="5" className="node glow" style={{ animationDelay: '0s' }} />
            <circle cx="100" cy="50" r="5" className="node glow" style={{ animationDelay: '0.2s' }} />
            <circle cx="150" cy="50" r="5" className="node glow" style={{ animationDelay: '0.4s' }} />
            <circle cx="50" cy="100" r="5" className="node glow" style={{ animationDelay: '0.6s' }} />
            <circle cx="100" cy="100" r="6" className="node glow" style={{ animationDelay: '0.8s' }} /> {/* Central node, slightly larger */}
            <circle cx="150" cy="100" r="5" className="node glow" style={{ animationDelay: '1s' }} />
            <circle cx="50" cy="150" r="5" className="node glow" style={{ animationDelay: '1.2s' }} />
            <circle cx="100" cy="150" r="5" className="node glow" style={{ animationDelay: '1.4s' }} />
            <circle cx="150" cy="150" r="5" className="node glow" style={{ animationDelay: '1.6s' }} />
        </svg>
    </div>
);


const Loader: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => {
                if (prevStep >= loadingSteps.length - 1) {
                    return prevStep;
                }
                return prevStep + 1;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const progress = ((currentStep + 1) / loadingSteps.length) * 100;

    return (
        <div className="flex flex-col items-center justify-center text-center my-20 p-4 overflow-hidden">
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                <NeuralNetworkAnimation />
                <div className="absolute text-white font-bold text-4xl">
                    {`${Math.round(progress)}%`}
                </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 tracking-wide">
                Architecting Your Vision
            </h2>
            <div className="relative w-full max-w-lg h-8 mb-4">
                {loadingSteps.map((step, index) => (
                    <p
                        key={step}
                        className={`absolute w-full transition-all duration-700 ease-in-out text-lg font-medium ${
                            currentStep === index
                                ? 'opacity-100 transform-none'
                                : 'opacity-0 transform-gpu translate-y-4'
                        }`}
                    >
                        {step}
                    </p>
                ))}
            </div>
            <div className="w-full max-w-lg bg-gray-700/50 rounded-full h-2.5">
                <div
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default Loader;