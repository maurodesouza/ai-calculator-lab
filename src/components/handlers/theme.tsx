"use client";

import { useEffect } from "react";

import { events } from "@events";
import { type ThemeSetPayload } from "@events/handles/theme";
import { Events } from "@types";
import { themeStore } from "@/stores/theme";

type Theme = "light" | "dark";

const STORAGE_KEY = "ai-calculator-lab-theme";

function resolveTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.remove("theme-light", "theme-dark");
  root.classList.add(`theme-${theme}`);
}

function persistTheme(theme: Theme) {
  window.localStorage.setItem(STORAGE_KEY, theme);
}

function ThemeHandler() {
  function onSet(event: CustomEvent<ThemeSetPayload>) {
    const { theme } = event.detail;

    themeStore.getState().set({ theme });
    applyTheme(theme);
    persistTheme(theme);
  }

  function onToggle() {
    const theme = themeStore.getState().theme;
    const nextTheme = theme === "light" ? "dark" : "light";

    themeStore.getState().set({ theme: nextTheme });
    applyTheme(nextTheme);
    persistTheme(nextTheme);
  }

  function onStorageChange(event: StorageEvent) {
    if (event.key !== STORAGE_KEY) return;

    const theme = event.newValue === "dark" ? "dark" : "light";

    themeStore.getState().set({ theme });
    applyTheme(theme);
  }

  function onMediaChange() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return;

    const theme = resolveTheme();

    themeStore.getState().set({ theme });
    applyTheme(theme);
  }

  useEffect(() => {
    const theme = resolveTheme();

    themeStore.getState().set({ theme });
    applyTheme(theme);

    events.on(Events.THEME_SET, onSet);
    events.on(Events.THEME_TOGGLE, onToggle);
    window.addEventListener("storage", onStorageChange);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", onMediaChange);

    return () => {
      events.off(Events.THEME_SET, onSet);
      events.off(Events.THEME_TOGGLE, onToggle);
      window.removeEventListener("storage", onStorageChange);
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", onMediaChange);
    };
  }, []);

  return null;
}

export { ThemeHandler };
