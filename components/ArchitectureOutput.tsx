import React, { useState, useEffect } from 'react';
import { ArchitectureResponse, TechStack } from '../types';
import { MermaidDiagram } from './MermaidDiagram';
import { Skeleton } from './Skeleton';
import { TabButton } from './TabButton';
import { ChartBarIcon, DiagramIcon, DocumentTextIcon, LightBulbIcon, ShieldCheckIcon } from './icons/OutputIcons';
import { CheckCircleIcon, XCircleIcon } from './icons/ProConIcons';
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface ArchitectureOutputProps {
  data: ArchitectureResponse | null;
  isLoading: boolean;
  error: string | null;
}

type Tab = 'Overview' | 'Diagram' | 'Tech Stack' | 'Pros & Cons' | 'Considerations' | 'Components' | 'Implementation';

const TechStackPill: React.FC<{ tech: string }> = ({ tech }) => (
    <span className="inline-block bg-sky-400/10 border border-sky-400/20 rounded-full px-3 py-1 text-sm font-medium text-sky-300 mr-2 mb-2">
        {tech}
    </span>
);

const TechStackSection: React.FC<{ title: string; items?: string[] }> = ({ title, items }) => {
    if (!items || items.length === 0) return null;
    return (
        <div>
            <h4 className="text-lg font-semibold text-slate-300 mb-3">{title}</h4>
            <div className="flex flex-wrap">
                {items.map((item, index) => <TechStackPill key={index} tech={item} />)}
            </div>
        </div>
    );
};

// Helper to format architecture data as plain text
function formatArchitectureAsText(data: ArchitectureResponse): string {
  let txt = '';
  txt += `Overview\n${data.overview}\n\n`;
  txt += `Tech Stack\n`;
  txt += `  Frontend: ${data.techStack.frontend.join(', ')}\n`;
  txt += `  Backend: ${data.techStack.backend.join(', ')}\n`;
  txt += `  Database: ${data.techStack.database.join(', ')}\n`;
  txt += `  DevOps: ${data.techStack.devops.join(', ')}\n`;
  if (data.techStack.messaging && data.techStack.messaging.length > 0) {
    txt += `  Messaging: ${data.techStack.messaging.join(', ')}\n`;
  }
  txt += `\nPros\n`;
  data.pros.forEach((pro, i) => { txt += `  ${i+1}. ${pro}\n`; });
  txt += `\nCons\n`;
  data.cons.forEach((con, i) => { txt += `  ${i+1}. ${con}\n`; });
  txt += `\nScalability\n${data.scalability}\n\n`;
  txt += `Security\n${data.security}\n\n`;
  txt += `Detailed Components\n`;
  data.detailedComponents.forEach(c => {
    txt += `  - ${c.name}: ${c.description}\n`;
    txt += `    Responsibilities: ${c.responsibilities.join(', ')}\n`;
    txt += `    Interactions: ${c.interactions.join(', ')}\n`;
  });
  txt += `\nImplementation Steps\n`;
  data.implementationSteps.forEach((step, i) => { txt += `  ${i+1}. ${step}\n`; });
  txt += `\nDeployment Strategy\n${data.deploymentStrategy}\n\n`;
  txt += `Monitoring and Logging\n${data.monitoringAndLogging}\n\n`;
  txt += `Cost Estimation\n${data.costEstimation}\n\n`;
  txt += `Mermaid Diagram\n${data.diagram}\n`;
  return txt;
}

// Helper to format architecture data as Markdown
function formatArchitectureAsMarkdown(data: ArchitectureResponse): string {
  let md = '';
  md += `# Overview\n${data.overview}\n\n`;
  md += `## Tech Stack\n`;
  md += `- **Frontend:** ${data.techStack.frontend.join(', ')}\n`;
  md += `- **Backend:** ${data.techStack.backend.join(', ')}\n`;
  md += `- **Database:** ${data.techStack.database.join(', ')}\n`;
  md += `- **DevOps:** ${data.techStack.devops.join(', ')}\n`;
  if (data.techStack.messaging && data.techStack.messaging.length > 0) {
    md += `- **Messaging:** ${data.techStack.messaging.join(', ')}\n`;
  }
  md += `\n## Pros\n`;
  data.pros.forEach((pro, i) => { md += `- ${pro}\n`; });
  md += `\n## Cons\n`;
  data.cons.forEach((con, i) => { md += `- ${con}\n`; });
  md += `\n## Scalability\n${data.scalability}\n\n`;
  md += `## Security\n${data.security}\n\n`;
  md += `## Detailed Components\n`;
  data.detailedComponents.forEach(c => {
    md += `### ${c.name}\n- **Description:** ${c.description}\n- **Responsibilities:**\n`;
    c.responsibilities.forEach(r => { md += `  - ${r}\n`; });
    md += `- **Interactions:**\n`;
    c.interactions.forEach(i => { md += `  - ${i}\n`; });
  });
  md += `\n## Implementation Steps\n`;
  data.implementationSteps.forEach((step, i) => { md += `${i+1}. ${step}\n`; });
  md += `\n## Deployment Strategy\n${data.deploymentStrategy}\n\n`;
  md += `## Monitoring and Logging\n${data.monitoringAndLogging}\n\n`;
  md += `## Cost Estimation\n${data.costEstimation}\n\n`;
  md += `## Mermaid Diagram\n\n\`\`\`mermaid\n${data.diagram}\`\`\`\n\n`;
  return md;
}

export const ArchitectureOutput: React.FC<ArchitectureOutputProps> = ({ data, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const pdfRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (data) {
      setActiveTab('Overview');
    }
  }, [data]);

  // Export to txt handler
  const handleExportTxt = () => {
    if (!data) return;
    const txt = formatArchitectureAsText(data);
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'architecture-plan.txt';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton />;
    }
    if (error) {
      return <div className="flex items-center justify-center h-full min-h-[400px] text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-4"><p>{error}</p></div>;
    }
    if (!data) {
      return <div className="flex items-center justify-center h-full min-h-[400px] text-slate-500"><p>Your generated architecture will appear here.</p></div>;
    }

    switch (activeTab) {
      case 'Overview':
        return <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{data.overview}</p>;
      case 'Diagram':
        return <MermaidDiagram chart={data.diagram} />;
      case 'Tech Stack':
        return (
            <div className="space-y-6">
                <TechStackSection title="Frontend" items={data.techStack.frontend} />
                <TechStackSection title="Backend" items={data.techStack.backend} />
                <TechStackSection title="Database" items={data.techStack.database} />
                <TechStackSection title="DevOps & Deployment" items={data.techStack.devops} />
                <TechStackSection title="Messaging / Event Streaming" items={data.techStack.messaging} />
            </div>
        );
      case 'Pros & Cons':
        return (
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center">
                        <CheckCircleIcon className="w-6 h-6 mr-3 text-green-400" /> Pros
                    </h3>
                    <div className="space-y-3">
                        {data.pros.map((pro, index) => (
                            <div key={index} className="bg-green-500/5 border-l-4 border-green-500/80 p-3 pl-4 rounded-r-md text-slate-300">{pro}</div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center">
                        <XCircleIcon className="w-6 h-6 mr-3 text-red-400" /> Cons
                    </h3>
                    <div className="space-y-3">
                        {data.cons.map((con, index) => (
                            <div key={index} className="bg-red-500/5 border-l-4 border-red-500/80 p-3 pl-4 rounded-r-md text-slate-300">{con}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
      case 'Considerations':
        return (
            <div className="space-y-8">
                <ErrorBoundary>
                    <div>
                        <h3 className="text-2xl font-bold text-sky-300 mb-3">Scalability</h3>
                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {typeof data.scalability === 'string' ? data.scalability : 'Scalability information not available.'}
                        </p>
                    </div>
                </ErrorBoundary>
                <ErrorBoundary>
                    <div>
                        <h3 className="text-2xl font-bold text-sky-300 mb-3">Security</h3>
                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {typeof data.security === 'string' ? data.security : 'Security information not available.'}
                        </p>
                    </div>
                </ErrorBoundary>
                <ErrorBoundary>
                    <div>
                        <h3 className="text-2xl font-bold text-sky-300 mb-3">Deployment Strategy</h3>
                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {typeof data.deploymentStrategy === 'string' ? data.deploymentStrategy : 'Deployment strategy not available.'}
                        </p>
                    </div>
                </ErrorBoundary>
                <ErrorBoundary>
                    <div>
                        <h3 className="text-2xl font-bold text-sky-300 mb-3">Monitoring & Logging</h3>
                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {typeof data.monitoringAndLogging === 'string' ? data.monitoringAndLogging : 'Monitoring and logging information not available.'}
                        </p>
                    </div>
                </ErrorBoundary>
                <ErrorBoundary>
                    <div>
                        <h3 className="text-2xl font-bold text-sky-300 mb-3">Cost Estimation</h3>
                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {typeof data.costEstimation === 'string' ? data.costEstimation : 'Cost estimation not available.'}
                        </p>
                    </div>
                </ErrorBoundary>
            </div>
        );
      case 'Components':
        return (
            <div className="space-y-6">
                {data.detailedComponents.map((component, index) => (
                    <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <h4 className="text-xl font-bold text-sky-300 mb-2">{component.name}</h4>
                        <p className="text-slate-300 mb-3">{component.description}</p>
                        <h5 className="font-semibold text-slate-200 mb-2">Responsibilities:</h5>
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                            {component.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                        </ul>
                        <h5 className="font-semibold text-slate-200 mt-3 mb-2">Interactions:</h5>
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                            {component.interactions.map((inter, i) => <li key={i}>{inter}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        );
      case 'Implementation':
        return (
            <div>
                <h3 className="text-2xl font-bold text-sky-300 mb-4">Implementation Steps</h3>
                <ol className="list-decimal list-inside space-y-3 text-slate-300">
                    {data.implementationSteps.map((step, index) => (
                        <li key={index} className="pl-2">{step}</li>
                    ))}
                </ol>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl shadow-slate-900/50 h-full flex flex-col">
      {data && (
        <div className="flex justify-end p-4 pt-6 gap-2">
          {/*
          <button
            onClick={handleExportTxt}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sm hover:from-sky-600 hover:to-indigo-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Export architecture as text file"
            tabIndex={0}
          >
            Export as .txt
          </button>
          */}
         <button
           onClick={() => {
             if (!data) return;
             const md = formatArchitectureAsMarkdown(data);
             const blob = new Blob([md], { type: 'text/markdown' });
             const url = URL.createObjectURL(blob);
             const a = document.createElement('a');
             a.href = url;
             a.download = 'architecture-plan.md';
             document.body.appendChild(a);
             a.click();
             setTimeout(() => {
               document.body.removeChild(a);
               URL.revokeObjectURL(url);
             }, 0);
           }}
           className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sm hover:from-sky-600 hover:to-indigo-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
           aria-label="Export architecture as markdown file"
           tabIndex={0}
         >
           Export as .md
         </button>
         {/*
         <button
           onClick={() => {
             if (!data || !pdfRef.current) return;
             setTimeout(() => {
               html2pdf().set({
                 margin: 0.5,
                 filename: 'architecture-plan.pdf',
                 html2canvas: { scale: 2 },
                 jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
               }).from(pdfRef.current).save();
             }, 100);
           }}
           className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sm hover:from-sky-600 hover:to-indigo-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed"
           aria-label="Export architecture as PDF file"
           tabIndex={0}
         >
           Export as PDF
         </button>
         */}
        </div>
      )}
      {/* Hidden PDF template */}
      {data && (
        <div
          ref={pdfRef}
          style={{
            opacity: 0,
            pointerEvents: 'none',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: -1,
            width: 800,
          }}
        >
          <div style={{fontFamily: 'Sora, Arial, sans-serif', color: '#222', padding: 24, maxWidth: 800}}>
            <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 8}}>Software Architecture Plan</h1>
            <h2 style={{fontSize: 20, fontWeight: 600, margin: '16px 0 4px'}}>Overview</h2>
            <p style={{marginBottom: 12}}>{data.overview}</p>
            <h2 style={{fontSize: 20, fontWeight: 600, margin: '16px 0 4px'}}>Tech Stack</h2>
            <ul style={{marginBottom: 12}}>
              <li><b>Frontend:</b> {data.techStack.frontend.join(', ')}</li>
              <li><b>Backend:</b> {data.techStack.backend.join(', ')}</li>
              <li><b>Database:</b> {data.techStack.database.join(', ')}</li>
              <li><b>DevOps:</b> {data.techStack.devops.join(', ')}</li>
              {data.techStack.messaging && data.techStack.messaging.length > 0 && (
                <li><b>Messaging:</b> {data.techStack.messaging.join(', ')}</li>
              )}
            </ul>
            <h2 style={{fontSize: 20, fontWeight: 600, margin: '16px 0 4px'}}>Pros</h2>
            <ul style={{marginBottom: 12}}>
              {data.pros.map((pro, i) => <li key={i}>• {pro}</li>)}
            </ul>
            <h2 style={{fontSize: 20, fontWeight: 600, margin: '16px 0 4px'}}>Cons</h2>
            <ul style={{marginBottom: 12}}>
              {data.cons.map((con, i) => <li key={i}>• {con}</li>)}
            </ul>
            <h2 style={{fontSize: 20, fontWeight: 600, margin: '16px 0 4px'}}>Scalability</h2>
            <p style={{marginBottom: 12}}>{data.scalability}</p>
            <h2 style={{fontSize: 20, fontWeight: 600, margin: '16px 0 4px'}}>Security</h2>
            <p style={{marginBottom: 12}}>{data.security}</p>
            <h2 style={{fontSize: 20, fontWeight: 600, margin: '16px 0 4px'}}>Mermaid Diagram</h2>
            <pre style={{background: '#f4f4f4', padding: 12, borderRadius: 6, fontSize: 13, overflowX: 'auto'}}>{data.diagram}</pre>
          </div>
        </div>
      )}
      <div className="flex flex-wrap border-b border-slate-700/60 px-2 sm:px-4">
        <TabButton Icon={DocumentTextIcon} label="Overview" isActive={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} disabled={!data}/>
        <TabButton Icon={DiagramIcon} label="Diagram" isActive={activeTab === 'Diagram'} onClick={() => setActiveTab('Diagram')} disabled={!data}/>
        <TabButton Icon={ChartBarIcon} label="Tech Stack" isActive={activeTab === 'Tech Stack'} onClick={() => setActiveTab('Tech Stack')} disabled={!data}/>
        <TabButton Icon={LightBulbIcon} label="Pros & Cons" isActive={activeTab === 'Pros & Cons'} onClick={() => setActiveTab('Pros & Cons')} disabled={!data}/>
        <TabButton Icon={ShieldCheckIcon} label="Considerations" isActive={activeTab === 'Considerations'} onClick={() => setActiveTab('Considerations')} disabled={!data}/>
        <TabButton Icon={ShieldCheckIcon} label="Components" isActive={activeTab === 'Components'} onClick={() => setActiveTab('Components')} disabled={!data}/>
        <TabButton Icon={ChartBarIcon} label="Implementation" isActive={activeTab === 'Implementation'} onClick={() => setActiveTab('Implementation')} disabled={!data}/>
      </div>
      <div className="p-6 sm:p-8 flex-grow overflow-y-auto transition-opacity duration-500" style={{ opacity: isLoading ? 0.5 : 1 }}>
        {renderContent()}
      </div>
    </div>
  );
};