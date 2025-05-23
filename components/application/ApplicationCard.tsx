'use client';

import { Application, Idea } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { File, Download, ExternalLink } from 'lucide-react';
import { getIdeaById } from '@/lib/store';

interface ApplicationCardProps {
  application: Application;
  showIdeaTitle?: boolean;
}

export default function ApplicationCard({ application, showIdeaTitle = false }: ApplicationCardProps) {
  const idea = getIdeaById(application.ideaId);
  
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 p-6">
      {showIdeaTitle && idea && (
        <div className="mb-4">
          <span className="text-gray-400 text-sm">Applied to:</span>
          <h4 className="text-white font-semibold">{idea.title}</h4>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{application.name}</h3>
          <p className="text-gray-400">{application.email}</p>
        </div>
        <span className="text-gray-500 text-sm">
          Applied {formatDate(application.createdAt)}
        </span>
      </div>
      
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-white mb-2">Cover Letter</h4>
        <p className="text-gray-300 bg-gray-800 p-4 rounded-lg whitespace-pre-line">
          {application.coverLetter}
        </p>
      </div>
      
      <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
        <div className="flex items-center">
          <File size={20} className="text-blue-400 mr-2" />
          <span className="text-gray-300">CV Document</span>
        </div>
        
        <div className="flex gap-2">
          <a
            href={application.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
            title="View CV"
          >
            <ExternalLink size={16} className="text-gray-300" />
          </a>
          <a
            href={application.cvUrl}
            download
            className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
            title="Download CV"
          >
            <Download size={16} className="text-gray-300" />
          </a>
        </div>
      </div>
    </div>
  );
}