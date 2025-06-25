import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuth } from './useAuth'

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    unreadMessages: {},

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const response = await axiosInstance.get("/api/messages/user");
            console.log("Get Users response:", response);            
            set({ users: response.data });
        } catch (error) {
            console.log("Failed to fetch users: ", error);            
            toast.error("Failed to fetch users");            
        } finally {
            set({ isUserLoading: false });
        }
    },   
    
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/api/messages/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error("Failed to fetch messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/api/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data]});
            return res.data;
        } catch (error) {   
            toast.error('Error in send message controller', error.response.data.message);
            throw error;
        }
    },

    setSelectedUser: (user) => {
        if (!user) {
            set({ selectedUser: null });
            return;
        }
        set((state) => ({
             selectedUser: typeof user === 'object' ? user : null,
             unreadMessages: {
                ...state.unreadMessages,
                [user._id]: 0
             }
        }));
    },

    subsToMessages: () => {
        const {selectedUser} = get();
        
        if(!selectedUser) return;

        const socket = useAuth.getState().socket;
        
        socket.on('newMessage', (newMsg) => {
            console.log('Received new message:', newMsg);
            const { selectedUser } = get();
            if (selectedUser && newMsg.senderId === selectedUser._id) {
                set({
                    messages: [...get().messages, newMsg],
                    unreadMessages: {
                        ...get().unreadMessages,
                        [newMsg.senderId]: 0
                    }
                });
            } else {
                set((state) => {
                    const prev = state.unreadMessages[newMsg.senderId] || 0;
                    console.log('Incrementing unread for', newMsg.senderId, 'from', prev, 'to', prev + 1);
                    return {
                        unreadMessages: {
                            ...state.unreadMessages,
                            [newMsg.senderId]: prev + 1
                        }
                    }
                });
            }
        });
        // Listen for messagesSeen event
        socket.on('messagesSeen', ({ by }) => {
            const { selectedUser, messages, authUser } = { ...get(), authUser: useAuth.getState().authUser };
            if (!selectedUser || !authUser) return;
            // Mark all messages sent by me to selectedUser as seen
            set({
                messages: messages.map(msg =>
                    msg.senderId === authUser._id && msg.receiverId === selectedUser._id
                        ? { ...msg, seen: true }
                        : msg
                )
            });
        });
    },

    unsubsToMessages: () => {
        const socket = useAuth.getState().socket;
        socket.off('newMessage')
        socket.off('messagesSeen')
    },

    markMessagesAsSeen: async (userId) => {
        try {
            await axiosInstance.patch(`/api/messages/seen/${userId}`);
            set((state) => ({
                messages: state.messages.map(msg =>
                    msg.senderId === userId ? { ...msg, seen: true } : msg
                )
            }));
        } catch (error) {
            toast.error('Failed to mark messages as seen');
        }
    }
}))