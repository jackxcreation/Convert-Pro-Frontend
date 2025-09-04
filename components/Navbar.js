"use client";
import Link from "next/link";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-indigo-600">
        Convert Pro
      </Link>

      {/* Links */}
      <div className="flex gap-6">
        <Link href="/features" className="hover:text-indigo-600">Features</Link>
        <Link href="/pricing" className="hover:text-indigo-600">Pricing</Link>
        <Link href="/about" className="hover:text-indigo-600">About</Link>
        <Link href="/contact" className="hover:text-indigo-600">Contact</Link>
      </div>

      {/* Auth Buttons */}
      <AuthButtons />
    </nav>
  );
}
