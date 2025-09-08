// app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Convert Pro – Fast & Smooth File Tools",
  description: "Modern, fast, secure file converters with free & pro plans.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-b from-zinc-50 to-white text-zinc-900 antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 hero-pad">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
