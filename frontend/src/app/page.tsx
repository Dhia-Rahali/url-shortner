/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { createShortUrl, fetchAllUrls } from "../lib/api";
import UrlItem from "../components/UrlItem";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState<{ originalUrl: string; shortUrl: string; clicks: number }[]>([]);
  const [error, setError] = useState<string | null>(null); // 🔹 Error state

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    try {
      const data = await fetchAllUrls();
      setUrls(data);
    } catch (error) {
      console.error("Failed to fetch URLs:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('eeeeee',e)
    e.preventDefault();
    setError(null); 

    if (!originalUrl) {
      setError("URL cannot be empty."); 
      console.log('error',error)
      return;
    }

    try {
      const data = await createShortUrl(originalUrl);

      if (!data || !data.shortUrl) {
        throw new Error("Invalid URL. Please enter a valid website URL.");
      }

      setUrls([...urls, { ...data, clicks: 0 }]);
      setOriginalUrl(""); 
    } catch (e: any) {
      setError(e.message || "An error occurred. Please try again.");
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">URL Shortener</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm text-black"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Shrink
        </button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>

      <div className="w-full max-w-3xl mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">Full URL</th>
              <th className="p-3 text-left">Short URL</th>
              <th className="p-3 text-center">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {urls?.map((url, index) => (
              <UrlItem key={index} originalUrl={url.originalUrl} shortUrl={url.shortUrl} clicks={url.clicks} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
