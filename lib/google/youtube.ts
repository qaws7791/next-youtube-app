import { youtube } from "@/lib/google";

export const fetchYouTubePlaylist = async (playlistId: string) => {
  const res = await youtube.playlists.list({
    id: [process.env.YOUTUBE_PLAYLIST_ID!],
    part: ["contentDetails", "id", "snippet", "status"],
  });
  return res.data;
};

export const fetchAllItemsOfPlaylist = async (playlistId: string) => {
  console.log("Fetching all items of playlist", playlistId);
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
};

export const fetchVideo = async (videoId: string) => {
  const res = await youtube.videos.list({
    id: [videoId],
    part: ["contentDetails", "id", "snippet", "status"],
  });
  return res.data.items?.[0];
};
