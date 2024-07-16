import React from "react";
import siteConfig from "@/config/site-config";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-lg text-white px-4 py-8 text-center h-full my-auto font-bold rounded-t-2xl">
      <p>© {siteConfig.publisher}</p>
      <p>Powered by Next.js, YouTube Data API</p>
    </footer>
  );
}
