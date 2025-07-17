import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CostEstimation, ChartDataItem } from '../types';
import Card from './common/Card';

interface CostEstimationChartProps {
  costEstimation: CostEstimation;
}

const COLORS = ['#60a5fa', '#a78bfa', '#f472b6', '#4ade80', '#facc15'];

// Custom legend component to handle wrapping and prevent overflow
const renderLegend = (props: any) => {
    const { payload } = props;
    return (
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-4 text-xs text-gray-400 px-2">
            {payload.map((entry: any, index: number) => (
                <div key={`item-${index}`} className="flex items-center space-x-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span>{entry.value}</span>
                </div>
            ))}
        </div>
    );
};

const CostEstimationChart: React.FC<CostEstimationChartProps> = ({ costEstimation }) => {
  if (!costEstimation || !costEstimation.breakdown || costEstimation.breakdown.length === 0) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-bold text-white mb-1">Monthly Cost Estimation</h3>
        <p className="text-gray-400">Cost estimation not available.</p>
      </Card>
    );
  }

  const chartData = costEstimation.breakdown.map(item => ({
    name: item.category,
    value: item.cost,
    details: item.details
  }));
  
  const totalCost = chartData.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip to show details only
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs text-gray-200 min-w-[180px]">
          <div className="font-bold text-blue-400 mb-1">{item.name}</div>
          <div><span className="font-semibold">Details:</span> {item.details}</div>
          <div><span className="font-semibold">Cost:</span> ${item.value.toLocaleString()}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full flex flex-col">
      <h3 className="text-2xl font-bold text-white mb-1">{costEstimation.title}</h3>
      <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">${totalCost.toLocaleString()}<span className="text-lg text-gray-400 font-normal">/month</span></p>
      <div className="flex-grow h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} verticalAlign="bottom" />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {chartData.map((_: ChartDataItem, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CostEstimationChart;