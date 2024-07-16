"use client";
import Fuse from "fuse.js";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PlayListItem } from "@/lib/google/types";
import { cn } from "@/lib/utils";

export default function VideosList({ videos }: { videos: PlayListItem[] }) {
  const [search, setSearch] = useState("");
  const fuseRef = useRef(
    new Fuse(videos, {
      keys: ["snippet.title"],
    })
  );

  const items = useMemo(
    () =>
      search
        ? fuseRef.current.search(search).map((result) => result.item)
        : videos,
    [search, videos]
  );

  return (
    <>
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
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-20 min-h-[30vh] gap-4 md:gap-8">
        {items.map((item) => {
          const src = item.snippet?.thumbnails?.maxres?.url;
          const alt = item.snippet?.title;
          const width = item.snippet?.thumbnails?.maxres?.width;
          const height = item.snippet?.thumbnails?.maxres?.height;
          const videoId = item.snippet?.resourceId?.videoId;
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
                className="rounded-3xl"
                style={{
                  contain: "layout",
                  viewTransitionName: "photo-" + videoId,
                }}
              />
              <div className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 backdrop-blur-sm absolute bottom-0 left-0 right-0 top-0 transition-all bg-transparent group-hover:bg-black/50 group-focus-visible:bg-black/50 p-4">
                <h2 className="text-neutral-100 text-xl font-semibold md:text-3xl lg:5xl line-clamp-4">
                  {item.snippet?.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </ul>
    </>
  );
}
