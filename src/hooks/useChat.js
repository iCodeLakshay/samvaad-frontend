import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const response = await axiosInstance.get("/api/messages/user");
            set({ users: response.data });
        } catch (error) {
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
            toast.error('Error in send message controller');
            throw error;
        }
    },

    setSelectedUser: (user) => {
        if (!user) {
            set({ selectedUser: null });
            return;
        }
        set({ selectedUser: typeof user === 'object' ? user : null });
    },
}))