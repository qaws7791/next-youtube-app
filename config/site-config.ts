import { Metadata } from "next";

type SiteConfig = Readonly<{
  title: string;
  description: string;
}> &
  Metadata;

const siteConfig: SiteConfig = {
  title: "YouTube K-POP Top 100",
  description:
    "YouTube에서 이번 주 가장 인기 있는 K-POP 뮤직 비디오를 확인하세요.",
  publisher: "qaws7791",
  keywords: ["YouTube", "K-POP", "Music", "Video"],
  authors: [{ name: "qaws7791", url: "https://github.com/qaws7791" }],
  creator: "qaws7791",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Entertainment",
} as const;

export default siteConfig;
