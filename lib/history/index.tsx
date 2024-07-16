import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type HistoryStore = {
  history: string[];
  canGoBack: () => boolean;
};

const historyStoreContext = createContext<HistoryStore | null>(null);

export function HistoryStoreProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: HistoryStore;
}) {
  return (
    <historyStoreContext.Provider value={value}>
      {children}
    </historyStoreContext.Provider>
  );
}

export const useHistory = () => {
  const context = useContext(historyStoreContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryStoreProvider");
  }
  return context;
};

export function useHistoryManager() {
  const pathname = usePathname();
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory((prev) => {
      if (prev[prev.length - 1] === pathname) return prev;
      return [...prev, pathname];
    });
  }, [pathname]);

  return { history, canGoBack: () => history.length > 1 };
}
