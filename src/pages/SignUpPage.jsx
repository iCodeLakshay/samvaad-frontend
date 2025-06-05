import { useState } from 'react';
import { Eye, EyeOff, Loader2, MessageCircle } from 'lucide-react';
import FlipCard from '../components/FlipCardAnimation';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const { signup, isSigningUp } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateInputs = () => {
    const { fullName, email, password } = formData;

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      toast.error('All fields are required');
      return false;
    }
    if (fullName.length < 3) {
      toast.error('Username must be at least 3 characters long');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    const isValidated = validateInputs();
    if (isValidated) {
      signup(formData);
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-evenly px-4">

        <div className="w-full max-w-md transition-all duration-500 p-8 ">

          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors duration-300 bg-blue-50 text-blue-600 dark:bg-slate-700 dark:text-blue-400">
              <MessageCircle size={32} />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Create Account</h1>
            <p className="transition-colors duration-300 text-slate-600 dark:text-slate-400">
              Join our community and start chatting
            </p>
          </div>

          <div className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium transition-colors duration-300 text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Choose a Full Name"
                className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-0 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:outline-none"
                required
              />
            </div>

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
            <div className="space-y-2">
              <label className="block text-sm font-medium transition-colors duration-300 text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a secure password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-offset-0 bg-white dark:bg-slate-700 ${formData.password.length > 0 && formData.password.length < 6
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:focus:border-red-500 dark:focus:ring-red-500/20'
                      : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20'
                    } text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none`}
                  required
                />
                {formData.password.length > 0 && formData.password.length < 6 && (
                  <div className='absolute left-0 top-full mt-1 text-red-500 text-xs'>
                    password must be at least 6 characters long
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=" absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 hover:scale-110 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full mt-5 py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                <Loader2 className='size-5 animate-spin' />
                Loading...
                </>
              ): (
                "Create Account"
              )
              }
            </button>
          </div>

          <div className="mt-2 text-center">
            <p className="text-sm transition-colors duration-300 text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <a
                href="/login"
                className="font-medium transition-colors duration-200 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                SignIn
              </a>
            </p>
          </div>
        </div>
        <div>
          <FlipCard />
        </div>

      </div>
    </div>
  );
}