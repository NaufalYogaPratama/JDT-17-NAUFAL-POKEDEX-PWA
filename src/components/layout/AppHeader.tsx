'use client'

import { Badge } from '@/components/ui/badge'
import { usePokemonStore } from '@/store/pokemon-store'

export default function AppHeader() {
  const caughtCount = usePokemonStore((state) => state.capturedPokemon.length)

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-14 bg-white border-b border-slate-200 shadow-xs z-20 flex items-center justify-between px-4">
      <h1 className="font-display text-lg font-extrabold text-slate-900">
        PokéDex
      </h1>
      <Badge variant="secondary" className="font-mono font-semibold text-slate-700">
        {caughtCount} caught
      </Badge>
    </header>
  )
}
