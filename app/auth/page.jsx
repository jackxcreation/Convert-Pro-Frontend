"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthSplitPage from "@/components/AuthSplitPage";

export default function Page() {
  const supabase = createClientComponentClient();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthSplitPage supabaseClient={supabase} />
    </div>
  );
}
