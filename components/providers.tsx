"use client";
import { HistoryStoreProvider, useHistoryManager } from "@/lib/history";

export default function Providers({ children }: { children: React.ReactNode }) {
  const historyManager = useHistoryManager();
  return (
    <HistoryStoreProvider value={historyManager}>
      {children}
    </HistoryStoreProvider>
  );
}
