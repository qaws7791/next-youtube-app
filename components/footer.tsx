import React from "react";
import siteConfig from "@/config/site-config";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-lg text-white px-4 py-8 text-center h-full my-auto font-bold rounded-t-2xl">
      {siteConfig.publisher && <p>ⓒ {siteConfig.publisher}</p>}
      {siteConfig.email && (
        <p>
          Email: <a href="mailto:{siteConfig.email}">{siteConfig.email}</a>
        </p>
      )}
    </footer>
  );
}
