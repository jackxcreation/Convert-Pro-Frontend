"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Convert Pro
        </Link>

        {/* Links (Desktop) */}
        <div className="hidden md:flex gap-8 text-white/90">
          {["Features", "Pricing", "About", "Contact"].map((item, i) => (
            <Link
              key={i}
              href={`/${item.toLowerCase()}`}
              className="relative group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4">
          <button className="px-4 py-2 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 transition">
            Login
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold hover:scale-105 transition">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/70 backdrop-blur-lg p-6 space-y-4 text-white">
          {["Features", "Pricing", "About", "Contact"].map((item, i) => (
            <Link key={i} href={`/${item.toLowerCase()}`} className="block">
              {item}
            </Link>
          ))}
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 rounded-lg bg-white/10">Login</button>
            <button className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500">Get Started</button>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
