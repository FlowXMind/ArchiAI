
import React from 'react';
import { Security } from '../types';
import Card from './common/Card';
import { ShieldCheckIcon } from './icons/TechIcons';

interface SecurityPlanProps {
  security: Security;
}

const SecurityPlan: React.FC<SecurityPlanProps> = ({ security }) => {
  if (!security || !security.points || security.points.length === 0) {
    return (
       <Card>
         <h3 className="text-xl font-bold text-white mb-4">Security</h3>
         <p className="text-gray-400">Security plan not available.</p>
       </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-xl font-bold text-white mb-4">{security.title}</h3>
      <ul className="space-y-3">
        {security.points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-purple-400 mt-1 flex-shrink-0">
                <ShieldCheckIcon className="h-6 w-6" />
            </span>
            <span className="text-gray-300">{point}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default SecurityPlan;