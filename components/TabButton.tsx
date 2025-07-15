import React from 'react';

interface TabButtonProps {
    Icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export const TabButton: React.FC<TabButtonProps> = ({ Icon, label, isActive, onClick, disabled }) => {
    const baseClasses = "flex items-center justify-center sm:justify-start space-x-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 border-b-2 -mb-px shadow-sm";
    const activeClasses = "border-sky-400 text-sky-300 bg-slate-800/60";
    const inactiveClasses = "border-transparent text-slate-400 hover:text-sky-300 hover:bg-slate-700/40 hover:border-sky-400";
    const disabledClasses = "opacity-40 cursor-not-allowed hover:border-transparent";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${disabled ? disabledClasses : ''}`}
            aria-pressed={isActive}
            aria-label={label}
            tabIndex={0}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="hidden sm:inline">{label}</span>
        </button>
    );
};