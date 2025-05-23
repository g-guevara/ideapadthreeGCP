'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, User, LogOut, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link 
              href="/"
              className="text-white font-bold text-xl flex items-center gap-2"
            >
              <span className="text-white bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                IdeaForge
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth?mode=login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/auth?mode=signup"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-black bg-opacity-95 transform transition-transform ease-in-out duration-300",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col p-8 space-y-8">
          <div className="flex justify-end">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
          
          <Link 
            href="/"
            className="text-white text-lg flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                href="/dashboard"
                className="text-white text-lg flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={20} />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-white text-lg flex items-center gap-2"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/auth?mode=login"
                className="text-white text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/auth?mode=signup"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-md text-lg inline-block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}