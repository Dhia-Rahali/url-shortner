"use client";

import { useEffect, useState } from "react";
import RedirectClient from "../../components/RedirectClient";
import { getOriginalUrl } from "../../lib/api";
import Link from "next/link";

export default function RedirectPage({
  params,
}: {
  params: Promise<{ shortUrl: string }>;
}) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      setHasFetched(true);
      loadUrl();
    }
  }, []);

  const loadUrl = async () => {
    try {
      const data = await getOriginalUrl((await params).shortUrl);
      setOriginalUrl(data);
      setLoaded(true);
    } catch (error) {
      console.error("Failed to fetch URLs:", error);
      setLoaded(true);
    }
  };

  if (loaded && !originalUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <div className="max-w-md p-6 bg-white shadow-lg rounded-2xl text-center">
          <h1 className="text-5xl font-bold text-red-500">404</h1>
          <h2 className="text-2xl font-semibold mt-2">URL Not Found</h2>
          <p className="text-gray-600 mt-3">
            The short URL you are looking for does not exist.
          </p>
          <Link href="/">
            <button className="mt-5 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    );
  } else return <RedirectClient originalUrl={originalUrl} />; // Use client-side redirection
}
