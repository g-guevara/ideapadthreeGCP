'use client';

import { useState } from 'react';
import { Application } from '@/lib/types';
import { saveApplication } from '@/lib/store';
import { generateId } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Upload } from 'lucide-react';

interface ApplicationFormProps {
  ideaId: string;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function ApplicationForm({ ideaId, onCancel, onSubmit }: ApplicationFormProps) {
  const { user } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [coverLetter, setCoverLetter] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
    if (!cvFile) newErrors.cvFile = 'CV file is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !user) return;
    
    const application: Application = {
      id: generateId(),
      ideaId,
      name,
      email,
      coverLetter,
      cvUrl: cvFile ? URL.createObjectURL(cvFile) : '',
      userId: user.id,
      createdAt: new Date().toISOString()
    };
    
    saveApplication(application);
    onSubmit();
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Apply for this Project</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className={`w-full px-4 py-2 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-4 py-2 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-300 mb-1">
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            rows={5}
            className={`w-full px-4 py-2 bg-gray-700 border ${errors.coverLetter ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Tell us why you're interested in this project and what skills you bring..."
          />
          {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
        </div>
        
        <div>
          <label htmlFor="cv" className="block text-sm font-medium text-gray-300 mb-1">
            Upload CV
          </label>
          <div 
            className={`border-2 border-dashed ${errors.cvFile ? 'border-red-500' : 'border-gray-600'} rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors`}
            onClick={() => document.getElementById('cv')?.click()}
          >
            <input
              type="file"
              id="cv"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
            />
            
            <Upload size={24} className="mx-auto text-gray-400 mb-2" />
            
            {cvFile ? (
              <p className="text-white">{cvFile.name}</p>
            ) : (
              <div>
                <p className="text-gray-300">Drag & drop your CV here or click to browse</p>
                <p className="text-gray-500 text-sm mt-1">Accepts PDF, DOC, DOCX</p>
              </div>
            )}
          </div>
          {errors.cvFile && <p className="text-red-500 text-sm mt-1">{errors.cvFile}</p>}
        </div>
        
        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}