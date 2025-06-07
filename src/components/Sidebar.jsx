import { useEffect, useState } from "react";
import { useChatStore } from "../hooks/useChat"
import SidebarSkeleton from './Loaders/SidebarSkeleton'
import { Search, UserCircle2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
    const { onlineUsers } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getUsers();
    }, [getUsers])

    if (isUserLoading) return <SidebarSkeleton />

    const filteredUsers = users.filter(user =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
                {filteredUsers.length === 0 ? (
                    <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                        No users found
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
                                    ${onlineUsers.includes(user._id) ? 'bg-green-500' : 'bg-gray-400 dark:bg-gray-600'}`}>
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
                        </button>
                    ))
                )}
            </div>
        </div>
    )
}

export default Sidebar