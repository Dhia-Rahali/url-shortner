/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createShortUrl = async (originalUrl: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/url/shorten`, {
      url: originalUrl,
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ Error shortening URL:", error.message);
    console.error("❌ Full Error:", error.response?.data || error);
    return null;
  }
};

export const getOriginalUrl = async (shortUrl: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/url/${shortUrl}`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching URL:", error.message);
    console.error("❌ Full Error:", error.response?.data || error);

    return null;
  }
};

export const fetchAllUrls = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/url`);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching URL:", error.message);
    console.error("❌ Full Error:", error.response?.data || error);

    return null;
  }
};
