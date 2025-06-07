import { MessageSquare } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const NoChatSelected = () => {
  const { authUser } = useAuth();

  return (
    <div className="flex-1 h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-800/50">
      <div className="text-center space-y-6 max-w-xl px-4">
        {/* Icon Container */}
        <div className="flex justify-center">
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <MessageSquare className="w-20 h-20 text-blue-500 dark:text-blue-400" />
          </div>
        </div>

        {/* Welcome Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome, {authUser?.fullName}! 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Select a chat to start messaging
          </p>
        </div>

        {/* Features List */}
        <div className="pt-8 space-y-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            With Samvaad, you can:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-lg mx-auto">
            <Feature 
              title="Real-time Chat"
              description="Experience seamless real-time messaging"
            />
            <Feature 
              title="Media Sharing"
              description="Share images and files easily"
            />
            <Feature 
              title="User Friendly"
              description="Clean and intuitive interface"
            />
            <Feature 
              title="Secure"
              description="End-to-end encrypted messages"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ title, description }) => (
  <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700">
    <h3 className="font-medium text-gray-800 dark:text-white mb-1">
      {title}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">
      {description}
    </p>
  </div>
);

export default NoChatSelected;