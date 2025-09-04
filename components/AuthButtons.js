"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function AuthButtons() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
  }, []);

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
        <button onClick={signOut} className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Logout
        </button>
      ) : (
        <div className="flex gap-2">
          <button onClick={() => signIn("google")} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
            Login with Google
          </button>
          <button onClick={() => signIn("github")} className="bg-gray-800 text-white px-4 py-2 rounded-lg">
            Login with GitHub
          </button>
        </div>
      )}
    </div>
  );
}
