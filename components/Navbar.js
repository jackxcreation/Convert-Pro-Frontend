"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap, ShieldCheck, Sparkles } from "lucide-react";
import AuthButtons from "./AuthButtons";

const NavLink = ({ href, children, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="px-3 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
  >
    {children}
  </Link>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-zinc-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-sm">
            <Zap size={18} className="text-white" />
          </div>
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Convert <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Pro</span>
          </Link>
        </div>

        {/* Center: Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        {/* Right: Auth */}
        <div className="hidden md:flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1 text-xs text-zinc-500 pr-2">
            <ShieldCheck size={16} />
            <span>Secure</span>
            <Sparkles size={16} className="ml-2" />
            <span>Fast</span>
          </div>
          <AuthButtons />
        </div>

        {/* Mobile: Menu button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-zinc-100 transition"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-zinc-200 bg-white/90 backdrop-blur-xl">
          <div className="px-4 py-3 flex flex-col gap-1">
            <NavLink href="/features" onClick={() => setOpen(false)}>Features</NavLink>
            <NavLink href="/pricing" onClick={() => setOpen(false)}>Pricing</NavLink>
            <NavLink href="/about" onClick={() => setOpen(false)}>About</NavLink>
            <NavLink href="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
            <div className="pt-2">
              <AuthButtons />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
