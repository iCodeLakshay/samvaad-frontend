import { useAuth } from '../hooks/useAuth';
import { useChatStore } from '../hooks/useChat';
import { UserCircle2, X } from 'lucide-react';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUser } = useAuth();

    return (
        <div className='flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center gap-4'>
                {/* Profile Picture */}
                <div className="relative">
                    <img
                        src={selectedUser.profilePic || './assets/Profile/profile.png'}
                        alt={selectedUser.fullName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                    />
                </div>

                {/* User Info */}
                <div className='flex flex-col justify-center'>
                    <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-200 leading-tight'>
                        {selectedUser.fullName}
                    </h2>
                    <div className='flex items-center space-x-1'>
                        <div className={`w-1.5 h-1.5 rounded-full ${onlineUser?.includes(selectedUser._id)
                                ? 'bg-green-500'
                                : 'bg-red-400 dark:bg-red-600'
                            }`} />
                        <span className='text-sm text-gray-500 dark:text-gray-400'>
                            {onlineUser?.includes(selectedUser._id) ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Close Button */}
            <button
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 
                    text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300
                    transition-colors duration-200"
                aria-label="Close chat"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    )
}

export default ChatHeader;