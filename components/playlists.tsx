"use client";
import Fuse from "fuse.js";
import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { PlaylistWithItems } from "@/lib/google/types";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function Playlists({
  playlists,
}: {
  playlists: PlaylistWithItems[];
}) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const allVideos = useMemo(
    () => playlists.flatMap((playlist) => playlist.items),
    [playlists]
  );

  const selectedPlaylistId = useMemo(() => {
    const playlistId = searchParams.get("playlistId");
    if (!playlistId) return undefined;
    return playlists.find((playlist) => playlist.id === playlistId)?.id;
  }, [searchParams, playlists]);

  const fuse = useMemo(() => {
    const data = selectedPlaylistId
      ? playlists.find((playlist) => playlist.id === selectedPlaylistId)
          ?.items || allVideos
      : allVideos;

    return new Fuse(data, {
      keys: ["snippet.title"],
    });
  }, [selectedPlaylistId, allVideos, playlists]);

  const visibleItems = useMemo(() => {
    if (search) return fuse.search(search).map((result) => result.item);
    const selectedPlaylist = playlists.find(
      (playlist) => playlist.id === selectedPlaylistId
    );
    return selectedPlaylist?.items || allVideos;
  }, [search, fuse, selectedPlaylistId, allVideos, playlists]);

  return (
    <>
      {/* search input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-3xl bg-neutral-900 text-neutral-100 indent-2"
        />
        <button
          onClick={() => setSearch("")}
          className={cn(
            "text-neutral-100 absolute right-3 top-2  hover:bg-neutral-50/10 focus:bg-neutral-600/10 transition-all p-2 rounded-xl",
            search ? "block" : "hidden"
          )}
          aria-label="Clear Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
          </svg>
        </button>
      </div>
      {/* playlist tabs */}
      <div className="flex justify-center gap-4 mt-8 flex-wrap">
        <PlaylistTab
          playlistId=""
          playlistTitle="전체"
          isActive={!selectedPlaylistId}
        />
        {playlists.map((playlist) => {
          const isActive = playlist.id === selectedPlaylistId;
          return (
            <PlaylistTab
              key={playlist.id}
              playlistId={playlist.id!}
              playlistTitle={playlist.snippet?.title || ""}
              isActive={isActive}
            />
          );
        })}
      </div>
      {/* playlist items */}
      <div className="mt-20 min-h-[30vh]">
        {visibleItems.length === 0 ? (
          search ? (
            <p className="text-center text-neutral-100">
              &apos;{search}&apos;에 대한 검색 결과가 없습니다.
            </p>
          ) : (
            <p className="text-center text-neutral-100">동영상이 없습니다.</p>
          )
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4 md:gap-8">
            {visibleItems.map((item) => {
              const alt = item.snippet?.title;
              const videoId = item.snippet?.resourceId?.videoId;
              const thumbnail =
                item.snippet?.thumbnails?.maxres ||
                item.snippet?.thumbnails?.high ||
                item.snippet?.thumbnails?.medium ||
                item.snippet?.thumbnails?.default;
              const src = thumbnail?.url;
              const width = thumbnail?.width;
              const height = thumbnail?.height;
              if (!src || !alt || !width || !height || !videoId) return null;
              return (
                <Link
                  key={videoId}
                  href={`/videos/${videoId}`}
                  className="relative group rounded-3xl overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className="rounded-3xl w-full object-cover aspect-video"
                    style={{
                      contain: "layout",
                      viewTransitionName: "photo-" + videoId,
                    }}
                  />
                  <div className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 backdrop-blur-sm absolute bottom-0 left-0 right-0 top-0 transition-all bg-transparent group-hover:bg-black/50 group-focus-visible:bg-black/50 p-4">
                    <h2 className="text-neutral-100 text-xl font-medium md:text-2xl lg:5xl line-clamp-4">
                      {item.snippet?.title}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export function PlaylistTab({
  playlistId,
  playlistTitle,
  isActive,
}: {
  playlistId: string;
  playlistTitle: string;
  isActive: boolean;
}) {
  return (
    <Link
      prefetch={false}
      href={`/?playlistId=${playlistId}`}
      className={cn(
        "px-4 py-3 rounded-3xl transition-all",
        isActive
          ? "bg-yellow-600 text-neutral-100"
          : "bg-neutral-900 text-neutral-100 hover:bg-primary-500/50"
      )}
    >
      {playlistTitle}
    </Link>
  );
}
