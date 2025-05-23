'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IdeaForm from '@/components/ideas/IdeaForm';
import ApplicationList from '@/components/application/ApplicationList';
import { getIdeas, getApplicationsByUserId, getApplicationsByIdeaId, setCurrentIdeaId } from '@/lib/store';
import { Plus, Send, Inbox } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("my-ideas");
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth?mode=login');
    }
  }, [isAuthenticated, loading, router]);
  
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  
  // Get user's ideas
  const allIdeas = getIdeas();
  const userIdeas = allIdeas.filter(idea => idea.userId === user.id);
  
  // Get applications made by the user
  const userApplications = getApplicationsByUserId(user.id);
  
  // Get applications for the user's ideas
  const receivedApplications = userIdeas.flatMap(idea => 
    getApplicationsByIdeaId(idea.id)
  );
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Manage your ideas and applications</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-900 border border-gray-800 p-1 rounded-lg">
          <TabsTrigger
            value="my-ideas"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 rounded-md px-4 py-2"
          >
            <Send size={18} className="mr-2" />
            My Ideas
          </TabsTrigger>
          <TabsTrigger
            value="new-idea"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 rounded-md px-4 py-2"
          >
            <Plus size={18} className="mr-2" />
            Submit New Idea
          </TabsTrigger>
          <TabsTrigger
            value="applications"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 rounded-md px-4 py-2"
          >
            <Inbox size={18} className="mr-2" />
            Applications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-ideas" className="mt-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">My Ideas</h2>
            
            {userIdeas.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl text-gray-300 mb-2">You haven't submitted any ideas yet</h3>
                <p className="text-gray-500 mb-4">Start by creating a new idea to collaborate on</p>
                <button
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => setActiveTab("new-idea")}
                >
                  Create Idea
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {userIdeas.map(idea => (
                  <div key={idea.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-2">{idea.title}</h3>
                    <p className="text-gray-400 mb-4">{idea.shortDescription}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {idea.professions.map((profession, index) => (
                        <span 
                          key={index}
                          className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                        >
                          {profession}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-3">
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm">
                          {getApplicationsByIdeaId(idea.id).length} applications received
                        </span>
                      </div>
                      <button
                        className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                        onClick={() => {
                          setCurrentIdeaId(idea.id);
                          router.push('/idea');
                        }}
                      >
                        View Idea
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="new-idea" className="mt-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-6">Submit a New Idea</h2>
            <IdeaForm />
          </div>
        </TabsContent>
        
        <TabsContent value="applications" className="mt-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Applications for Your Ideas</h2>
              <ApplicationList 
                applications={receivedApplications} 
                showIdeaTitles={true}
                emptyMessage="No applications received for your ideas yet"
              />
            </div>
            
            <div className="pt-8 border-t border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Your Applications</h2>
              <ApplicationList 
                applications={userApplications} 
                showIdeaTitles={true}
                emptyMessage="You haven't applied to any ideas yet"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}