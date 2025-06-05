import { useState, useRef } from 'react';
import { Camera, User, Mail, Calendar, Shield, X, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, isLoggedIn } = useAuth();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    // Convert to base64 for preview and upload
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      setShowUploadModal(true);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadConfirm = async () => {
    if (!selectedImage) return;
    
    try {
      await updateProfile({ profilePic: selectedImage });
      setShowUploadModal(false);
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleUploadCancel = () => {
    setShowUploadModal(false);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Profile Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your profile information and preferences
            </p>
          </div>

          {/* Main Profile Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">

            {/* Profile Picture Section */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-12 text-center relative">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-white dark:bg-slate-700 p-2 shadow-lg">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-600 flex items-center justify-center">
                    <img
                      src={authUser.profilePic || './assets/profile/profile.png'}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Camera Icon Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                >
                  <Camera size={20} className="text-white" />
                </button>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpdate}
                  className="hidden"
                />
              </div>

              <h2 className="text-2xl font-semibold text-white mt-4 mb-1">
                {authUser.fullName}
              </h2>
              <p className="text-blue-100">
                Click camera icon to update your photo
              </p>
            </div>

            {/* Profile Information */}
            <div className="p-8 space-y-6">

              {/* Full Name */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                  <User size={16} className="mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={authUser.fullName}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Mail size={16} className="mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={authUser.email}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                />
              </div>

              {/* Account Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">

                {/* Member Since */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Calendar size={16} className="mr-2" />
                    Member Since
                  </label>
                  <div className="px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600">
                    <span className="text-slate-600 dark:text-slate-400">
                      {new Date(authUser.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Account Status */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Shield size={16} className="mr-2" />
                    Account Status
                  </label>
                  <div className="px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600">
                    <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'>
                      <span className='w-2 h-2 rounded-full mr-1 bg-green-500'></span>
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-md w-full">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Update Profile Picture
              </h3>
              <button
                onClick={handleUploadCancel}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={20} className="text-slate-500 dark:text-slate-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 shadow-lg">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Looking good! Ready to update?
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleUploadCancel}
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUploadConfirm}
                    disabled={isUpdatingProfile}
                    className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isUpdatingProfile ? (
                      <>
                        <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Check size={16} className="mr-2" />
                        Update
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;