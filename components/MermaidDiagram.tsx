import React, { useEffect, useRef } from 'react';

// Make mermaid available on the window object
declare global {
  interface Window {
    mermaid: any;
  }
}

interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.mermaid && containerRef.current) {
        // Clear previous render
        containerRef.current.innerHTML = '';
        
        const uniqueId = `mermaid-diagram-${Date.now()}`;
        const mermaidContainer = document.createElement('div');
        mermaidContainer.id = uniqueId;
        mermaidContainer.className = 'mermaid';
        mermaidContainer.textContent = chart;
        
        containerRef.current.appendChild(mermaidContainer);
        
        try {
            window.mermaid.run({
                nodes: [mermaidContainer]
            });
        } catch(e) {
            console.error("Error rendering mermaid diagram", e);
            if(containerRef.current) {
                containerRef.current.innerHTML = `<div class="text-red-300 p-4 bg-red-500/10 rounded-md">Error rendering diagram. The generated Mermaid syntax may be invalid.</div>`;
            }
        }
    }
  }, [chart]);

  return <div ref={containerRef} className="w-full flex items-center justify-center min-h-[450px] bg-slate-900/30 rounded-lg p-4 transition-all duration-300"></div>;
};