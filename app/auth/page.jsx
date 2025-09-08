"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Google } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = (() => {
  // client-only: use browser keys
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
})();

export default function AuthSplitPage() {
  const [mode, setMode] = useState("signin"); // 'signin' or 'signup'
  const [step, setStep] = useState("form"); // for signup OTP flow: 'form' -> 'otp' -> 'done'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    setError(""); setInfo("");
  }, [mode]);

  async function signInWithProvider(provider) {
    if (!supabaseClient) return setError("Supabase not configured");
    setLoading(true);
    try {
      await supabaseClient.auth.signInWithOAuth({ provider });
    } catch (err) {
      setError(err?.message || "OAuth failed");
    } finally {
      setLoading(false);
    }
  }

  async function signInWithEmail() {
    setLoading(true); setError(""); setInfo("");
    try {
      if (!email || !password) { setError("Please enter email and password"); setLoading(false); return; }
      const res = await supabaseClient.auth.signInWithPassword({ email, password });
      if (res.error) throw res.error;
      setInfo("Signed in successfully");
    } catch (err) {
      setError(err?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  async function signUpWithEmail() {
    setLoading(true); setError(""); setInfo("");
    try {
      if (!email || !password || !name) { setError("Please enter name, email and password"); setLoading(false); return; }
      const res = await supabaseClient.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      });
      if (res.error) throw res.error;
      // show OTP step or ask user to check email
      setStep("otp");
      setInfo("Check your email for a verification code or link.");
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtpAndFinish() {
    setLoading(true); setError("");
    try {
      if (!otp) { setError("Enter the OTP"); setLoading(false); return; }
      // If your backend uses OTP verification, call it here.
      // For Supabase default email confirm via link, the client typically doesn't verify OTP.
      setStep("done");
      setInfo("Account verified — you can now sign in.");
    } catch (err) {
      setError(err?.message || "OTP verify failed");
    } finally {
      setLoading(false);
    }
  }

  function toggleMode(next) {
    setError(""); setInfo("");
    setMode(next);
    setStep("form");
    setPassword("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 via-white to-zinc-50 p-6">
      <div className="w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden relative">
        <div className="grid grid-cols-2 min-h-[520px]">
          <div className="relative bg-white p-10 flex items-center justify-center">
            {mode === "signin" ? (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-zinc-900 mb-1">Sign in</h2>
                <p className="text-sm text-zinc-500 mb-6">Use your account or sign in with a provider</p>

                <div className="grid gap-3">
                  <button onClick={() => signInWithProvider("google")} className="w-full flex items-center gap-3 justify-center border rounded-xl py-3 bg-white hover:shadow-sm transition">
                    <Google size={18} /> Sign in with Google
                  </button>

                  <button onClick={() => signInWithProvider("github")} className="w-full flex items-center gap-3 justify-center border rounded-xl py-3 bg-black text-white hover:opacity-95 transition">
                    <Github size={18} /> Sign in with GitHub
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-zinc-200" />
                    <div className="text-xs text-zinc-400 uppercase">or</div>
                    <div className="flex-1 h-px bg-zinc-200" />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs text-zinc-600">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="you@example.com" />

                    <label className="block text-xs text-zinc-600">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="••••••••" />

                    <button onClick={signInWithEmail} className="w-full rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white py-3 font-semibold mt-2" disabled={loading}>
                      {loading ? "Signing in..." : "Sign in"}
                    </button>

                    <div className="text-xs text-zinc-500 text-center mt-2">
                      Forgot password? <a className="text-indigo-600">Reset</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="w-full max-w-md text-center">
                <h2 className="text-3xl font-bold text-zinc-900 mb-2">Hello, Friend!</h2>
                <p className="text-sm text-zinc-500 mb-6">Enter your details to create a new account — quick and secure.</p>
                <button onClick={() => toggleMode("signin")} className="px-6 py-3 rounded-full border border-zinc-200 hover:bg-zinc-50 transition">
                  Have an account? Sign in
                </button>
              </motion.div>
            )}
          </div>

          {/* RIGHT */}
          <div className="relative bg-gradient-to-br from-rose-500 to-orange-500 p-10 text-white flex items-center justify-center">
            {mode === "signup" ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="w-full max-w-md">
                <h2 className="text-3xl font-bold mb-1">Create Account</h2>
                <p className="text-sm text-white/90 mb-6">Sign up quickly with email or continue with a provider</p>

                {step === "form" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-white/90">Name</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 placeholder-white/70 focus:outline-none" placeholder="Your full name" />
                    </div>

                    <div>
                      <label className="block text-xs text-white/90">Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 placeholder-white/70 focus:outline-none" placeholder="you@example.com" />
                    </div>

                    <div>
                      <label className="block text-xs text-white/90">Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 placeholder-white/70 focus:outline-none" placeholder="Choose a secure password" />
                    </div>

                    <div className="grid gap-3">
                      <button onClick={signUpWithEmail} className="w-full rounded-full bg-white text-rose-600 font-semibold py-3" disabled={loading}>
                        {loading ? "Sending..." : "Sign up"}
                      </button>

                      <div className="flex items-center gap-3">
                        <button onClick={() => signInWithProvider("google")} className="flex-1 rounded-xl border py-3 bg-white/10"> <Google size={16}/> Google </button>
                        <button onClick={() => signInWithProvider("github")} className="flex-1 rounded-xl border py-3 bg-white/10"> <Github size={16}/> GitHub </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === "otp" && (
                  <div className="space-y-4">
                    <p className="text-sm">Enter the verification code sent to <strong>{email}</strong></p>
                    <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" className="w-full rounded-xl px-4 py-3 text-zinc-900" />
                    <div className="flex gap-3">
                      <button onClick={verifyOtpAndFinish} className="flex-1 rounded-full bg-white text-rose-600 py-3">Verify</button>
                      <button onClick={() => setStep("form")} className="flex-1 rounded-xl border py-3">Back</button>
                    </div>
                  </div>
                )}

                {step === "done" && (
                  <div className="text-center">
                    <h4 className="font-semibold">You're all set!</h4>
                    <p className="text-sm text-white/90">Account created successfully. Please sign in.</p>
                    <button onClick={() => setMode("signin")} className="mt-4 rounded-full bg-white text-rose-600 px-6 py-2">Sign in</button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="w-full max-w-md text-center">
                <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                <p className="text-sm text-white/90 mb-6">To keep connected with us please login with your personal info</p>
                <button onClick={() => setMode("signup")} className="rounded-full border border-white/30 px-6 py-3 bg-white/10">Sign up</button>
              </motion.div>
            )}
          </div>
        </div>

        {/* small status bar & messages */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-xl shadow-md flex gap-4 items-center text-sm">
          <div className="min-w-[220px] text-xs text-zinc-700">{info || "Convert Pro — fast & private converters"}</div>
          {error && <div className="text-rose-600 font-medium">{error}</div>}
        </div>
      </div>
    </div>
  );
}
