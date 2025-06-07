import { useEffect } from 'react';
import { useChatStore } from '../hooks/useChat'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import ChatHeaderSkeleton from './Loaders/ChatHeaderSkeleton';
import MessageSkeleton from './Loaders/MessageSkeleton';
import MessageInputSkeleton from './Loaders/MessageInputSkeleton';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  if (!selectedUser) return null;
  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeaderSkeleton />
        <MessageSkeleton />
        <MessageInputSkeleton />
      </div>)
  };  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <ChatHeader />
      
      {/* Messages area with its own scroll */}
      <div className="flex-1 overflow-y-auto">
        <p>Messages...</p>
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer