'use client'

import { useState } from 'react'
import { usePokemonStore } from '@/store/pokemon-store'
import { getOfficialArtwork, cn } from '@/lib/utils'
import { CatchArena } from './CatchArena'
import { toast } from 'sonner'

interface CatchButtonProps {
  pokemonId: number
  pokemonName: string
  types: string[]
}

export default function CatchButton({ pokemonId, pokemonName, types }: CatchButtonProps) {
  const [arenaOpen, setArenaOpen] = useState(false)
  const { addCapturedPokemon, capturedPokemon } = usePokemonStore()

  const alreadyCaught = capturedPokemon.some(p => p.id === pokemonId)

  const handleSave = (nickname: string) => {
    addCapturedPokemon({
      id: pokemonId,
      name: pokemonName,
      nickname,
      types,
      sprite: getOfficialArtwork(pokemonId),
      capturedAt: new Date().toISOString(),
    })
    setArenaOpen(false)
    toast.success(`${nickname} added to your Pokédex!`)
  }

  return (
    <>
      {/* Mobile: fixed bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 px-4 pb-6 pt-4
                      bg-gradient-to-t from-[#F8FAFC] dark:from-slate-900 via-[#F8FAFC]/90 to-transparent z-30">
        <button
          onClick={() => setArenaOpen(true)}
          disabled={alreadyCaught}
          className={cn(
            "w-full h-13 rounded-full font-semibold text-sm",
            "flex items-center justify-center gap-2",
            alreadyCaught
              ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
              : "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark"
          )}
        >
          <img src="/icons/pokeball.svg" alt="" aria-hidden="true" className="w-5 h-5 opacity-90" />
          {alreadyCaught ? 'Already caught!' : 'Throw Poké Ball!'}
        </button>
      </div>

      {/* Desktop: regular button in left column */}
      <div className="hidden lg:block mt-6">
        <button
          onClick={() => setArenaOpen(true)}
          disabled={alreadyCaught}
          className={cn(
            "w-full h-12 rounded-full font-semibold text-sm",
            "flex items-center justify-center gap-2",
            alreadyCaught
              ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
              : "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark"
          )}
        >
          <img src="/icons/pokeball.svg" alt="" aria-hidden="true" className="w-5 h-5 opacity-90" />
          {alreadyCaught ? 'Already caught!' : 'Throw Poké Ball!'}
        </button>
      </div>

      {/* Catch Arena */}
      {arenaOpen && (
        <CatchArena
          isOpen={arenaOpen}
          pokemon={{ id: pokemonId, name: pokemonName, types }}
          onClose={() => setArenaOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  )
}
