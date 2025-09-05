"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* --- Top Navbar --- */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className={`sticky top-0 z-50 w-full transition-all ${
          scrolled
            ? "backdrop-blur-xl bg-white/70 border-b border-zinc-200/50 shadow-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent"
          >
            <Zap size={22} className="text-indigo-600" />
            ConvertPro
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/features" className="hover:text-indigo-600 transition">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-indigo-600 transition">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-indigo-600 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-indigo-600 transition">
              Contact
            </Link>
          </div>

          {/* Right: Auth + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Desktop Auth */}
            <div className="hidden md:flex">
              <AuthButtons />
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg hover:bg-zinc-100 transition"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- Mobile Drawer --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />

            {/* Drawer content */}
            <motion.div
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white/90 backdrop-blur-xl p-6 shadow-xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent"
                  onClick={() => setOpen(false)}
                >
                  <Zap size={18} className="text-indigo-600" />
                  ConvertPro
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md hover:bg-white/20"
                >
                  <X />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-4 text-sm font-medium">
                <Link
                  href="/features"
                  className="hover:text-indigo-600 transition"
                  onClick={() => setOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="hover:text-indigo-600 transition"
                  onClick={() => setOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="hover:text-indigo-600 transition"
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-indigo-600 transition"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </nav>

              {/* Auth section */}
              <div className="mt-auto pt-6 border-t border-zinc-200">
                <AuthButtons className="w-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
                }
