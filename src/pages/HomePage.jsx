import ChatContainer from '../components/ChatContainer.jsx';
import NoChatSelected from '../components/NoChatSelected.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { useChatStore } from '../hooks/useChat.js'
import { FaChevronRight } from "react-icons/fa";
const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-screen pt-16">
      {/* Sidebar - Responsive */}
      <div className="fixed md:relative z-10 w-72 md:w-1/3 lg:w-1/4 
        transition-transform duration-300 ease-in-out
        -translate-x-full md:translate-x-0 
        [&:has(>div:hover)]:translate-x-0
        hover:translate-x-0
        h-[calc(100vh-4rem)]">
        <div className="h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow-lg md:shadow-none">
          <Sidebar />
        </div>
        {/* Pull tab for mobile */}
        <div className="absolute right-0 top-1/2 transform translate-x-full md:hidden">
          <div className="bg-blue-500 text-white p-2 rounded-r-md cursor-pointer hover:bg-blue-600 shadow-lg">
            <div className="writing-mode-vertical text-sm font-medium"><FaChevronRight /></div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Responsive */}
      <div className="flex-1 w-full">
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </div>
  )
}

export default HomePage