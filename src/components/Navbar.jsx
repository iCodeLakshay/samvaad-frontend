import React, { useState } from 'react';
import { Settings, User, LogOut, MessageCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const { logout, authUser } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleSettings = () => {
    console.log('Opening settings...');
    navigate('/settings');
  };

  const handleProfile = () => {
    console.log('Opening profile...');
    navigate('/profile'); 
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/logout');
    setShowProfileMenu(false);
  };

  return (
    <nav className="fixed min-w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side - Branding */}
          <div onClick={() => navigate('/')} className="flex items-center space-x-3 cursor-pointer ">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 dark:bg-blue-500 transition-colors duration-300">
              <MessageCircle size={24} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300">
              Samvaad
            </h1>
          </div>

          {/* Right Side - Navigation */}
          <div className="flex items-center space-x-4">
            
            <button
              onClick={handleSettings}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-105"
              title="Settings"
            >
              <Settings size={20} />
            </button>

            {/* Authenticated User Options */}
            {/* {authUser && (
              <>
                <button
                  onClick={handleProfile}
                  className="p-2 gap-1 flex items-center rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-105"
                  title="Profile"
                >
                  <User size={20} />
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-105"
                  title="Logout"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium hidden sm:block">Logout</span>
                </button>
              </>
            )} */}
            
            {authUser && (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <User size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
                    <button
                      onClick={handleProfile}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200"
                    >
                      <User size={16} />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;