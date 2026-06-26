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
        className="rounded-t-[20px] px-6 pb-8 pt-4 max-w-md mx-auto w-full border-t border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-900 focus-visible:outline-none transition-colors duration-200"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Options for {pokemon.nickname}</SheetTitle>
          <SheetDescription>Rename or release your Pokémon</SheetDescription>
        </SheetHeader>

        {/* Small drag handle indicator */}
        <div className="w-10 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-4 transition-colors duration-200" />

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
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 transition-colors duration-200">
            {pokemon.nickname}
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5 transition-colors duration-200">
            {capitalize(pokemon.name)}
          </p>
        </div>

        {/* Action Buttons Stacked */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onRename}
            className="w-full h-12 border border-slate-200 dark:border-slate-700 rounded-[10px] text-slate-700 dark:text-slate-200 font-medium text-sm flex items-center justify-center gap-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.99] transition-transform"
          >
            <Pencil size={16} />
            Rename
          </button>
          <button
            type="button"
            onClick={onRelease}
            className="w-full h-12 border border-red-200 dark:border-red-900/50 rounded-[10px] text-red-600 dark:text-red-500 font-medium text-sm flex items-center justify-center gap-2 bg-white dark:bg-slate-900 hover:bg-red-50/50 dark:hover:bg-red-950/30 active:scale-[0.99] transition-all duration-200"
          >
            <Trash2 size={16} />
            Release
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
