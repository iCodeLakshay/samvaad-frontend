import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuth = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSignedUp: false,
    isLoggedIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/api/auth/check');
            set({ authUser: res.data });
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
    }
}))