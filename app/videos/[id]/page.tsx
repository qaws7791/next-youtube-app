import Image from "next/image";
import { Metadata } from "next";
import BackButton from "@/components/back-button";
import { fetchVideo, fetchYoutubePlaylists } from "@/lib/google/youtube";
import Details from "@/components/details";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const playlists = await fetchYoutubePlaylists(
    process.env.YOUTUBE_PLAYLIST_IDS!.split(",").filter(Boolean)
  );

  return playlists
    .flatMap((playlist) => playlist.items)
    .map((item) => ({
      id: item.snippet?.resourceId?.videoId,
    }));
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

  if (!video || !video.snippet) {
    return <h1>Video(Id:{id}) not found</h1>;
  }
  const thumbnail =
    video.snippet.thumbnails?.maxres ||
    video.snippet.thumbnails?.standard ||
    video.snippet.thumbnails?.high ||
    video.snippet.thumbnails?.medium ||
    video.snippet.thumbnails?.default;
  const thumbnailWidth = thumbnail?.width;
  const thumbnailHeight = thumbnail?.height;

  if (!thumbnailWidth || !thumbnailHeight) {
    return <h1>Video(Id:{id}) not found</h1>;
  }

  return (
    <main className="max-w-screen-xl bg-neutral-950 mx-auto rounded-3xl sm:rounded-6xl transition-all py-4">
      <div className="m-4 sm:m-8 inline-block">
        <BackButton />
        <h1 className="text-2xl sm:text-4xl font-bold my-8" id="video-title">
          {video.snippet.title}
        </h1>
        <p className="text-lg sm:text-xl font-medium" id="video-channel">
          by {video.snippet.channelTitle}
        </p>
      </div>

      <div className="relative overflow-hidden w-full aspect-video">
        <iframe
          className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
          id="ytplayer"
          src={`https://www.youtube.com/embed/${id}?autoplay=0&origin=http://localhost.com&loop=1`}
        ></iframe>
        <Image
          id="thumbnail"
          src={thumbnail?.url!}
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

      <div className="p-4 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-medium" id="video-description">
          Description
        </h2>
        <Details
          description={video.snippet.description!}
          publishedAt={video.snippet.publishedAt!}
        />
      </div>

      <div className="px-4 pb-4 sm:px-8 sm:pb-8">
        <h2 className="text-xl sm:text-2xl font-medium" id="video-tags">
          Tags
        </h2>
        <div className="mt-4">
          {video.snippet.tags?.map((tag, index) => (
            <a
              key={index}
              className="inline-block m-1 font-bold px-3 py-1 border border-neutral-600 rounded-lg hover:bg-neutral-50/10 focus:bg-neutral-600/10"
              href={`https://www.youtube.com/results?search_query=${tag}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Search ${tag}`}
            >
              #{tag}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
