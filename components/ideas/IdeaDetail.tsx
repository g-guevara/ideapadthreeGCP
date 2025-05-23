'use client';

import { useState } from 'react';
import { Idea } from '@/lib/types';
import { Clock, DollarSign, Users, Briefcase } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ApplicationForm from '../application/ApplicationForm';
import { motion } from 'framer-motion';

interface IdeaDetailProps {
  idea: Idea;
}

export default function IdeaDetail({ idea }: IdeaDetailProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-800">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-4">{idea.title}</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col items-center p-3 bg-gray-800 rounded-lg">
            <Clock size={24} className="text-purple-400 mb-2" />
            <span className="text-gray-300 text-sm">Time Required</span>
            <span className="text-white font-medium">{idea.timeRequired}</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-gray-800 rounded-lg">
            <DollarSign size={24} className="text-green-400 mb-2" />
            <span className="text-gray-300 text-sm">Payment</span>
            <span className="text-white font-medium">{idea.isPaid ? 'Paid' : 'Unpaid'}</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-gray-800 rounded-lg">
            <Users size={24} className="text-blue-400 mb-2" />
            <span className="text-gray-300 text-sm">Team Size</span>
            <span className="text-white font-medium">{idea.membersNeeded} members</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-gray-800 rounded-lg">
            <Briefcase size={24} className="text-yellow-400 mb-2" />
            <span className="text-gray-300 text-sm">Category</span>
            <span className="text-white font-medium">{idea.category}</span>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
          <p className="text-gray-300 whitespace-pre-line">{idea.longDescription}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {idea.professions.map((profession, index) => (
              <span 
                key={index}
                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
              >
                {profession}
              </span>
            ))}
          </div>
        </div>
        
        {isAuthenticated ? (
          <div>
            {!showApplicationForm ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
                onClick={() => setShowApplicationForm(true)}
              >
                Apply for this Project
              </motion.button>
            ) : (
              <ApplicationForm 
                ideaId={idea.id} 
                onCancel={() => setShowApplicationForm(false)} 
                onSubmit={() => setShowApplicationForm(false)}
              />
            )}
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <p className="text-gray-300 mb-4">You need to be logged in to apply for this project</p>
            <a 
              href="/auth?mode=login"
              className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              Log in to Apply
            </a>
          </div>
        )}
      </div>
    </div>
  );
}