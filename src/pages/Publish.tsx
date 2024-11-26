import React, { useState } from 'react';
import PublishForm from '../components/PublishForm';
import AuthModal from '../components/AuthModal';
import toast from 'react-hot-toast';

interface PublishProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export default function Publish({ isAuthenticated, setIsAuthenticated }: PublishProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handlePublish = async (data: { url: string; content: string; images: File[] }) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('url', data.url);
      formData.append('content', data.content);
      data.images.forEach(image => {
        formData.append('images', image);
      });

      const response = await fetch('/api/content/publish', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to publish');

      toast.success('Published successfully!');
    } catch (error) {
      toast.error('Failed to publish. Please try again.');
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error('Login failed');

      setIsAuthenticated(true);
      setShowAuthModal(false);
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleSignup = async (name: string, email: string, password: string, location: string) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, location })
      });

      if (!response.ok) throw new Error('Signup failed');

      setIsAuthenticated(true);
      setShowAuthModal(false);
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <>
      <PublishForm onPublish={handlePublish} />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </>
  );
}