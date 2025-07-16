import React, { useState, useEffect } from 'react';

const loadingSteps = [
    "Analyzing requirements...",
    "Designing architecture...",
    "Recommending tech stack...",
    "Estimating costs...",
    "Planning security...",
    "Building roadmap...",
    "Finalizing PRD..."
];

const Loader: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep + 1) % loadingSteps.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center my-16">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-2 border-4 border-gray-800 rounded-full"></div>
                <div className="absolute inset-4 border-4 border-purple-400 rounded-full animate-pulse"></div>
            </div>
            <h2 className="mt-8 text-xl font-semibold text-gray-200">Architecting Your Vision...</h2>
            <p className="text-gray-400 transition-opacity duration-500">{loadingSteps[currentStep]}</p>
        </div>
    );
};

export default Loader;