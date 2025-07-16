import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl rounded-xl p-6 transition-all duration-300 hover:border-gray-700/80 ${className}`}>
      {children}
    </div>
  );
};

export default Card;