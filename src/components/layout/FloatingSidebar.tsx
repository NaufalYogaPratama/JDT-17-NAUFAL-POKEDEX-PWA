'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Heart, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function FloatingSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const navItems = [
    { href: '/', icon: <Home size={20} />, label: 'Home' },
    { href: '/my-pokemon', icon: <Heart size={20} />, label: 'My Pokémon' },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <aside
      className="
        group
        hidden lg:flex
        fixed left-4 top-1/2 -translate-y-1/2
        z-30
        flex-col
        w-14 hover:w-52
        overflow-hidden
        rounded-2xl
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
        shadow-md dark:shadow-slate-900/50
        transition-[width] duration-300 ease-in-out
        py-3 gap-1
      "
    >
      {/* Nav Items */}
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-label={item.label}
          aria-current={isActive(item.href) ? 'page' : undefined}
          className={cn(
            'flex items-center gap-3',
            'h-11 px-3',
            'rounded-[10px] mx-1.5',
            'transition-colors duration-150',
            'whitespace-nowrap',
            isActive(item.href)
              ? 'bg-primary/10 text-primary'
              : 'text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300'
          )}
        >
          {/* Icon — fixed width so it doesn't shift on expand */}
          <span className="flex-shrink-0 w-5 flex items-center justify-center">
            {item.icon}
          </span>

          {/* Label — hidden until sidebar expands */}
          <span className="
            text-sm font-medium
            opacity-0 group-hover:opacity-100
            transition-opacity duration-150 delay-150
            overflow-hidden whitespace-nowrap
          ">
            {item.label}
          </span>
        </Link>
      ))}

      {/* Divider */}
      <div className="mx-3 my-1 border-t border-slate-100 dark:border-slate-800" />

      {/* Theme Toggle */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="
            flex items-center gap-3
            h-11 px-3
            rounded-[10px] mx-1.5
            text-slate-400 dark:text-slate-500
            hover:bg-slate-100 dark:hover:bg-slate-800
            hover:text-slate-700 dark:hover:text-slate-300
            transition-colors duration-150
            whitespace-nowrap
          "
        >
          <span className="flex-shrink-0 w-5 flex items-center justify-center">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </span>
          <span className="
            text-sm font-medium
            opacity-0 group-hover:opacity-100
            transition-opacity duration-150 delay-150
            overflow-hidden whitespace-nowrap
          ">
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </span>
        </button>
      )}
    </aside>
  )
}
