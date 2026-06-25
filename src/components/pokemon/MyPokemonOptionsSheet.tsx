'use client'

import Image from 'next/image'
import { Pencil, Trash2 } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { capitalize } from '@/lib/utils'
import { TYPE_COLORS } from '@/lib/type-colors'
import { CapturedPokemon } from '@/store/pokemon-store'

export interface MyPokemonOptionsSheetProps {
  pokemon: CapturedPokemon | null
  isOpen: boolean
  onClose: () => void
  onRename: () => void
  onRelease: () => void
}

export default function MyPokemonOptionsSheet({
  pokemon,
  isOpen,
  onClose,
  onRename,
  onRelease,
}: MyPokemonOptionsSheetProps) {
  if (!pokemon) return null

  const firstType = pokemon.types[0]?.toLowerCase() || 'normal'
  const typeColor = TYPE_COLORS[firstType] || '#9CA3AF'
  const bgOpacityHex = typeColor + '1a' // 10% opacity

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-[20px] px-6 pb-8 pt-4 max-w-md mx-auto w-full border-t border-slate-200 shadow-md bg-white focus-visible:outline-none"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Options for {pokemon.nickname}</SheetTitle>
          <SheetDescription>Rename or release your Pokémon</SheetDescription>
        </SheetHeader>

        {/* Small drag handle indicator */}
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />

        {/* Pokémon Details Preview */}
        <div className="flex flex-col items-center text-center mt-2 mb-6">
          <div
            className="w-16 h-16 rounded-[14px] flex items-center justify-center mb-3"
            style={{ backgroundColor: bgOpacityHex }}
          >
            {pokemon.sprite ? (
              <Image
                src={pokemon.sprite}
                alt={pokemon.nickname}
                width={64}
                height={64}
                className="object-contain"
              />
            ) : (
              <div className="w-[64px] h-[64px]" />
            )}
          </div>
          <h2 className="font-display text-lg font-bold text-slate-900">
            {pokemon.nickname}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {capitalize(pokemon.name)}
          </p>
        </div>

        {/* Action Buttons Stacked */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onRename}
            className="w-full h-12 border border-slate-200 rounded-[10px] text-slate-700 font-medium text-sm flex items-center justify-center gap-2 bg-white hover:bg-slate-50 active:scale-[0.99] transition-transform"
          >
            <Pencil size={16} />
            Rename
          </button>
          <button
            type="button"
            onClick={onRelease}
            className="w-full h-12 border border-red-200 rounded-[10px] text-red-600 font-medium text-sm flex items-center justify-center gap-2 bg-white hover:bg-red-50/50 active:scale-[0.99] transition-transform"
          >
            <Trash2 size={16} />
            Release
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
