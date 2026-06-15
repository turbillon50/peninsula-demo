'use client'
import { create } from 'zustand'
type Theme = 'dark'|'light'
interface ThemeStore { theme: Theme; toggle: () => void }
export const useTheme = create<ThemeStore>((set,get) => ({
  theme: 'dark',
  toggle: () => {
    const next = get().theme==='dark'?'light':'dark'
    set({theme:next})
    document.documentElement.setAttribute('data-theme',next)
    document.body.style.background = next==='dark'?'#060f08':'#ffffff'
  },
}))
