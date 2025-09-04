"use client";

import { motion } from "framer-motion"; import Link from "next/link"; import { Film, Image, FileText, Music2, Scissors, Sparkles, Zap, User, CheckCircle, } from "lucide-react";

// ----- Small reusable components inside one file so you can paste this as app/page.js -----

const FadeIn = ({ children, delay = 0, className = "" }) => ( <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay }} className={className}

> 

{children}

</motion.div> );

function FeatureCard({ Icon, title, desc }) { return ( <motion.div whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(16,24,40,0.08)" }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="group bg-white/70 backdrop-blur rounded-2xl border border-zinc-100 p-6" > <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-md"> <Icon size={18} /> </div> <h3 className="mt-4 font-semibold text-zinc-900">{title}</h3> <p className="mt-2 text-sm text-zinc-600">{desc}</p> <div className="mt-4"> <Link href="/features" className="text-sm text-indigo-600 hover:underline"> Learn more → </Link> </div> </motion.div> ); }

function PricingCard({ plan, price, bullets, featured = false }) { return ( <motion.div layout whileHover={{ scale: featured ? 1.02 : 1.01 }} className={relative rounded-2xl p-6 ${ featured ? "bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white shadow-2xl" : "bg-white/90 border border-zinc-100" }} > {featured && ( <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold">Most popular</div> )}

<h4 className={`text-lg font-semibold ${featured ? "text-white" : "text-zinc-900"}`}>{plan}</h4>
  <p className={`mt-3 text-3xl font-extrabold ${featured ? "text-white" : "text-zinc-900"}`}>{price}</p>
  <ul className={`mt-4 space-y-2 ${featured ? "text-white/90" : "text-zinc-600"}`}>
    {bullets.map((b, i) => (
      <li key={i} className="flex items-start gap-2">
        <CheckCircle size={16} className={featured ? "text-white" : "text-indigo-600"} />
        <span className="text-sm">{b}</span>
      </li>
    ))}
  </ul>

  <div className="mt-6">
    <button
      className={`w-full rounded-xl px-4 py-2 font-semibold transition ${
        featured
          ? "bg-white text-indigo-600 hover:opacity-95"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      {featured ? "Start Pro" : "Start Free"}
    </button>
  </div>
</motion.div>

); }

function CTABar() { return ( <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12" > <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"> <div> <h3 className="text-xl font-semibold">Upgrade to Pro for bulk & API access</h3> <p className="mt-1 text-sm text-white/90">₹19/month — unlimited speed boosts, history, and priority support.</p> </div> <div> <Link href="/pricing" className="rounded-xl bg-white text-indigo-600 px-5 py-2 font-medium"> Get Pro </Link> </div> </div> </motion.section> ); }

function PageFooter() { return ( <footer className="mt-16 border-t border-zinc-100 bg-white/50"> <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row justify-between items-center gap-4"> <div className="text-sm text-zinc-600">© {new Date().getFullYear()} Convert Pro — Built with privacy & speed.</div> <div className="flex items-center gap-4"> <Link href="/privacy" className="text-sm text-zinc-600 hover:text-zinc-900">Privacy</Link> <Link href="/terms" className="text-sm text-zinc-600 hover:text-zinc-900">Terms</Link> <Link href="/contact" className="text-sm text-zinc-600 hover:text-zinc-900">Contact</Link> </div> </div> </footer> ); }

export default function Home() { return ( <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16"> {/* HERO */} <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"> <div> <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-3 bg-white/70 border border-zinc-100 px-3 py-1 rounded-full shadow-sm" > <Sparkles size={14} className="text-indigo-600" /> <span className="text-xs font-medium text-zinc-700">New · Super-fast conversion</span> </motion.div>

<h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
        Convert files <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600">instantly</span>,
        without installs
      </h1>

      <p className="mt-4 text-zinc-600 max-w-xl">Powerful, private, and lightning fast file conversions — video, audio, images, and documents. Try Free or upgrade to Pro for bulk & API access.</p>

      <div className="mt-6 flex gap-3">
        <Link href="/pricing" className="rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-5 py-3 font-semibold shadow-md">
          Get Pro — ₹19/mo
        </Link>
        <Link href="/features" className="rounded-xl border border-zinc-200 px-5 py-3 bg-white/80">
          Explore features
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <Zap size={18} className="text-indigo-600" /> <span>Blazing fast</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <User size={18} className="text-indigo-600" /> <span>Secure accounts</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <CheckCircle size={18} className="text-indigo-600" /> <span>Reliable processing</span>
        </div>
      </div>
    </div>

    {/* HERO IMAGE / Mock UI card */}
    <div className="relative">
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-zinc-100 bg-white/70 backdrop-blur p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Video → MP3</div>
          <div className="text-xs text-zinc-500">Duration: 00:00:12</div>
        </div>

        <div className="mt-4 h-36 bg-gradient-to-br from-zinc-100 to-white rounded-lg flex items-center justify-center text-zinc-400">
          <div className="text-center">
            <div className="text-xl font-semibold">Converted</div>
            <div className="text-sm mt-1">audio-file.mp3</div>
            <div className="mt-3">
              <button className="rounded-full bg-indigo-600 text-white px-4 py-2">Download</button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-zinc-600">
          <div>Size: 2.1 MB</div>
          <div>Processed: 2 sec</div>
        </div>
      </motion.div>
    </div>
  </section>

  {/* FEATURES */}
  <section className="mt-14">
    <FadeIn delay={0.05} className="text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold">All the converters you need</h2>
      <p className="mt-2 text-zinc-600">From video trimming to PDF tools — quick, private, and accurate.</p>
    </FadeIn>

    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <FeatureCard Icon={Film} title="Video → MP3" desc="Extract clean audio from any video in seconds." />
      <FeatureCard Icon={Image} title="Image Converters" desc="PNG, JPG, WebP—convert and compress with quality." />
      <FeatureCard Icon={FileText} title="PDF Tools" desc="Merge, split, compress, and optimize PDFs." />
      <FeatureCard Icon={Music2} title="Audio Tools" desc="Trim, normalize, and convert audio formats." />
      <FeatureCard Icon={Scissors} title="Clip & Trim" desc="Cut video to exact frames with a simple UI." />
      <FeatureCard Icon={Sparkles} title="API Access" desc="Automate conversions with secure API keys (Pro)." />
    </div>
  </section>

  {/* PRICING */}
  <section className="mt-14">
    <FadeIn delay={0.06} className="text-center">
      <h2 className="text-3xl font-semibold">Pricing that just works</h2>
      <p className="mt-2 text-zinc-600">Free plan available — upgrade to Pro for bulk, history & priority processing.</p>
    </FadeIn>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div></div>
      <PricingCard
        plan="Free"
        price="₹0 / month"
        bullets={["Single file conversions", "Limited file size", "Email support"]}
      />
      <PricingCard
        plan="Pro"
        price="₹19 / month"
        bullets={["Bulk uploads & queue", "Extended retention", "API keys & priority support"]}
        featured
      />
    </div>
  </section>

  <CTABar />

  <PageFooter />
</div>

); }

