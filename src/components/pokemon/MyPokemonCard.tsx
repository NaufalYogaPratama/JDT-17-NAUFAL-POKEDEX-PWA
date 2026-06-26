'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MoreHorizontal } from 'lucide-react'
import TypeBadge from './TypeBadge'
import { TYPE_COLORS } from '@/lib/type-colors'
import { capitalize, timeAgo } from '@/lib/utils'
import { CapturedPokemon } from '@/store/pokemon-store'

export interface MyPokemonCardProps {
  pokemon: CapturedPokemon
  onOptions: (p: CapturedPokemon) => void
}

export default function MyPokemonCard({ pokemon, onOptions }: MyPokemonCardProps) {
  const firstType = pokemon.types[0]?.toLowerCase() || 'normal'
  const typeColor = TYPE_COLORS[firstType] || '#9CA3AF'
  const bgOpacityHex = typeColor + '1a' // 10% opacity

  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      aria-label={`${pokemon.nickname}, species ${pokemon.name}, #${String(pokemon.id).padStart(4, '0')}`}
      className="block rounded-[14px] border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800 overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
    >
      <article>
        {/* Art Container */}
        <div
          className="h-28 w-full flex items-center justify-center relative"
          style={{ backgroundColor: bgOpacityHex }}
        >
          {pokemon.sprite ? (
            <Image
              src={pokemon.sprite}
              alt={pokemon.nickname}
              width={96}
              height={96}
              className="object-contain"
            />
          ) : (
            <div className="w-[96px] h-[96px]" />
          )}
        </div>

        {/* Card Footer */}
        <div className="p-3 flex flex-col gap-1.5">
          {/* Row 1: Nickname and Options Menu */}
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-sm font-bold text-slate-900 dark:text-slate-100 truncate transition-colors duration-200">
              {pokemon.nickname}
            </h2>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                onOptions(pokemon)
              }}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
              aria-label="Options"
            >
              <MoreHorizontal size={14} />
            </button>
          </div>

          {/* Row 2: Species Name */}
          <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium leading-none transition-colors duration-200">
            {capitalize(pokemon.name)}
          </div>

          {/* Row 3: Type Badges */}
          <div className="flex flex-wrap gap-1">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} size="sm" />
            ))}
          </div>

          {/* Row 4: Captured Time */}
          <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 transition-colors duration-200">
            Caught {timeAgo(pokemon.capturedAt)}
          </div>
        </div>
      </article>
    </Link>
  )
}
