import type { Metadata } from "next";
import "@/styles/globals.css";
import siteConfig from "@/config/site-config";
import Providers from "@/components/providers";
import { fetchYouTubePlaylist } from "@/lib/google/youtube";
import Footer from "@/components/footer";
import localFont from "next/font/local";

export async function generateMetadata(): Promise<Metadata> {
  const playlist = await fetchYouTubePlaylist(process.env.YOUTUBE_PLAYLIST_ID!);
  const title =
    siteConfig.title ||
    playlist.items?.[0].snippet?.title ||
    "YouTube Playlist App";
  const description =
    siteConfig.description || playlist.items?.[0].snippet?.description || "";
  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    generator: "Next.js",
    applicationName: title,
    referrer: "origin-when-cross-origin",
    publisher: siteConfig.publisher,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    formatDetection: siteConfig.formatDetection,
    category: siteConfig.category,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: title,
      title,
      description,
      images: [
        {
          url: playlist.items?.[0].snippet?.thumbnails?.maxres?.url!,
          width: playlist.items?.[0].snippet?.thumbnails?.maxres?.width!,
          height: playlist.items?.[0].snippet?.thumbnails?.maxres?.height!,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      creator: "@" + siteConfig.creator,
      images: [
        {
          url: playlist.items?.[0].snippet?.thumbnails?.maxres?.url!,
          width: playlist.items?.[0].snippet?.thumbnails?.maxres?.width!,
          height: playlist.items?.[0].snippet?.thumbnails?.maxres?.height!,
          alt: title,
        },
      ],
    },
  };
}

const SBFont = localFont({
  display: "swap",
  variable: "--font-sb",
  src: [
    {
      path: "./fonts/SBAggroLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/SBAggroMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SBAggroBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="ko" className={SBFont.variable}>
        <body
          className={
            "bg-gradient-to-b from-yellow-500 to-amber-500 text-neutral-50 min-h-screen h-full flex flex-col"
          }
        >
          <div className="py-4 md:p-4 flex-1">{children}</div>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
