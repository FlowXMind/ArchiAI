import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
        </defs>
        {/* The 'A' shape */}
        <path
            d="M12 2L2 22h4l1.5-4h9L18 22h4L12 2zM9.5 14l2.5-6.5L14.5 14h-5z"
            fill="url(#logo-gradient)"
        />
    </svg>
);