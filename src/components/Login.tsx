import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Smartphone, Download, ChefHat } from 'lucide-react';

const Login = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      const user = {
        id: Date.now().toString(),
        name,
        phone,
        totalSpent: 1200,
        memberSince: new Date('2024-01-15'),
        tier: 'Silver' as const,
      };
      dispatch({ type: 'SET_USER', payload: user });
      navigate('/menu');
    }
  };

  const handleDownloadApp = () => {
    // Simulate app store redirect
    alert('Redirecting to App Store/Play Store...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-primary to-primary-dark flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md animate-bounce-in">
        <div className="text-center mb-8">
          <div className="bg-primary-dark rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <ChefHat className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-primary-darker mb-2">Welcome to Foodie App!</h1>
          <p className="text-gray-600">Sign in to start ordering delicious food</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-dark focus:outline-none transition-colors text-lg"
              required
            />
          </div>

          <div className="relative">
            <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-dark focus:outline-none transition-colors text-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-dark text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-darker transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={handleDownloadApp}
            className="flex items-center justify-center gap-2 text-primary-dark hover:text-primary-darker transition-colors mx-auto"
          >
            <Download className="w-5 h-5" />
            <span>Download our mobile app</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login