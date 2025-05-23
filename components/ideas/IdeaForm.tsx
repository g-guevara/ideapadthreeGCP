'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Plus } from 'lucide-react';
import { Idea } from '@/lib/types';
import { saveIdea } from '@/lib/store';
import { generateId } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

export default function IdeaForm() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [category, setCategory] = useState('');
  const [timeRequired, setTimeRequired] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [membersNeeded, setMembersNeeded] = useState(1);
  const [professions, setProfessions] = useState<string[]>([]);
  const [newProfession, setNewProfession] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const addProfession = () => {
    if (newProfession.trim() && !professions.includes(newProfession.trim())) {
      setProfessions([...professions, newProfession.trim()]);
      setNewProfession('');
    }
  };
  
  const removeProfession = (index: number) => {
    setProfessions(professions.filter((_, i) => i !== index));
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
    if (!longDescription.trim()) newErrors.longDescription = 'Long description is required';
    if (!category.trim()) newErrors.category = 'Category is required';
    if (!timeRequired.trim()) newErrors.timeRequired = 'Time required is required';
    if (professions.length === 0) newErrors.professions = 'At least one profession is required';
    if (membersNeeded < 1) newErrors.membersNeeded = 'At least one member is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!user) {
      router.push('/auth?mode=login');
      return;
    }
    
    const newIdea: Idea = {
      id: generateId(),
      title,
      shortDescription,
      longDescription,
      professions,
      category,
      timeRequired,
      isPaid,
      membersNeeded,
      userId: user.id,
      createdAt: new Date().toISOString()
    };
    
    saveIdea(newIdea);
    router.push('/dashboard');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          className={`w-full px-4 py-2 bg-gray-800 border ${errors.title ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your idea a catchy title"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      
      <div>
        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-300 mb-1">
          Short Description (displayed in cards)
        </label>
        <input
          type="text"
          id="shortDescription"
          className={`w-full px-4 py-2 bg-gray-800 border ${errors.shortDescription ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          placeholder="A brief overview of your idea (1-2 sentences)"
        />
        {errors.shortDescription && <p className="text-red-500 text-sm mt-1">{errors.shortDescription}</p>}
      </div>
      
      <div>
        <label htmlFor="longDescription" className="block text-sm font-medium text-gray-300 mb-1">
          Detailed Description
        </label>
        <textarea
          id="longDescription"
          rows={5}
          className={`w-full px-4 py-2 bg-gray-800 border ${errors.longDescription ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          placeholder="Explain your idea in detail. What problem does it solve? How will it work?"
        />
        {errors.longDescription && <p className="text-red-500 text-sm mt-1">{errors.longDescription}</p>}
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
          Category
        </label>
        <select
          id="category"
          className={`w-full px-4 py-2 bg-gray-800 border ${errors.category ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Web App">Web App</option>
          <option value="Mobile App">Mobile App</option>
          <option value="Data Science">Data Science</option>
          <option value="AI">AI</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Blockchain">Blockchain</option>
          <option value="IoT">IoT</option>
          <option value="Game Development">Game Development</option>
          <option value="Virtual Reality">Virtual Reality</option>
          <option value="Augmented Reality">Augmented Reality</option>
          <option value="Other">Other</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>
      
      <div>
        <label htmlFor="timeRequired" className="block text-sm font-medium text-gray-300 mb-1">
          Time Required
        </label>
        <select
          id="timeRequired"
          className={`w-full px-4 py-2 bg-gray-800 border ${errors.timeRequired ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
          value={timeRequired}
          onChange={(e) => setTimeRequired(e.target.value)}
        >
          <option value="">Select time frame</option>
          <option value="Less than 1 month">Less than 1 month</option>
          <option value="1-3 months">1-3 months</option>
          <option value="3-6 months">3-6 months</option>
          <option value="6-12 months">6-12 months</option>
          <option value="More than 12 months">More than 12 months</option>
        </select>
        {errors.timeRequired && <p className="text-red-500 text-sm mt-1">{errors.timeRequired}</p>}
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPaid"
          className="w-5 h-5 bg-gray-800 border border-gray-700 rounded text-purple-500 focus:ring-purple-500"
          checked={isPaid}
          onChange={(e) => setIsPaid(e.target.checked)}
        />
        <label htmlFor="isPaid" className="ml-2 text-sm font-medium text-gray-300">
          This is a paid project
        </label>
      </div>
      
      <div>
        <label htmlFor="membersNeeded" className="block text-sm font-medium text-gray-300 mb-1">
          Number of Members Needed
        </label>
        <input
          type="number"
          id="membersNeeded"
          min={1}
          max={20}
          className={`w-full px-4 py-2 bg-gray-800 border ${errors.membersNeeded ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
          value={membersNeeded}
          onChange={(e) => setMembersNeeded(parseInt(e.target.value) || 1)}
        />
        {errors.membersNeeded && <p className="text-red-500 text-sm mt-1">{errors.membersNeeded}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Required Professions/Skills
        </label>
        <div className="flex mb-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={newProfession}
            onChange={(e) => setNewProfession(e.target.value)}
            placeholder="e.g. Frontend Developer"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addProfession();
              }
            }}
          />
          <button
            type="button"
            className="px-4 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700"
            onClick={addProfession}
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {professions.map((profession, index) => (
            <div key={index} className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
              <span className="text-gray-300 mr-2">{profession}</span>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-200"
                onClick={() => removeProfession(index)}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        {errors.professions && <p className="text-red-500 text-sm mt-1">{errors.professions}</p>}
      </div>
      
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={() => router.push('/dashboard')}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Submit Idea
        </button>
      </div>
    </form>
  );
}