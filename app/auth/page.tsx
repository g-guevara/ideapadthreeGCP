'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <AuthForm />
      </div>
    </div>
  );
}