import { useEffect, useState } from "react";
import { useChatStore } from "../hooks/useChat"
import SidebarSkeleton from './Loaders/SidebarSkeleton'
import { Search, UserCircle2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading, unreadMessages } = useChatStore();
    const { onlineUsers } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [showOnlineUsers, setShowOnlineUsers] = useState(false);

    // Debug log
    console.log('Sidebar unreadMessages:', unreadMessages);

    useEffect(() => {
        getUsers();
    }, [getUsers])    
    if (isUserLoading) return <SidebarSkeleton />;

    // Filter users by search query and online status
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
        const isOnline = onlineUsers.includes(user._id);
        return matchesSearch && (!showOnlineUsers || isOnline);
    });
    console.log("Unread Messages: ",unreadMessages);
    return (
        <div className="h-full flex flex-col bg-white dark:bg-slate-900">
            {/* Search Section */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg 
                        focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 
                        text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                </div>            
            </div>

            {/* Online users filter toggle */}
            <div className="flex justify-end gap-3 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        Online Users Only
                    </span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showOnlineUsers}
                        onChange={(e) => setShowOnlineUsers(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                </label>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
                {filteredUsers.length === 0 ? (
                    <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                        All are busy...
                    </div>
                ) : (
                    filteredUsers.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`w-full p-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors
                                ${selectedUser?._id === user._id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                        >
                            <div className="relative">
                                {user.profilePic ? (
                                    <img
                                        src={user.profilePic}
                                        alt={user.fullName}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <UserCircle2 className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                                )}
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900
                                    ${onlineUsers.includes(user._id) ? 'bg-green-500' : 'bg-red-400 dark:bg-red-600'}`}>
                                </div>
                            </div>

                            <div className="flex-1 text-left">
                                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                                    {user.fullName}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                                </p>
                            </div>

                            {(unreadMessages[user._id] || 0) > 0 && (
                                <span className="bg-green-500 text-white rounded-full px-2 text-xs">
                                    {unreadMessages[user._id] || 0}
                                </span>
                            )}
                        </button>
                    ))
                )}
            </div>
        </div>
    )
}

export default Sidebar
