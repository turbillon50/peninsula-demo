'use client'
import { useEffect } from 'react'
import { useTheme } from '@/lib/theme'
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.body.style.background = theme==='dark'?'#060f08':'#ffffff'
    document.body.style.color = theme==='dark'?'#f0f8f0':'#0a1f0c'
  }, [theme])
  return <>{children}</>
}
