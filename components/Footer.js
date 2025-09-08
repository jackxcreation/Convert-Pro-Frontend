// components/Footer.js
import { Facebook, Twitter, Youtube, Github } from "lucide-react";
import Link from "next/link";

const Social = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="p-2 rounded-xl hover:bg-white/60 transition"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-200 bg-gradient-to-b from-white to-zinc-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-zinc-900 font-semibold">Convert Pro</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Fast, secure & modern converters. Built for creators and teams.
            </p>
            <div className="mt-4 flex items-center gap-2 text-zinc-500">
              <Social href="#"><Twitter size={18} /></Social>
              <Social href="#"><Facebook size={18} /></Social>
              <Social href="#"><Youtube size={18} /></Social>
              <Social href="https://github.com/jackxcreation/"><Github size={18} /></Social>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li><Link href="/features" className="hover:text-zinc-900">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-zinc-900">Pricing</Link></li>
              <li><Link href="/roadmap" className="hover:text-zinc-900">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li><Link href="/about" className="hover:text-zinc-900">About</Link></li>
              <li><Link href="/contact" className="hover:text-zinc-900">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-zinc-900">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li><Link href="/privacy" className="hover:text-zinc-900">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-zinc-900">Terms</Link></li>
              <li><Link href="/security" className="hover:text-zinc-900">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Convert Pro. All rights reserved.</p>
          <p className="text-xs text-zinc-500">Made with ♥ for speed and privacy.</p>
        </div>
      </div>
    </footer>
  );
    }
