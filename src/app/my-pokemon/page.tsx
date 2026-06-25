'use client'

import { useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import { Badge } from '@/components/ui/badge'
import { usePokemonStore, CapturedPokemon } from '@/store/pokemon-store'
import MyPokemonCard from '@/components/pokemon/MyPokemonCard'
import MyPokemonEmptyState from '@/components/pokemon/MyPokemonEmptyState'
import MyPokemonOptionsSheet from '@/components/pokemon/MyPokemonOptionsSheet'
import RenameSheet from '@/components/pokemon/RenameSheet'
import ReleaseDialog from '@/components/pokemon/ReleaseDialog'

type SortOption = 'recent' | 'name' | 'type'

export default function MyPokemonPage() {
  const capturedPokemon = usePokemonStore((state) => state.capturedPokemon)
  const [sortBy, setSortBy] = useState<SortOption>('recent')

  // Modal / dialog states
  const [selectedPokemon, setSelectedPokemon] = useState<CapturedPokemon | null>(null)
  const [showOptions, setShowOptions] = useState(false)
  const [showRename, setShowRename] = useState(false)
  const [showRelease, setShowRelease] = useState(false)

  // Sort logic
  const sortedPokemon = [...capturedPokemon].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime()
    }
    if (sortBy === 'name') {
      return a.nickname.localeCompare(b.nickname)
    }
    if (sortBy === 'type') {
      const typeA = a.types[0] || ''
      const typeB = b.types[0] || ''
      return typeA.localeCompare(typeB)
    }
    return 0
  })

  const handleOpenOptions = (pokemon: CapturedPokemon) => {
    setSelectedPokemon(pokemon)
    setShowOptions(true)
  }

  const handleRenameClick = () => {
    setShowOptions(false)
    setTimeout(() => {
      setShowRename(true)
    }, 150)
  }

  const handleReleaseClick = () => {
    setShowOptions(false)
    setTimeout(() => {
      setShowRelease(true)
    }, 150)
  }

  return (
    <PageWrapper className="pb-24">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-5 mt-6">
        <div>
          <h1 className="font-display text-xl lg:text-2xl font-extrabold text-slate-900">My Pokédex</h1>
          <p className="hidden lg:block text-sm text-slate-400 mt-0.5">Your captured collection</p>
        </div>
        <Badge variant="secondary" className="bg-slate-200/60 hover:bg-slate-200/60 text-slate-700 font-semibold px-2.5 py-0.5 lg:px-3 lg:py-1 rounded-full text-xs lg:text-sm border-none">
          {capturedPokemon.length} Pokémon
        </Badge>
      </div>

      {capturedPokemon.length > 0 && (
        <>
          {/* Sort Controls */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Sort:</span>
            {(['recent', 'name', 'type'] as SortOption[]).map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-3.5 py-1 text-xs font-semibold rounded-full capitalize transition-all ${
                  sortBy === option
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mb-8">
            {sortedPokemon.map((pokemon) => (
              <MyPokemonCard
                key={`${pokemon.id}-${pokemon.nickname}`}
                pokemon={pokemon}
                onOptions={handleOpenOptions}
              />
            ))}
          </div>
        </>
      )}

      {capturedPokemon.length === 0 && <MyPokemonEmptyState />}

      {/* Sheets & Dialogs */}
      <MyPokemonOptionsSheet
        pokemon={selectedPokemon}
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
        onRename={handleRenameClick}
        onRelease={handleReleaseClick}
      />

      <RenameSheet
        pokemon={selectedPokemon}
        isOpen={showRename}
        onClose={() => setShowRename(false)}
      />

      <ReleaseDialog
        pokemon={selectedPokemon}
        isOpen={showRelease}
        onClose={() => setShowRelease(false)}
      />
    </PageWrapper>
  )
}
