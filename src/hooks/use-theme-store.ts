import { useStore } from "zustand";

import { themeStore, type ThemeStore } from "@/stores/theme";

function useThemeStore<T>(selector: (state: ThemeStore) => T) {
  return useStore(themeStore, selector);
}

export { useThemeStore };
