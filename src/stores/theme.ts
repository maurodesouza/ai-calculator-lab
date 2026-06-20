import { createStore } from 'zustand'

type Theme = 'light' | 'dark'

type ThemeStore = {
  theme: Theme
  set: (state: Partial<{ theme: Theme }>) => void
  toggle: () => void
}

const initialState: { theme: Theme } = {
  theme: 'light',
}

const themeStore = createStore<ThemeStore>((set, get) => ({
  ...initialState,
  set: (state) => set(state),
  toggle: () => {
    const nextTheme = get().theme === 'light' ? 'dark' : 'light'
    set({ theme: nextTheme })
  },
}))

export { themeStore }
export type { Theme, ThemeStore }
