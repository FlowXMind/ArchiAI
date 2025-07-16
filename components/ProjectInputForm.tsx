import React, { useState } from 'react';

interface ProjectInputFormProps {
  onGenerate: (description: string) => void;
}

const examplePrompts = [
  "A social media app for pet owners to share photos and schedule playdates.",
  "An e-commerce site for sustainable, handmade clothing with a recommendation engine.",
  "A real-time language translation app that works offline for travelers."
];

const ProjectInputForm: React.FC<ProjectInputFormProps> = ({ onGenerate }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(description);
  };

  const handleExampleClick = (prompt: string) => {
    setDescription(prompt);
  }

  return (
    <div className="max-w-4xl mx-auto my-12 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4 tracking-tight">
        ArchiAi
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mb-10">
        Turn your idea into a launch-ready plan. Describe your vision and get a detailed architecture, PRD, and roadmap in seconds.
      </p>
      <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-800">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., A mobile app that uses AI to identify plants from photos, with a community forum for gardening enthusiasts..."
          className="w-full h-40 p-4 bg-gray-950 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none placeholder-gray-500"
        />
        <button
          type="submit"
          className="mt-6 w-full sm:w-auto px-12 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:scale-100"
          disabled={!description.trim()}
        >
          Generate Plan
        </button>
      </form>
       <div className="mt-8">
            <p className="text-sm text-gray-500 mb-3">Or try an example:</p>
            <div className="flex flex-wrap justify-center gap-3">
                {examplePrompts.map((prompt, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleExampleClick(prompt)}
                        className="px-3 py-1.5 text-xs bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 hover:text-white transition-colors"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};

export default ProjectInputForm;