import React from 'react';
import { Architecture, TechInfo } from '../types';
import Card from './common/Card';
import { CodeBracketIcon, ServerIcon, CircleStackIcon, CloudArrowUpIcon, LinkIcon } from './icons/TechIcons';

interface ArchCardProps {
  title: string;
  data: TechInfo;
  icon: React.ReactNode;
}

const ArchCard: React.FC<ArchCardProps> = ({ title, data, icon }) => (
    <div className="flex-1 min-w-[200px] bg-gray-950/70 p-4 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors">
        <div className="flex items-center gap-3 mb-2">
            {icon}
            <h4 className="text-lg font-bold text-blue-300">{title}</h4>
        </div>
        <p className="text-sm text-gray-400 mb-3">{data.description}</p>
        <div className="flex flex-wrap gap-2">
            {data.techStack.map(tech => (
                <span key={tech} className="px-2 py-1 text-xs font-medium text-gray-300 bg-gray-800 rounded-md">{tech}</span>
            ))}
        </div>
    </div>
);


const ArchitectureDiagram: React.FC<{ architecture: Architecture }> = ({ architecture }) => {
  return (
    <Card>
      <h3 className="text-2xl font-bold text-white mb-4">System Architecture</h3>
      <p className="text-gray-400 mb-6">{architecture.overview}</p>
      <div className="relative">
         <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 text-center">
            <ArchCard title="Frontend" data={architecture.frontend} icon={<CodeBracketIcon className="h-6 w-6 text-blue-400" />} />
            <div className="hidden md:flex items-center text-gray-600"><LinkIcon className="h-6 w-6"/></div>
            <ArchCard title="Backend" data={architecture.backend} icon={<ServerIcon className="h-6 w-6 text-green-400" />} />
            <div className="hidden md:flex items-center text-gray-600"><LinkIcon className="h-6 w-6"/></div>
            <ArchCard title="Database" data={architecture.database} icon={<CircleStackIcon className="h-6 w-6 text-amber-400" />} />
         </div>
         <div className="flex justify-center mt-4">
             <ArchCard title="Deployment & Hosting" data={architecture.deployment} icon={<CloudArrowUpIcon className="h-6 w-6 text-rose-400"/>} />
         </div>
      </div>
    </Card>
  );
};

export default ArchitectureDiagram;