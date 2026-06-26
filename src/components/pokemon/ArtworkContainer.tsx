'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import PokemonId from './PokemonId'
import { TYPE_COLORS } from '@/lib/type-colors'
import { PokemonSprite } from './PokemonSprite'

export interface ArtworkContainerProps {
  name: string
  id: number
  types: string[]
  spriteUrl: string | null
}

export default function ArtworkContainer({
  name,
  id,
  types,
  spriteUrl,
}: ArtworkContainerProps) {
  const router = useRouter()
  const firstType = types[0]?.toLowerCase() || 'normal'
  const typeColor = TYPE_COLORS[firstType] || '#9CA3AF'
  const bgOpacityHex = typeColor + '18'

  return (
    <div
      className="relative w-full min-h-[200px] max-h-[340px] flex items-center justify-center overflow-hidden py-6 lg:rounded-3xl transition-all duration-300"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: bgOpacityHex }}
      />
      <img
        src="/icons/pokeball.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain opacity-[0.06] pointer-events-none select-none scale-110"
      />
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="absolute top-4 left-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full p-2 shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 active:scale-95 transition-all z-10 flex items-center justify-center cursor-pointer"
      >
        <ChevronLeft size={20} className="text-slate-700 dark:text-slate-300 transition-colors" />
      </button>

      {/* Pokémon ID Badge */}
      <div className="absolute top-4 right-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-full px-2.5 py-1 border border-slate-100/50 dark:border-slate-700/50 z-10 flex items-center justify-center transition-colors">
        <PokemonId id={id} />
      </div>

      {/* Official Artwork */}
      <div className="relative w-full h-500 flex items-center justify-center">
        <PokemonSprite
          id={id}
          name={name}
          variant="fluid"
          priority={true}
        />
      </div>
    </div>
  )
}
