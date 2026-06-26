'use client'

import { Badge } from '@/components/ui/badge'
import { usePokemonStore } from '@/store/pokemon-store'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

export default function AppHeader() {
  const caughtCount = usePokemonStore((state) => state.capturedPokemon.length)

  return (
    <header className="
      fixed top-0 left-0 right-0 h-14 z-20
      bg-white dark:bg-slate-900
      border-b border-slate-200 dark:border-slate-700
      shadow-xs transition-colors duration-200
    ">
      <div className="
        h-full flex items-center justify-between
        px-4 md:px-8
        relative overflow-hidden
        max-w-none mx-auto max-w-screen-xl
      ">
        <img
          src="/icons/pokeball.svg"
          alt=""
          aria-hidden="true"
          className="absolute -right-4 -top-4 w-20 h-20 opacity-[0.06] pointer-events-none select-none"
        />
        <h1 className="font-display text-lg font-extrabold text-slate-900 dark:text-slate-100 relative z-10 transition-colors duration-200">
          PokéDex
        </h1>
        <div className="flex items-center gap-2 relative z-10">
          <Badge variant="secondary" className="font-mono font-semibold text-slate-700 dark:text-slate-200">
            {caughtCount} caught
          </Badge>
          <div className="lg:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
