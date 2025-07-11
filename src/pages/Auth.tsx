
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { supabase } from '@/integrations/supabase/client';
import { ShoppingBag } from 'lucide-react';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ShoppingBag className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PWA Shop
          </h1>
          <p className="text-gray-600 mt-2">Your favorite online shopping destination</p>
        </div>

        <AuthForm 
          mode={mode} 
          onToggleMode={handleToggleMode} 
          onSuccess={handleSuccess} 
        />
      </div>
    </div>
  );
};

export default Auth;
