"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Film,
  Music2,
  Image,
  FileText,
  Scissors,
  Search,
} from "lucide-react";
import FileUploader from "@/components/FileUploader";
import { useState } from "react";

const converters = [
  { key: "video-to-mp3", title: "Video → MP3", icon: Film, desc: "Extract audio from any video in seconds." },
  { key: "image-convert", title: "Image Converters", icon: Image, desc: "PNG, JPG, WebP—convert losslessly & in bulk (Pro)." },
  { key: "pdf-tools", title: "PDF Tools", icon: FileText, desc: "Merge, split, compress PDFs with precision." },
  { key: "audio-tools", title: "Audio Tools", icon: Music2, desc: "Trim, normalize, and convert between popular formats." },
  { key: "clip-trim", title: "Clip & Trim", icon: Scissors, desc: "Cut videos to the exact moment with frame accuracy." },
  { key: "api-access", title: "API Access", icon: Sparkles, desc: "Automate conversions with secure API keys (Pro)." },
];

const Feature = ({ icon: Icon, title, desc, slug, onOpen }) => (
  <motion.div
    initial={{ y: 14, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.35 }}
    viewport={{ once: true }}
    className="group rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-xl p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all"
  >
    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center shadow-sm">
      <Icon size={18} />
    </div>
    <h3 className="mt-4 font-semibold text-zinc-900">{title}</h3>
    <p className="mt-1 text-sm text-zinc-600">{desc}</p>
    <div className="mt-4 flex justify-between items-center">
      <Link
        href={`/convert/${slug}`}
        className="text-sm text-indigo-600 hover:text-indigo-700"
      >
        Open →
      </Link>
      <button
        onClick={() => onOpen(slug)}
        className="text-sm text-zinc-500 hover:text-zinc-700"
      >
        Quick convert
      </button>
    </div>
  </motion.div>
);

export default function Home() {
  const [search, setSearch] = useState("");
  const [modalSlug, setModalSlug] = useState(null);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.10),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/70 border border-zinc-200 px-3 py-1 rounded-full text-zinc-700 shadow-sm">
              <Sparkles size={14} /> New: Super-fast conversions
            </span>

            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
              Convert files{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
                blazing fast
              </span>
            </h1>
            <p className="mt-3 text-zinc-600 max-w-2xl mx-auto">
              Smooth UI, secure processing, pro-grade tools. Free to start.
              Upgrade for bulk, history & APIs.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/pricing"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-5 py-3 font-medium shadow-lg hover:shadow-xl transition-all"
              >
                See Plans
              </Link>
              <Link
                href="/features"
                className="rounded-xl border border-zinc-300 bg-white/70 backdrop-blur px-5 py-3 font-medium hover:bg-white transition-all"
              >
                Explore Features
              </Link>
              <Link
                href="/auth"
                className="rounded-xl border border-indigo-500 text-indigo-600 bg-white px-5 py-3 font-medium hover:bg-indigo-50 transition-all"
              >
                Login / Signup
              </Link>
            </div>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto flex items-center gap-2 bg-white rounded-full shadow-sm p-1">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search converters, e.g. "Video to MP3"'
                className="flex-1 px-4 py-3 rounded-full focus:outline-none"
              />
              <button className="px-4 py-2 rounded-full bg-indigo-600 text-white">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Converters Grid */}
      <section className="py-16 bg-gradient-to-b from-white to-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-zinc-900">
              Popular Converters
            </h2>
            <p className="mt-2 text-zinc-600">
              Choose from our most-used conversion tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {converters
              .filter(converter => 
                search === "" || 
                converter.title.toLowerCase().includes(search.toLowerCase()) ||
                converter.desc.toLowerCase().includes(search.toLowerCase())
              )
              .map((converter) => (
                <Feature
                  key={converter.key}
                  icon={converter.icon}
                  title={converter.title}
                  desc={converter.desc}
                  slug={converter.key}
                  onOpen={setModalSlug}
                />
              ))}
          </div>

          {/* No results message */}
          {search && converters.filter(converter => 
            converter.title.toLowerCase().includes(search.toLowerCase()) ||
            converter.desc.toLowerCase().includes(search.toLowerCase())
          ).length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search size={48} className="mx-auto text-zinc-400 mb-4" />
              <h3 className="text-lg font-medium text-zinc-900 mb-2">
                No converters found
              </h3>
              <p className="text-zinc-600">
                Try searching for "video", "image", "audio", or "pdf"
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Quick Upload Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-zinc-900">
              Quick Convert
            </h2>
            <p className="mt-2 text-zinc-600">
              Drop your files here for instant conversion
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <FileUploader />
          </div>
        </div>
      </section>

      {/* Modal for quick convert */}
      {modalSlug && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                Quick Convert - {converters.find(c => c.key === modalSlug)?.title}
              </h3>
              <button
                onClick={() => setModalSlug(null)}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            
            <FileUploader converterType={modalSlug} />
          </motion.div>
        </div>
      )}
    </>
  );
}
