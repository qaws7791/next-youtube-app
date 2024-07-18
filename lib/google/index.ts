import { youtube as googleYoutube } from "@googleapis/youtube";

export const youtube = googleYoutube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});
