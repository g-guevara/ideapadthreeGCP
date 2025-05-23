'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLogin = searchParams.get('mode') !== 'signup';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      let success = false;
      
      if (isLogin) {
        success = await login(email, password);
        if (!success) {
          setError('Invalid email or password');
        }
      } else {
        if (!name.trim()) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        
        success = await signup(name, email, password);
        if (!success) {
          setError('Email already in use');
        }
      }
      
      if (success) {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto bg-gray-900 rounded-xl shadow-xl overflow-hidden p-8 border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        {isLogin ? 'Log in to your account' : 'Create a new account'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Log in' : 'Sign up'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <a
            href={isLogin ? '/auth?mode=signup' : '/auth?mode=login'}
            className="ml-1 text-purple-400 hover:text-purple-300"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </a>
        </p>
      </div>
    </div>
  );
}