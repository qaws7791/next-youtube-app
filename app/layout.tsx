import type { Metadata } from "next";
import "@/styles/globals.css";
import siteConfig from "@/config/site-config";
import Providers from "@/components/providers";
import { fetchYoutubePlaylists } from "@/lib/google/youtube";
import Footer from "@/components/footer";
import localFont from "next/font/local";
import Header from "@/components/header";

export async function generateMetadata(): Promise<Metadata> {
  const playlists = await fetchYoutubePlaylists(
    process.env.YOUTUBE_PLAYLIST_IDS!.split(",").filter(Boolean)
  );

  const recentlyUpdatedVideo = playlists
    .flatMap((playlist) => playlist.items)
    .sort((a, b) => {
      const aDate = new Date(a.snippet?.publishedAt!);
      const bDate = new Date(b.snippet?.publishedAt!);
      return bDate.getTime() - aDate.getTime();
    })[0];

  const thumbnail =
    recentlyUpdatedVideo.snippet?.thumbnails?.maxres ||
    recentlyUpdatedVideo.snippet?.thumbnails?.high ||
    recentlyUpdatedVideo.snippet?.thumbnails?.medium ||
    recentlyUpdatedVideo.snippet?.thumbnails?.default;

  const title = siteConfig.title || "YouTube Playlist App";
  const description = siteConfig.description || "";
  return {
    title: {
      template: `%s | ${title}`,
      default: siteConfig.titleDefault || title,
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
          url: thumbnail?.url!,
          width: thumbnail?.width!,
          height: thumbnail?.height!,
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
          url: thumbnail?.url!,
          width: thumbnail?.width!,
          height: thumbnail?.height!,
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
          <Header />
          <div className="py-4 md:p-4 flex-1">{children}</div>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
