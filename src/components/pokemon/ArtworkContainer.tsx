'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import PokemonId from './PokemonId'
import { TYPE_COLORS } from '@/lib/type-colors'
import { getOfficialArtwork } from '@/lib/utils'

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
  const bgOpacityHex = typeColor + '1f' // 12% opacity in hex is '1f'

  const artworkUrl = getOfficialArtwork(id)

  return (
    <div
      className="w-full h-60 md:h-72 lg:h-80 lg:rounded-3xl relative flex items-center justify-center overflow-hidden transition-all duration-300"
      style={{ backgroundColor: bgOpacityHex }}
    >
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
        className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm border border-slate-100 hover:bg-white active:scale-95 transition-all z-10 flex items-center justify-center cursor-pointer"
      >
        <ChevronLeft size={20} className="text-slate-700" />
      </button>

      {/* Pokémon ID Badge */}
      <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm rounded-full px-2.5 py-1 border border-slate-100/50 z-10 flex items-center justify-center">
        <PokemonId id={id} />
      </div>

      {/* Official Artwork */}
      <div className="relative w-[200px] h-[200px] flex items-center justify-center">
        <Image
          src={artworkUrl}
          alt={`${name} official artwork`}
          width={200}
          height={200}
          priority
          className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
        />
      </div>
    </div>
  )
}
