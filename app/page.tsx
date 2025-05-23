'use client';

import { useEffect } from 'react';
import IdeaList from '@/components/ideas/IdeaList';
import { getIdeas, initializeDemoData } from '@/lib/store';

export default function Home() {
  useEffect(() => {
    // Initialize demo data if needed
    initializeDemoData();
  }, []);
  
  const ideas = getIdeas();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-purple-600 mb-4">
          Turn Ideas into Reality
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Connect with talented collaborators to bring innovative projects to life
        </p>
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6">Explore Ideas</h2>
        <IdeaList ideas={ideas} />
      </div>
    </div>
  );
}