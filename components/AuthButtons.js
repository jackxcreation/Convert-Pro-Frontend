"use client";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";

export default function AuthButtons() {
  // browser client banate hai
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
  }, [supabase]);

  const signIn = async (provider) => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <button
          onClick={signOut}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => signIn("google")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Login with Google
          </button>
          <button
            onClick={() => signIn("github")}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          >
            Login with GitHub
          </button>
        </div>
      )}
    </div>
  );
}
