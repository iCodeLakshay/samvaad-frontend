import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const response = await axiosInstance.get("/api/message/user");
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
            const response = await axiosInstance.get(`/api/message/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error("Failed to fetch messages");
        } finally {
            set({ isMessagesLoading: false });
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