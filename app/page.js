"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Film, Music2, Image, FileText, Scissors } from "lucide-react";

const Feature = ({ icon: Icon, title, desc }) => (
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
    <h3 className="mt-4 font-semibold">{title}</h3>
    <p className="mt-1 text-sm text-zinc-600">{desc}</p>
    <div className="mt-4">
      <Link href="/features" className="text-sm text-indigo-600 hover:text-indigo-700">
        Learn more →
      </Link>
    </div>
  </motion.div>
);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.15),transparent_60%)]" />
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
              Convert files <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">blazing fast</span>
            </h1>
            <p className="mt-3 text-zinc-600 max-w-2xl mx-auto">
              Smooth UI, secure processing, pro-grade tools. Free to start. Upgrade for bulk, history & APIs.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Feature icon={Film} title="Video → MP3" desc="Extract clean audio from any video in seconds." />
            <Feature icon={Image} title="Image Converters" desc="PNG, JPG, WebP—convert losslessly & in bulk (Pro)." />
            <Feature icon={FileText} title="PDF Tools" desc="Merge, split, compress PDFs with precision." />
            <Feature icon={Music2} title="Audio Tools" desc="Trim, normalize, and convert between popular formats." />
            <Feature icon={Scissors} title="Clip & Trim" desc="Cut videos to the exact moment with frame accuracy." />
            <Feature icon={Sparkles} title="API Access" desc="Automate conversions with secure API keys (Pro)." />
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-zinc-600">No installs, no learning curve.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-2xl font-semibold">Ready to go Pro?</h3>
              <p className="mt-1 text-white/90">Bulk uploads, history, longer retention & API access for just ₹19/mo.</p>
            </div>
            <Link href="/pricing" className="rounded-xl bg-white text-zinc-900 px-5 py-3 font-medium hover:bg-zinc-50 transition">
              Upgrade Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
    }    </div>
  </section>

  <CTABar />

  <PageFooter />
</div>

); }

