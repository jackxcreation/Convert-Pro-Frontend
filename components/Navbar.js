"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "backdrop-blur-xl bg-white/70 border-b border-zinc-200/50 shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
          ConvertPro
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/features" className="hover:text-indigo-600 transition">Features</Link>
          <Link href="/pricing" className="hover:text-indigo-600 transition">Pricing</Link>
          <Link href="/about" className="hover:text-indigo-600 transition">About</Link>
          <Link href="/contact" className="hover:text-indigo-600 transition">Contact</Link>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden p-2 rounded-lg hover:bg-zinc-100 transition">
          <Menu size={22} />
        </button>
      </div>
    </motion.nav>
  );
          }
