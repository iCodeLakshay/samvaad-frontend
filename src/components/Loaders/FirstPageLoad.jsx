import React from 'react';
import { MessageCircle, Wifi, Users, Shield } from 'lucide-react';

const FirstPageLoad = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 dark:bg-blue-900/30 rounded-full animate-pulse opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-200 dark:bg-purple-900/30 rounded-full animate-pulse opacity-20" style={{ animationDelay: '500ms' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-indigo-200 dark:bg-indigo-900/30 rounded-full animate-pulse opacity-20" style={{ animationDelay: '1000ms' }}></div>
      </div>

      {/* Main Loading Content */}
      <div className="text-center z-10 max-w-md px-6">
        
        {/* App Logo with Animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform animate-bounce">
            <MessageCircle size={40} className="text-white" />
          </div>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl border-4 border-blue-400 animate-ping opacity-30"></div>
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl border-2 border-purple-400 animate-ping opacity-20" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* App Name */}
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">
          Samvaad
        </h1>
        
        {/* Tagline */}
        <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
          Connecting conversations, one message at a time
        </p>

        {/* Loading Animation */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-slate-500 dark:text-slate-400 mb-12 animate-pulse">
          Setting up your chat experience...
        </p>

        {/* Feature Icons */}
        <div className="grid grid-cols-3 gap-6 max-w-xs mx-auto">
          <div className="text-center group">
            <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
              <Wifi size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400">Real-time</span>
          </div>
          
          <div className="text-center group">
            <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
              <Users size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400">Connect</span>
          </div>
          
          <div className="text-center group">
            <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
              <Shield size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400">Secure</span>
          </div>
        </div>
      </div>

      {/* Loading Progress Bar */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64">
        <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default FirstPageLoad;
