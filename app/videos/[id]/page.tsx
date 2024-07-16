import placeholder from "@/lib/placeholder/playlistitems.json";
// import { Link } from "next-view-transitions";
// import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import BackButton from "@/components/back-button";
import Description from "@/components/description";
import { fetchAllItemsOfPlaylist, fetchVideo } from "@/lib/google/youtube";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const { items } = await fetchAllItemsOfPlaylist(
    process.env.YOUTUBE_PLAYLIST_ID!
  );

  return items.map((item) => ({
    id: item.snippet?.resourceId?.videoId,
  }));
}

function getVideo(id: string) {
  return placeholder.items.find(
    (item) => item.snippet.resourceId.videoId === id
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const video = await fetchVideo(params.id);
  if (!video) {
    return {
      title: "Video not found",
    };
  }
  return {
    title: video.snippet?.title || "Video not found",
    description: video.snippet?.description || "",
  };
}

export default async function VideoPage({ params: { id } }: Props) {
  const video = await fetchVideo(id);

  if (!video || !video.snippet?.thumbnails?.maxres) {
    return <h1>Video not found</h1>;
  }
  const thumbnail = video.snippet.thumbnails.maxres.url!;
  const thumbnailWidth = video.snippet.thumbnails.maxres.width!;
  const thumbnailHeight = video.snippet.thumbnails.maxres.height!;

  if (!video) {
    return <h1>Video not found</h1>;
  }

  return (
    <main className="max-w-screen-xl bg-neutral-950 mx-auto rounded-4xl sm:rounded-6xl transition-all">
      <div className="m-4 sm:m-8 inline-block">
        <BackButton />
        <h1 className="text-2xl sm:text-4xl font-bold my-8">
          {video.snippet.title}
        </h1>
      </div>

      <div className="relative overflow-hidden w-full aspect-video">
        <iframe
          className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
          id="ytplayer"
          src={`https://www.youtube.com/embed/${id}?autoplay=0&origin=http://localhost.com&loop=1`}
        ></iframe>
        <Image
          src={thumbnail}
          alt={video.snippet.title!}
          width={thumbnailWidth}
          height={thumbnailHeight}
          className="absolute inset-0 w-full h-full animate-fadeOut pointer-events-none opacity-0"
          objectFit="contain"
          style={{
            viewTransitionName: "photo-" + id,
          }}
        />
      </div>

      <div className="p-4 sm:p-8 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl font-semibold">Description</h2>
        <Description description={video.snippet.description!} />
      </div>
    </main>
  );
}
