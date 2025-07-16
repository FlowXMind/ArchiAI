import React from 'react';
import { RoadmapPhase } from '../types';
import Card from './common/Card';
import { CheckCircleIcon, ClockIcon } from './icons/TechIcons';

interface RoadmapProps {
  roadmap: RoadmapPhase[];
}

const Roadmap: React.FC<RoadmapProps> = ({ roadmap }) => {
  if (!roadmap || roadmap.length === 0) {
    return (
       <Card className="h-full">
         <h3 className="text-xl font-bold text-white mb-6">Project Roadmap</h3>
         <div className="flex items-center justify-center h-full text-gray-400">
           <p>Roadmap data not available.</p>
         </div>
       </Card>
    );
  }

  return (
    <Card className="h-full">
      <h3 className="text-xl font-bold text-white mb-6">Project Roadmap</h3>
      <div className="relative pl-6">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-700/50"></div>
        {roadmap.map((phase, index) => (
          <div key={index} className="mb-8 relative">
            <div className="absolute -left-[35px] top-1 h-6 w-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-gray-950"></div>
            <p className="text-xs text-blue-400 font-semibold mb-1 flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                {phase.duration}
            </p>
            <h4 className="font-bold text-lg text-gray-100">{phase.phase}</h4>
            <ul className="mt-2 space-y-2">
              {phase.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-green-400 mt-1"><CheckCircleIcon className="h-5 w-5" /></span>
                    <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Roadmap;