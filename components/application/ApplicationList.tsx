'use client';

import { Application } from '@/lib/types';
import ApplicationCard from './ApplicationCard';

interface ApplicationListProps {
  applications: Application[];
  showIdeaTitles?: boolean;
  emptyMessage?: string;
}

export default function ApplicationList({ 
  applications, 
  showIdeaTitles = false, 
  emptyMessage = "No applications found" 
}: ApplicationListProps) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-300 mb-2">{emptyMessage}</h3>
        <p className="text-gray-500">Check back later for updates</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6">
      {applications.map((application) => (
        <ApplicationCard 
          key={application.id} 
          application={application} 
          showIdeaTitle={showIdeaTitles}
        />
      ))}
    </div>
  );
}