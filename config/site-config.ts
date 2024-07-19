import { Metadata } from "next";

type SiteConfig = Readonly<{
  title: string;
  titleDefault?: string;
  description: string;
  email?: string;
}> &
  Metadata;

const siteConfig: SiteConfig = {
  title: "졔모니아",
  titleDefault: "졔모니아 - 이지혜의 노래와 영상",
  description: "뮤지컬 배우 이지혜의 노래와 영상을 감상하세요.",
  publisher: "jjaemonia",
  keywords: ["졔모니아", "지혜", "뮤지컬", "오페라", "음악"],
  authors: [{ name: "jjaemonia", url: "jjaemonia.pages.dev" }],
  creator: "jjaemonia",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  category: "Entertainment",
  email: "jjaemonia@gmail.com",
} as const;

export default siteConfig;
