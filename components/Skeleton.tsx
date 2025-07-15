import React from 'react';

const Shimmer: React.FC = () => (
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-slate-600/30 to-transparent"></div>
);

const SkeletonLine: React.FC<{ width: string; height?: string; className?: string }> = ({ width, height = 'h-4', className = '' }) => (
    <div className={`relative overflow-hidden rounded-md bg-slate-700/50 ${width} ${height} ${className}`}>
        <Shimmer />
    </div>
);

export const Skeleton: React.FC = () => (
  <div className="space-y-8 p-2">
    {/* Simulating Overview section */}
    <div className="space-y-3">
        <SkeletonLine width="w-1/4" height="h-6" />
        <SkeletonLine width="w-full" />
        <SkeletonLine width="w-5/6" />
        <SkeletonLine width="w-3/4" />
    </div>

    {/* Simulating a list */}
    <div className="space-y-4">
        <SkeletonLine width="w-1/3" height="h-5" />
        <div className="space-y-3">
            <SkeletonLine width="w-full" height="h-12" />
            <SkeletonLine width="w-full" height="h-12" />
        </div>
    </div>
    
    <div className="space-y-4">
        <SkeletonLine width="w-1/4" height="h-5" />
        <div className="flex flex-wrap gap-3">
            <SkeletonLine width="w-24" height="h-7" className="rounded-full" />
            <SkeletonLine width="w-32" height="h-7" className="rounded-full" />
            <SkeletonLine width="w-28" height="h-7" className="rounded-full" />
            <SkeletonLine width="w-20" height="h-7" className="rounded-full" />
        </div>
    </div>
  </div>
);