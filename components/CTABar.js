"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTABar() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-4 inset-x-4 z-50"
    >
      <div className="backdrop-blur-xl bg-white/70 border border-zinc-200 shadow-xl rounded-2xl px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-zinc-800">
            Unlock Premium Features
          </h4>
          <p className="text-xs text-zinc-600">
            Bulk conversions, file history & APIs – only ₹19/mo 🚀
          </p>
        </div>
        <Link
          href="/pricing"
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-4 py-2 text-sm font-medium shadow hover:shadow-lg transition-all"
        >
          Upgrade
        </Link>
      </div>
    </motion.div>
  );
}
