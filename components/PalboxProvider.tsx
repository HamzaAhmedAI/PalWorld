"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  clearOwnedStorage,
  readOwned,
  writeOwned,
} from "@/lib/palbox";

interface PalboxContextValue {
  owned: Set<string>;
  isOwned: (id: string) => boolean;
  toggleOwned: (id: string) => void;
  clearOwned: () => void;
}

const PalboxContext = createContext<PalboxContextValue | null>(null);

export function PalboxProvider({ children }: { children: ReactNode }) {
  const [owned, setOwned] = useState<Set<string>>(new Set());

  // Hydrate from localStorage after mount (SSR-safe: starts empty on the server).
  useEffect(() => {
    setOwned(new Set(readOwned()));
  }, []);

  const toggleOwned = useCallback((id: string) => {
    setOwned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      writeOwned(Array.from(next));
      return next;
    });
  }, []);

  const clearOwned = useCallback(() => {
    setOwned(new Set());
    clearOwnedStorage();
  }, []);

  const isOwned = useCallback((id: string) => owned.has(id), [owned]);

  return (
    <PalboxContext.Provider value={{ owned, isOwned, toggleOwned, clearOwned }}>
      {children}
    </PalboxContext.Provider>
  );
}

export function usePalbox(): PalboxContextValue {
  const ctx = useContext(PalboxContext);
  if (!ctx) {
    throw new Error("usePalbox must be used within a PalboxProvider");
  }
  return ctx;
}
