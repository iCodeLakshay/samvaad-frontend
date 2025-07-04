import { useState, useRef } from "react"
import { useChatStore } from "../hooks/useChat";
import { ImageIcon, X, Send, Loader } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [messageSending, setMessageSending] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSendMessage = async(e) => {
    e.preventDefault();
    if(!text.trim() && !imagePreview) return;
    setMessageSending(true);
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      })
      
      setText('');
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setMessageSending(false);
    } catch (error) {
      console.error('Failed to send message', error);
    }finally{
      setMessageSending(false);
    }
  };

  return (    
  <div className="p-4 bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 mt-auto">
      {/* Image Preview */}
      {imagePreview && (
        <div className="relative inline-block mb-2">
          <div className="group">
            <img
              src={imagePreview}
              alt="Selected"
              className="size-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
          ref={fileInputRef}
        />

        {/* Image Select Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ImageIcon size={22} />
        </button>

        {/* Message Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg border dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {messageSending ?
            <div className='flex items-center justify-center'>
              <Loader className='size-5 animate-spin' />
            </div> : <Send size={22} />}
        </button>
      </form>
    </div>
  );
};

export default MessageInput