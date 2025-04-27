"use client";

import { useState } from 'react';
import Link from './ui/Link';
import Button from './ui/Button';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from './AuthModal';

export default function MainNav() {
  const { user, loading, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <nav className="w-full py-4 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-[28px] font-['Outfit'] font-bold" disableStates>
              Finding Home
            </Link>
            {user && (
              <div className="flex items-center space-x-6">
                <Link href="/dashboard">Dashboard</Link>
              </div>
            )}
          </div>
          {!loading && (
            <Button onClick={handleAuthClick}>
              {user ? 'Log out' : 'Sign up / Log in'}
            </Button>
          )}
        </div>
      </nav>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
} 