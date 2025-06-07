import { useEffect } from 'react';
import { useChatStore } from '../hooks/useChat'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';

const ChatContainer = () => {
  const {messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  if (!selectedUser) return null;
  if (isMessagesLoading) return <div>Loading messages...</div>;
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <p>Messages...</p>

      <MessageInput />
    </div>
  )
}

export default ChatContainer