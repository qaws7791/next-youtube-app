"use client";
import { HistoryStoreProvider, useHistoryManager } from "@/lib/history";
import { ViewTransitions } from "next-view-transitions";

export default function Providers({ children }: { children: React.ReactNode }) {
  const historyManager = useHistoryManager();
  return (
    // <ViewTransitions>
    <HistoryStoreProvider value={historyManager}>
      {children}
    </HistoryStoreProvider>
    // </ViewTransitions>
  );
}
