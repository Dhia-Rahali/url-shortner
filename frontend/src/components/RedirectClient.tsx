"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function RedirectClient({
  originalUrl,
}: {
  originalUrl: string;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = originalUrl;
    }, 1000);

    return () => clearTimeout(timer);
  }, [originalUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-700">Redirecting...</h2>
        <p className="text-gray-500 mt-2">
          Please wait while we take you to your destination.
        </p>
        <div className="mt-4 w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
      </motion.div>
    </div>
  );
}
