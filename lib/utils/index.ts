import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export interface TextPart {
  type: "string" | "url";
  text: string;
}

export function splitTextAndUrls(text: string): TextPart[] {
  const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/g;
  const parts: TextPart[] = [];
  let lastIndex = 0;

  // 정규 표현식으로 URL을 찾음
  const matches = text.matchAll(urlPattern);

  for (const match of matches) {
    const url = match[0];
    const index = match.index!;

    // 이전 문자열 부분 추가
    if (index > lastIndex) {
      parts.push({
        type: "string",
        text: text.slice(lastIndex, index),
      });
    }
    // URL 부분 추가
    parts.push({
      type: "url",
      text: url,
    });
    lastIndex = index + url.length;
  }

  // 마지막 남은 문자열 부분 추가
  if (lastIndex < text.length) {
    parts.push({
      type: "string",
      text: text.slice(lastIndex),
    });
  }

  return parts;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
