import HeroSection from "@/app/hero-section";
import VideosList from "@/components/videos-list";
import { fetchAllItemsOfPlaylist } from "@/lib/google/youtube";

export default async function Home() {
  const data = await fetchAllItemsOfPlaylist(process.env.YOUTUBE_PLAYLIST_ID!);
  return (
    <main className="max-w-screen-xl bg-neutral-950 mx-auto rounded-3xl sm:rounded-6xl transition-all p-4 md:p-8">
      <HeroSection />
      <VideosList videos={data.items} />
    </main>
  );
}
