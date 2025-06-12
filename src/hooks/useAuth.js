import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';


export const useAuth = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSignedUp: false,
    isLoggedIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/api/auth/check', { withCredentials: true });
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log('Error checking authentication:', error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (formData) => {
        set({ isSignedUp: true });
        try {
            const res = await axiosInstance.post('/api/auth/signup', formData);
            set({ authUser: res.data });
            toast.success('Account created successfully 🎉');
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error signing up');
        } finally {
            set({ isSignedUp: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/api/auth/logout');
            set({ authUser: null });
            console.log('User logged out successfully');
            toast.success('Logged out successfully');
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error signing up');
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/api/auth/login', formData);
            set({ authUser: res.data });
            toast.success('Logged in successfully');
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error logging in');
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (formData) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/api/auth/update-profile', formData);
            set({ authUser: res.data });
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating profile');
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(import.meta.env.VITE_API_BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });
        socket.connect();
        set({ socket: socket });
        socket.on('onlineUsers', (userIds) => {
            set({ onlineUsers: userIds })
        })
    },
    disconnectSocket: () => {
        if(get().socket?.connected) {
            get().socket.disconnect();
        };
    },
}))