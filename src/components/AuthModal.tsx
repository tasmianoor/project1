"use client";

import { useState, useEffect } from 'react';
import Button from './ui/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthStep = 'email' | 'login' | 'signup';

interface UserData {
  email: string;
  name?: string;
  password?: string;
  acctType?: 'Spouse or child' | 'Parent or sibling' | 'Relative' | 'Friend';
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<AuthStep>('email');
  const [userData, setUserData] = useState<UserData>({ email: '' });
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setStep('email');
      setUserData({ email: '' });
      setError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const isFormValid = () => {
    if (isSubmitting) return false;
    if (error) return false;

    switch (step) {
      case 'email':
        return userData.email && userData.email.includes('@');
      case 'login':
        return userData.password && userData.password.length >= 8;
      case 'signup':
        return (
          userData.name &&
          userData.password &&
          userData.password.length >= 8 &&
          userData.acctType
        );
      default:
        return false;
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.email) {
      setError('Email is required');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.email }),
      });
      
      const data = await response.json();
      if (data.exists) {
        setStep('login');
      } else {
        setStep('signup');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.password) {
      setError('Password is required');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        onClose();
        window.location.reload();
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.name || !userData.password || !userData.acctType) {
      setError('All fields are required');
      return;
    }
    if (userData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        onClose();
        window.location.reload();
      } else {
        setError('Failed to create account');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#DB8F37] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-['Outfit']">
            {step === 'email' && 'Sign in or create account'}
            {step === 'login' && 'Welcome back'}
            {step === 'signup' && 'Create your account'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 font-['Outfit']">
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded font-['Outfit']">
            {error}
          </div>
        )}

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit} autoComplete="off">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-['Outfit']">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                  setError('');
                }}
                className="w-full p-2 border rounded font-['Outfit']"
                required
                aria-required="true"
                placeholder="Enter your email"
                autoComplete="off"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={!isFormValid()}
            >
              {isSubmitting ? 'Checking...' : 'Continue'}
            </Button>
          </form>
        )}

        {step === 'login' && (
          <form onSubmit={handleLoginSubmit} autoComplete="off">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-['Outfit']">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={userData.password || ''}
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                  setError('');
                }}
                className="w-full p-2 border rounded font-['Outfit']"
                required
                aria-required="true"
                placeholder="Enter your password"
                minLength={8}
                autoComplete="off"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={!isFormValid()}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        )}

        {step === 'signup' && (
          <form onSubmit={handleSignupSubmit} autoComplete="off">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-['Outfit']">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={userData.name || ''}
                onChange={(e) => {
                  setUserData({ ...userData, name: e.target.value });
                  setError('');
                }}
                className="w-full p-2 border rounded font-['Outfit']"
                required
                aria-required="true"
                placeholder="Enter your full name"
                autoComplete="off"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-['Outfit']">
                Relationship <span className="text-red-500">*</span>
              </label>
              <select
                value={userData.acctType || ''}
                onChange={(e) => {
                  setUserData({ ...userData, acctType: e.target.value as UserData['acctType'] });
                  setError('');
                }}
                className="w-full p-2 border rounded font-['Outfit']"
                required
                aria-required="true"
                autoComplete="off"
              >
                <option value="">Select relationship</option>
                <option value="Spouse or child">Spouse or child</option>
                <option value="Parent or sibling">Parent or sibling</option>
                <option value="Relative">Relative</option>
                <option value="Friend">Friend</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-['Outfit']">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={userData.password || ''}
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                  setError('');
                }}
                className="w-full p-2 border rounded font-['Outfit']"
                required
                aria-required="true"
                placeholder="Create a password (min. 8 characters)"
                minLength={8}
                autoComplete="off"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={!isFormValid()}
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
} 