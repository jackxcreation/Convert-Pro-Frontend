"use client";

import { createBrowserClient } from "@supabase/ssr";   // ✅ Modern import
import AuthSplitPage from "@/components/AuthSplitPage";

export default function Page() {
  // Initialize supabase client only on client side
  const supabase = createBrowserClient();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthSplitPage supabaseClient={supabase} />
    </div>
  );
}
