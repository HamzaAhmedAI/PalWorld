// SSR-safe localStorage helpers for the user's "Palbox" (owned Pals).
// All functions no-op safely on the server or in private-mode browsers.

const STORAGE_KEY = "palbreed:owned";

/** Read the stored set of owned Pal ids. Returns [] on the server. */
export function readOwned(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

/** Persist the owned id list. No-op on the server. */
export function writeOwned(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore quota / private-mode errors
  }
}

/** Remove the stored set entirely. No-op on the server. */
export function clearOwnedStorage(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
