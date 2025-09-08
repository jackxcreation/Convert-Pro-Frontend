# Animated Login/Signup Component for Convert Pro

```jsx
// components/AnimatedAuth.jsx

"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Github, 
  Chrome,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const AnimatedAuth = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  });
  
  const supabase = createClientComponentClient();

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      
      if (error) throw error;
      
      // Success - redirect or close modal
      if (onClose) onClose();
      window.location.reload(); // Refresh to show logged in state
      
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Up - Step 1 (Send OTP)
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          }
        }
      });
      
      if (error) throw error;
      
      // Show OTP verification step
      setShowOTP(true);
      alert('OTP sent to your email! Please check your inbox.');
      
    } catch (error) {
      alert('Signup failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Verification
  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: formData.otp,
        type: 'signup'
      });
      
      if (error) throw error;
      
      // Success - close modal and refresh
      alert('Account verified successfully!');
      if (onClose) onClose();
      window.location.reload();
      
    } catch (error) {
      alert('OTP verification failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google/GitHub OAuth
  const handleOAuthSignIn = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
      
    } catch (error) {
      alert(`${provider} login failed: ` + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] relative overflow-hidden"
      >
        {/* Animated Red/Orange Box */}
        <motion.div
          animate={{ 
            x: isSignUp ? 0 : '100%' 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center z-10"
        >
          <div className="text-center p-8">
            {isSignUp ? (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-lg mb-6 opacity-90">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={() => {
                    setIsSignUp(false);
                    setShowOTP(false);
                    setFormData({ name: '', email: '', password: '', otp: '' });
                  }}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-red-600 transition-all duration-300"
                >
                  SIGN IN
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
                <p className="text-lg mb-6 opacity-90">
                  Enter your personal details and start your journey with us
                </p>
                <button
                  onClick={() => {
                    setIsSignUp(true);
                    setShowOTP(false);
                    setFormData({ name: '', email: '', password: '', otp: '' });
                  }}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-red-600 transition-all duration-300"
                >
                  SIGN UP
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Sign In Form */}
        <AnimatePresence mode="wait">
          {!isSignUp && (
            <motion.div
              key="signin-form"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: 0.1 }}
              className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-center p-8"
            >
              <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Convert Pro</h1>
                  <h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>
                </div>

                {/* Social Login Buttons */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => handleOAuthSignIn('google')}
                    className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Chrome className="w-5 h-5 text-red-500" />
                  </button>
                  <button
                    onClick={() => handleOAuthSignIn('github')}
                    className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Github className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                <p className="text-center text-gray-500 text-sm mb-6">or use your account</p>

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <button
                    type="button"
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Forgot your password?
                  </button>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-orange-600 transition-all disabled:opacity-50"
                  >
                    {loading ? 'SIGNING IN...' : 'SIGN IN'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sign Up Form */}
        <AnimatePresence mode="wait">
          {isSignUp && !showOTP && (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ delay: 0.1 }}
              className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-center p-8"
            >
              <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Convert Pro</h1>
                  <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
                </div>

                {/* Social Signup Buttons */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => handleOAuthSignIn('google')}
                    className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Chrome className="w-5 h-5 text-red-500" />
                  </button>
                  <button
                    onClick={() => handleOAuthSignIn('github')}
                    className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Github className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                <p className="text-center text-gray-500 text-sm mb-6">or use your email for registration</p>

                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-orange-600 transition-all disabled:opacity-50"
                  >
                    {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OTP Verification */}
        <AnimatePresence mode="wait">
          {isSignUp && showOTP && (
            <motion.div
              key="otp-form"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-center p-8"
            >
              <div className="w-full max-w-sm text-center">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Convert Pro</h1>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verify Email</h2>
                  <p className="text-gray-600 text-sm">
                    We've sent a verification code to<br />
                    <span className="font-medium">{formData.email}</span>
                  </p>
                </div>

                <form onSubmit={handleOTPVerification} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter 6-digit code"
                      value={formData.otp}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-center text-lg font-medium"
                      maxLength="6"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-red-700 hover:to-orange-600 transition-all disabled:opacity-50"
                  >
                    {loading ? 'VERIFYING...' : 'VERIFY EMAIL'}
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => setShowOTP(false)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Back to Sign Up
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AnimatedAuth;
```
