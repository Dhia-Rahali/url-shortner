"use client";

import React from "react";
import Link from "next/link";

interface Props {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
}

const UrlItem: React.FC<Props> = ({ originalUrl, shortUrl, clicks }) => {
  return (
    <tr className="border-b hover:bg-gray-100 transition">
      <td className="p-3">
        <a href={originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {originalUrl}
        </a>
      </td>
      <td className="p-3">
        <Link href={`/${shortUrl}`} className="text-blue-600 hover:underline">
          {/* {shortUrl} */}
          {window.location.origin}/{shortUrl}
        </Link>
      </td>
      <td className="p-3 text-center">
        <span className="bg-gray-300 px-3 py-1 rounded-lg text-gray-700">{clicks??0}</span>
      </td>
    </tr>
  );
};

export default UrlItem;
