
import React from 'react';
import { ArchitectureData } from '../types';
import ArchitectureDiagram from './ArchitectureDiagram';
import CostEstimationChart from './CostEstimationChart';
import Roadmap from './Roadmap';
import ScalabilityPlan from './ScalabilityPlan';
import SecurityPlan from './SecurityPlan';

interface DashboardProps {
  data: ArchitectureData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-4">
        <ArchitectureDiagram architecture={data.architecture} />
      </div>
      <div className="md:col-span-4">
        <Roadmap roadmap={data.roadmap} />
      </div>
      <div className="md:col-span-2">
        <CostEstimationChart costEstimation={data.costEstimation} />
      </div>
      <div className="md:col-span-2">
        <ScalabilityPlan scalability={data.scalability} />
      </div>
      <div className="md:col-span-4">
        <SecurityPlan security={data.security} />
      </div>
    </div>
  );
};

export default Dashboard;