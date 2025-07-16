import React from 'react';
import { PRD } from '../types';
import Card from './common/Card';
import { ExportIcon } from './icons/ExportIcon';

interface PrdDisplayProps {
  prd: PRD;
  projectName: string;
}

const PrdDisplay: React.FC<PrdDisplayProps> = ({ prd, projectName }) => {

  const generateMarkdown = () => {
    let md = `# Product Requirements Document (PRD) for ${projectName}\n\n`;

    md += `## 1. Introduction\n${prd.introduction}\n\n`;
    
    md += `## 2. User Personas\n`;
    prd.userPersonas.forEach(p => {
      md += `### 2.1. ${p.name}\n${p.description}\n\n`;
    });

    md += `## 3. Features\n`;
    prd.features.forEach(f => {
      md += `### 3.1. ${f.title}\n**Description:** ${f.description}\n\n**User Stories:**\n`;
      f.userStories.forEach(story => {
        md += `* ${story}\n`;
      });
      md += `\n`;
    });

    md += `## 4. Non-Functional Requirements\n`;
    prd.nonFunctionalRequirements.forEach(nfr => {
      md += `### 4.1. ${nfr.type}\n${nfr.details}\n\n`;
    });
    
    return md;
  };

  const handleExport = () => {
    const markdownContent = generateMarkdown();
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName.replace(/\s+/g, '_')}_PRD.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-white">Product Requirements Document</h2>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-lg shadow-md transition-colors duration-300 border border-gray-700"
        >
          <ExportIcon className="h-5 w-5" />
          Export as Markdown
        </button>
      </div>

      <div className="space-y-8 text-gray-300">
        <section>
          <h3 className="text-xl font-semibold text-blue-400 border-b border-gray-800 pb-2 mb-4">Introduction</h3>
          <p className="prose prose-invert max-w-none text-gray-300">{prd.introduction}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-blue-400 border-b border-gray-800 pb-2 mb-4">User Personas</h3>
          <div className="space-y-4">
            {prd.userPersonas.map((persona, index) => (
              <div key={index} className="p-4 bg-gray-950/50 rounded-lg border border-gray-800">
                <h4 className="font-bold text-gray-100">{persona.name}</h4>
                <p>{persona.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-blue-400 border-b border-gray-800 pb-2 mb-4">Features</h3>
          <div className="space-y-6">
            {prd.features.map((feature, index) => (
              <div key={index} className="p-4 bg-gray-950/50 rounded-lg border border-gray-800">
                <h4 className="font-bold text-gray-100">{feature.title}</h4>
                <p className="mt-1 mb-3">{feature.description}</p>
                <h5 className="font-semibold text-gray-300 mb-2">User Stories:</h5>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  {feature.userStories.map((story, i) => <li key={i}>{story}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-blue-400 border-b border-gray-800 pb-2 mb-4">Non-Functional Requirements</h3>
          <div className="space-y-4">
            {prd.nonFunctionalRequirements.map((req, index) => (
              <div key={index} className="p-4 bg-gray-950/50 rounded-lg border border-gray-800">
                <h4 className="font-bold text-gray-100">{req.type}</h4>
                <p>{req.details}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Card>
  );
};

export default PrdDisplay;