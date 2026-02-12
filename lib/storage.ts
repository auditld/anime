// Continue Watching Storage

export interface ContinueWatchingItem {
  animeSlug: string;
  animeTitle: string;
  episodeSlug: string;
  episodeTitle: string;
  thumbnail: string;
  timestamp: number;
  progress?: number;
}

const STORAGE_KEY = "anime_continue_watching";

export const continueWatchingStorage = {
  get(): ContinueWatchingItem[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  add(item: Omit<ContinueWatchingItem, "timestamp">): void {
    if (typeof window === "undefined") return;
    try {
      const items = this.get();
      const existingIndex = items.findIndex(
        (i) => i.animeSlug === item.animeSlug
      );

      const newItem = { ...item, timestamp: Date.now() };

      if (existingIndex >= 0) {
        items[existingIndex] = newItem;
      } else {
        items.unshift(newItem);
      }

      // Keep only the last 20 items
      const limitedItems = items.slice(0, 20);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedItems));
    } catch (error) {
      console.error("Failed to save to continue watching:", error);
    }
  },

  remove(animeSlug: string): void {
    if (typeof window === "undefined") return;
    try {
      const items = this.get().filter((i) => i.animeSlug !== animeSlug);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to remove from continue watching:", error);
    }
  },

  clear(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear continue watching:", error);
    }
  },
};
