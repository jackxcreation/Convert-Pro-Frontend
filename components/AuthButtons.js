# Updated AuthButtons Component for Convert Pro

```jsx
// components/AuthButtons.js

"use client";
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedAuth from './AnimatedAuth';

export default function AuthButtons() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Get initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const openAuthModal = () => {
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  if (loading) {
    return (
      <div className="flex gap-2">
        <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        {/* User Profile */}
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-white/90 font-medium">
            {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
          </span>
        </div>

        {/* Sign Out Button */}
        <motion.button
          onClick={handleSignOut}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </motion.button>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2">
        {/* Login Button */}
        <motion.button
          onClick={openAuthModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 border border-white/30 bg-white/10 backdrop-blur text-white font-medium rounded-lg hover:bg-white/20 transition-all"
        >
          Login
        </motion.button>

        {/* Get Started Button */}
        <motion.button
          onClick={openAuthModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium rounded-lg hover:from-red-700 hover:to-orange-600 transition-all shadow-lg"
        >
          Get Started
        </motion.button>
      </div>

      {/* Animated Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <AnimatedAuth onClose={closeAuthModal} />
        )}
      </AnimatePresence>
    </>
  );
}
```

## Usage in Navbar.js (Update your existing navbar):

```jsx
// components/Navbar.js - Add AnimatedAuth import à¤”à¤° usage

"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import AuthButtons from './AuthButtons';  // Updated import

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0f0c29]/95 via-[#302b63]/95 to-[#24243e]/95 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="text-white font-bold text-xl">Convert Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-white/90 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-white/90 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-white/90 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white/90 hover:text-white transition-colors">
              Contact
            </Link>

            {/* Auth Buttons with New Modal */}
            <AuthButtons />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/features" className="block px-3 py-2 text-white/90 hover:text-white">
                Features
              </Link>
              <Link href="/pricing" className="block px-3 py-2 text-white/90 hover:text-white">
                Pricing
              </Link>
              <Link href="/about" className="block px-3 py-2 text-white/90 hover:text-white">
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-white/90 hover:text-white">
                Contact
              </Link>
              <div className="px-3 py-2">
                <AuthButtons />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
```

## Auth Callback Handler (for OAuth):

```jsx
// app/auth/callback/route.js

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to home page after authentication
  return NextResponse.redirect(new URL('/', request.url));
}
```
