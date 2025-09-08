// components/DownloadButton.jsx

"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const DownloadButton = ({ downloadUrl, filename = "file", children }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Download failed");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.button
      onClick={handleDownload}
      disabled={downloading || !downloadUrl}
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Download className="h-4 w-4" />
      {downloading ? "Downloading..." : children || "Download"}
    </motion.button>
  );
};

export default DownloadButton;
