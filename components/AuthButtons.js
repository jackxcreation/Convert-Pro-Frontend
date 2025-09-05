"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { User, LogOut, LogIn } from "lucide-react";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AuthButtons({ className = "" }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // initial user
    (async () => {
      try {
        const res = await supabase.auth.getUser();
        if (!mounted) return;
        setUser(res?.data?.user ?? null);
      } catch (e) {
        console.error("supabase getUser error", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    // subscribe to auth changes
    const {
      data: { subscription } = {},
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      try {
        subscription?.unsubscribe?.();
      } catch (e) {}
    };
  }, []);

  const signIn = async (provider) => {
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin },
      });
    } catch (e) {
      console.error("Sign in error", e);
      alert("Sign in failed");
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (e) {
      console.error("Sign out error", e);
    }
  };

  if (loading) {
    return <div className={`flex items-center gap-2 ${className}`}>...</div>;
  }

  if (user) {
    // user metadata may include avatar_url
    const avatar =
      user.user_metadata?.avatar_url ||
      user.user_metadata?.avatar ||
      null;

    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-xl">
          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center">
              <User size={14} />
            </div>
          )}
          <div className="text-left">
            <div className="text-sm font-medium">{user.email ?? user.id}</div>
            <div className="text-xs text-white/70">Member</div>
          </div>
        </div>

        <button
          onClick={signOut}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
          title="Log out"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => signIn("google")}
        className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
        title="Login with Google"
      >
        <LogIn size={14} />
        Sign in
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => signIn("google")}
          className="px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm hover:scale-105 transition"
          title="Sign in with Google"
        >
          Google
        </button>
        <button
          onClick={() => signIn("github")}
          className="px-3 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition"
          title="Sign in with GitHub"
        >
          GitHub
        </button>
      </div>
    </div>
  );
          }
