import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Convert Pro",
  description: "Convert files easily and smoothly - Free & Pro Plans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="min-h-screen">{children}</main>

        {/* Bottom Footer */}
        <Footer />
      </body>
    </html>
  );
}
