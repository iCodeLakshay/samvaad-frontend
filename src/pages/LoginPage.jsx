import { useState } from 'react';
import { Eye, EyeOff, Loader2, MessageCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import FlipCard from '../components/FlipCardAnimation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login, isLoggedIn } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateInputs = () => {
    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      toast.error('All fields are required');
      return false;
    }
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const isValidated = validateInputs();
    if (isValidated) {
      login(formData);
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen gap-6 flex items-center justify-center transition-colors duration-500 text-slate-800 dark:bg-slate-900 dark:text-slate-100">

        <div className="w-full max-w-md transition-all duration-500 p-8">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors duration-300 bg-blue-50 text-blue-600 dark:bg-slate-700 dark:text-blue-400">
              <MessageCircle size={32} />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Welcome Back</h1>
            <p className="transition-colors duration-300 text-slate-600 dark:text-slate-400">
              Sign in to continue your conversations
            </p>
          </div>

          <div className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium transition-colors duration-300 text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-0 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:outline-none"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-2">
              <label className="block text-sm font-medium transition-colors duration-300 text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-0 bg-white dark:bg-slate-700 ${formData.password.length > 0 && formData.password.length < 6
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:focus:border-red-500 dark:focus:ring-red-500/20'
                      : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20'
                    } text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none`}
                  required
                />
                {formData.password.length > 0 && formData.password.length < 6 && (
                  <div className='absolute left-0 top-full mt-1 text-red-500 text-xs'>
                    Password must be at least 6 characters long
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 hover:scale-110 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm font-medium transition-colors duration-200 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-5 py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isLoggedIn}
            >
              {isLoggedIn ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className='size-5 animate-spin' />
                  <span>Signing In...</span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm transition-colors duration-300 text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <a
                href="/signup"
                className="font-medium transition-colors duration-200 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>

        <div>
          <FlipCard />
        </div>

    </div>
  );
}