"use client";

import { createClient } from "@/utils/supabase/client";
import { Github } from "lucide-react";
import Image from "next/image";

export default function AuthPage() {
  const signInWithProvider = async (provider) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error(error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500">Sign in to continue</p>

        <div className="space-y-4">
          {/* Google Sign In */}
          <button
            onClick={() => signInWithProvider("google")}
            className="w-full flex items-center gap-3 justify-center border rounded-xl py-3 bg-white hover:shadow-sm transition"
          >
            <Image src="/google.svg" alt="Google" width={18} height={18} />
            Sign in with Google
          </button>

          {/* GitHub Sign In */}
          <button
            onClick={() => signInWithProvider("github")}
            className="w-full flex items-center gap-3 justify-center border rounded-xl py-3 bg-white hover:shadow-sm transition"
          >
            <Github size={18} />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
