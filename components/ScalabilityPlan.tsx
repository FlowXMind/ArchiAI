import React from 'react';
import { Scalability } from '../types';
import Card from './common/Card';
import { ArrowUpCircleIcon } from './icons/TechIcons';

interface ScalabilityPlanProps {
  scalability: Scalability;
}

const ScalabilityPlan: React.FC<ScalabilityPlanProps> = ({ scalability }) => {
  if (!scalability || !scalability.points || scalability.points.length === 0) {
    return (
       <Card>
         <h3 className="text-xl font-bold text-white mb-4">Scalability</h3>
         <p className="text-gray-400">Scalability plan not available.</p>
       </Card>
    );
  }
  
  return (
    <Card>
      <h3 className="text-xl font-bold text-white mb-4">{scalability.title}</h3>
      <ul className="space-y-3">
        {scalability.points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-blue-400 mt-1 flex-shrink-0">
                <ArrowUpCircleIcon className="h-6 w-6" />
            </span>
            <span className="text-gray-300">{point}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ScalabilityPlan;