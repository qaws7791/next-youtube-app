import { youtube } from "@/lib/google";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const fetchYouTubePlaylist = cache(async (playlistId: string) => {
  const res = await youtube.playlists.list({
    id: [playlistId],
    part: ["contentDetails", "id", "snippet", "status"],
  });
  return res.data;
});

export const fetchAllItemsOfPlaylist = cache(async (playlistId: string) => {
  console.log("Fetching all items of playlist: ", playlistId);
  let nextPageToken: string = "";
  const items = [];
  do {
    const res = await youtube.playlistItems.list({
      pageToken: nextPageToken,
      part: ["snippet"],
      playlistId,
      maxResults: 50,
    });
    if (!res.data.items) break;
    items.push(...res.data.items);
    nextPageToken = res.data.nextPageToken || "";
  } while (nextPageToken);

  return {
    items,
    pageInfo: {
      totalResults: items.length,
    },
  };
});

export const fetchYoutubeVideo = cache(async (videoId: string) => {
  console.log(`Fetching video: ${videoId}`);
  const res = await youtube.videos.list({
    id: [videoId],
    part: ["contentDetails", "id", "snippet", "status"],
  });
  return res.data.items?.[0];
});

export const fetchYoutubePlaylists = unstable_cache(
  async (playlistIds: string[]) => {
    console.log(`Fetching ${playlistIds.length} playlists`);
    const playlists = await youtube.playlists.list({
      id: playlistIds,
      part: ["contentDetails", "id", "snippet", "status"],
      maxResults: 50,
    });

    if (!playlists.data.items) throw new Error("No playlists found");

    const itemsFetchPromises = playlists.data.items.map((playlist) => {
      return fetchAllItemsOfPlaylist(playlist.id!);
    });

    const items = await Promise.all(itemsFetchPromises);
    return playlists.data.items.map((playlist, index) => {
      return {
        ...playlist,
        items: items[index].items,
      };
    });
  },
  ["fetchYoutubePlaylists"]
);
