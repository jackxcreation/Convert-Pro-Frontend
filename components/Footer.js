import { Facebook, Twitter, Youtube, Github } from "lucide-react";
import Link from "next/link";

const Social = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-xl bg-white/40 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="relative border-t border-white/20 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Convert Pro
            </h3>
            <p className="mt-3 text-sm text-zinc-600 max-w-xs">
              Fast, secure & modern converters. Built for creators and teams.
            </p>
            <div className="mt-5 flex items-center gap-3 text-zinc-500">
              <Social href="#"><Twitter size={18} /></Social>
              <Social href="#"><Facebook size={18} /></Social>
              <Social href="#"><Youtube size={18} /></Social>
              <Social href="https://github.com/jackxcreation/">
                <Github size={18} />
              </Social>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li><Link href="/features" className="hover:text-indigo-600 transition">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-indigo-600 transition">Pricing</Link></li>
              <li><Link href="/roadmap" className="hover:text-indigo-600 transition">Roadmap</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li><Link href="/about" className="hover:text-indigo-600 transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-600 transition">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-indigo-600 transition">Careers</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">
              Legal
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li><Link href="/privacy" className="hover:text-indigo-600 transition">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-600 transition">Terms</Link></li>
              <li><Link href="/security" className="hover:text-indigo-600 transition">Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-200 pt-6">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Convert Pro. All rights reserved.
          </p>
          <p className="text-xs text-zinc-500">
            Made with <span className="text-pink-500">♥</span> for speed and privacy.
          </p>
        </div>
      </div>
    </footer>
  );
            }
