'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="
        w-9 h-9 rounded-full flex items-center justify-center
        text-slate-500 hover:text-slate-900
        dark:text-slate-400 dark:hover:text-slate-100
        hover:bg-slate-100 dark:hover:bg-slate-800
        transition-colors duration-150
      "
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark'
        ? <Sun size={18} />
        : <Moon size={18} />
      }
    </button>
  )
}
