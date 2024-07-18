"use client";
import { cn, formatKoreaDateTime, splitTextAndUrls } from "@/lib/utils";
import { useState } from "react";

function parseDescription(description: string) {
  return description.split("\n").map((s) => {
    return splitTextAndUrls(s);
  });
}

export default function Details({
  description,
  publishedAt,
}: {
  description: string;
  publishedAt: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("mt-4 p-4 bg-neutral-900 rounded-2xl overflow-auto")}>
      <p className="text-sm text-neutral-500 font-semibold">
        {formatKoreaDateTime(publishedAt)}
      </p>
      <div className={cn(open ? "line-clamp-none" : "line-clamp-2")}>
        {parseDescription(description).map((line, index) => (
          <p key={index}>
            {line.map((part, index) => {
              if (part.type === "string") {
                return <span key={index}>{part.text}</span>;
              } else {
                return (
                  <a
                    key={index}
                    href={part.text}
                    target="_blank"
                    rel="noreferrer"
                    className="text-yellow-600 font-semibold underline"
                  >
                    {part.text}
                  </a>
                );
              }
            })}
          </p>
        ))}
      </div>
      <button
        className="text-yellow-600 font-semibold"
        onClick={() => setOpen(!open)}
        aria-label="Toggle description"
        title="Toggle description"
      >
        {open ? "Close" : "Read more"}
      </button>
    </div>
  );
}
