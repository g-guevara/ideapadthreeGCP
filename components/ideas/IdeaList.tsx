'use client';

import { useState, useEffect } from 'react';
import { Idea } from '@/lib/types';
import IdeaCard from './IdeaCard';
import { Search, Filter } from 'lucide-react';

interface IdeaListProps {
  ideas: Idea[];
}

export default function IdeaList({ ideas }: IdeaListProps) {
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>(ideas);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Extract unique categories
  const categories = Array.from(new Set(ideas.map(idea => idea.category)));
  
  useEffect(() => {
    let result = [...ideas];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        idea => 
          idea.title.toLowerCase().includes(term) || 
          idea.shortDescription.toLowerCase().includes(term) ||
          idea.professions.some(prof => prof.toLowerCase().includes(term))
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(idea => idea.category === selectedCategory);
    }
    
    setFilteredIdeas(result);
  }, [ideas, searchTerm, selectedCategory]);
  
  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search ideas, skills, or keywords..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative w-full md:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-gray-400" />
          </div>
          <select
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredIdeas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-300 mb-2">No ideas found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}