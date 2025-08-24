import { useEffect, useRef } from 'react';
import { useChatStore } from '../hooks/useChat'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import ChatHeaderSkeleton from './Loaders/ChatHeaderSkeleton';
import MessageSkeleton from './Loaders/MessageSkeleton';
import MessageInputSkeleton from './Loaders/MessageInputSkeleton';
import { useAuth } from '../hooks/useAuth';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subsToMessages, unsubsToMessages, unreadMessages, markMessagesAsSeen } = useChatStore();
  const { authUser } = useAuth();
  const scrollMsg = useRef(null);

  useEffect(() => {
    if (scrollMsg.current && messages){
      scrollMsg.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [messages])

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      // console.log('Calling subsToMessages');
      subsToMessages()
    }
    return () => unsubsToMessages();
  }, [selectedUser._id, getMessages, subsToMessages, unsubsToMessages]);

  // Mark messages as seen when messages or selectedUser change
  useEffect(() => {
    if (selectedUser?._id && messages.some(msg => msg.senderId === selectedUser._id && !msg.seen)) {
      markMessagesAsSeen(selectedUser._id);
    }
  }, [selectedUser, messages, markMessagesAsSeen]);

  if (!selectedUser) return null;

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeaderSkeleton />
        <MessageSkeleton />
        <MessageInputSkeleton />
      </div>)
  }; return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <ChatHeader />

      {/* Messages area with its own scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 dark:bg-gray-900">
        {messages.map((msg, idx) => {
          const isLastSentByMe =
            msg.senderId === authUser._id &&
            messages.filter(m => m.senderId === authUser._id).slice(-1)[0]?._id === msg._id;
          return (
            <div
              key={msg._id}
              className={`flex ${msg.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}
              ref={scrollMsg}
            >
              <div className={`flex ${msg.senderId === authUser._id ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`} style={{ width: "-webkit-fill-available" }}>
                {/* Profile Picture - Only show for others' messages */}
                {msg.senderId !== authUser._id && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={selectedUser.profilePic || './assets/Profile/profile.png'}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {/* Message Content */}
                <div className={`flex flex-col ${msg.senderId === authUser._id ? 'items-end mr-2' : 'items-start ml-2'} max-w-[60%] space-y-1`}>
                  {msg.senderId !== authUser._id && (
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 ml-1">
                      {selectedUser.fullName}
                    </span>
                  )}
                  {/* Message Bubble */}
                  <div className={`inline-block rounded-lg p-3 ${msg.senderId === authUser._id
                      ? 'bg-blue-500 text-white dark:bg-blue-900 rounded-tr-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm'
                    }`}>
                    {/* Image Message (If exists) */}
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Message"
                        className="max-w-[12rem] rounded-lg mt-2"
                      />
                    )}
                    {/* Text Message */}
                    {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}
                  </div>
                  {/* Timestamp */}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {/* Seen indicator for last message sent by me */}
                  {isLastSentByMe && msg.seen && (
                    <span className="text-[12px] text-gray-500 dark:text-blue-400 mt-1">Seen</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer