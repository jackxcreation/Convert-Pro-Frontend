// components/AuthButtons.js
"use client";
import { useEffect, useState, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

/**
 * Simple Auth buttons component.
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env vars.
 */

export default function AuthButtons() {
  const [user, setUser] = useState(null);
  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    // initial user
    supabase.auth.getUser().then((res) => {
      setUser(res?.data?.user || null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      sub?.subscription?.unsubscribe?.();
    };
  }, [supabase]);

  if (!supabase) {
    // no supabase keys configured
    return (
      <div className="flex gap-2">
        <a href="/auth" className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm">Sign in</a>
      </div>
    );
  }

  const signInWithProvider = async (provider) => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-3">
          <div className="text-sm text-zinc-700">Hi, {user.email ?? "User"}</div>
          <button onClick={signOut} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <a href="/auth" className="px-4 py-2 rounded-xl bg-white/10 text-sm">Sign in</a>
          <button onClick={() => signInWithProvider("google")} className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm">
            Google
          </button>
        </div>
      )}
    </div>
  );
}
