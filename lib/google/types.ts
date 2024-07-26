import { youtube_v3 } from "@googleapis/youtube";

export type PlayListItem = youtube_v3.Schema$PlaylistItem;

export type Playlist = youtube_v3.Schema$Playlist;

export type PlaylistWithItems = Playlist & { items: PlayListItem[] };
