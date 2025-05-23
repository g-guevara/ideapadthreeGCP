'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentIdeaId, getIdeaById } from '@/lib/store';
import IdeaDetail from '@/components/ideas/IdeaDetail';
import { ArrowLeft } from 'lucide-react';

export default function IdeaPage() {
  const router = useRouter();
  const [ideaId, setIdeaId] = useState<string | null>(null);
  
  useEffect(() => {
    // Get the current idea ID from localStorage
    const id = getCurrentIdeaId();
    setIdeaId(id);
    
    if (!id) {
      router.push('/');
    }
  }, [router]);
  
  const idea = ideaId ? getIdeaById(ideaId) : null;
  
  if (!idea) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Idea not found</h2>
          <button
            onClick={() => router.push('/')}
            className="text-purple-400 flex items-center gap-2 mx-auto hover:text-purple-300"
          >
            <ArrowLeft size={18} />
            Back to home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <button
        onClick={() => router.push('/')}
        className="text-purple-400 flex items-center gap-2 mb-6 hover:text-purple-300"
      >
        <ArrowLeft size={18} />
        Back to ideas
      </button>
      
      <IdeaDetail idea={idea} />
    </div>
  );
}