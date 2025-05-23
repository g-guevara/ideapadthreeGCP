'use client';

import { motion } from 'framer-motion';
import { Idea } from '@/lib/types';
import { truncateText } from '@/lib/utils';
import { setCurrentIdeaId } from '@/lib/store';
import { useRouter } from 'next/navigation';

interface IdeaCardProps {
  idea: Idea;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const router = useRouter();
  
  const handleClick = () => {
    setCurrentIdeaId(idea.id);
    router.push('/idea');
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-gray-700 transition-all cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{idea.title}</h3>
        <p className="text-gray-400 mb-4">{truncateText(idea.shortDescription, 100)}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.professions.slice(0, 3).map((profession, index) => (
            <span 
              key={index}
              className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full"
            >
              {profession}
            </span>
          ))}
          {idea.professions.length > 3 && (
            <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full">
              +{idea.professions.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {idea.category}
          </span>
          <span className="text-gray-400 text-sm">
            {idea.isPaid ? 'Paid' : 'Unpaid'} • {idea.membersNeeded} members
          </span>
        </div>
      </div>
    </motion.div>
  );
}