import HeroSection from "@/app/hero-section";
import Playlists from "@/components/playlists";
import { fetchYoutubePlaylists } from "@/lib/google/youtube";
import { Suspense } from "react";

export default async function Home() {
  const playlists = await fetchYoutubePlaylists(
    process.env.YOUTUBE_PLAYLIST_IDS!.split(",").filter(Boolean)
  );
  return (
    <main className="max-w-screen-2xl bg-neutral-950 mx-auto rounded-3xl sm:rounded-6xl transition-all p-4 md:p-8">
      <HeroSection />
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <Playlists playlists={playlists} />
      </Suspense>
    </main>
  );
}
