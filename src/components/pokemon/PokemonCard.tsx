import Link from 'next/link'
import Image from 'next/image'
import PokemonId from './PokemonId'
import TypeBadge from './TypeBadge'
import { TYPE_COLORS } from '@/lib/type-colors'

export interface PokemonCardProps {
  name: string
  id: number
  types: string[]
  spriteUrl: string | null
  isCaptured?: boolean
}

export default function PokemonCard({
  name,
  id,
  types,
  spriteUrl,
  isCaptured = false,
}: PokemonCardProps) {
  const firstType = types[0]?.toLowerCase() || 'normal'
  const typeColor = TYPE_COLORS[firstType] || '#9CA3AF'
  const bgOpacityHex = typeColor + '1a' // '1a' is hex for 10% opacity

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

  return (
    <Link
      href={`/pokemon/${id}`}
      aria-label={`${name}, #${String(id).padStart(4, '0')}, ${types.join(', ')} type`}
      className="block rounded-[14px] border border-slate-200 shadow-sm bg-white overflow-hidden cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
    >
      <article>
        {/* Art Container */}
        <div
          className="h-28 w-full flex items-center justify-center relative"
          style={{ backgroundColor: bgOpacityHex }}
        >
          {spriteUrl ? (
            <Image
              src={spriteUrl}
              alt={name}
              width={96}
              height={96}
              priority={id <= 20}
              className="object-contain"
            />
          ) : (
            <div className="w-[96px] h-[96px]" />
          )}
        </div>

        {/* Card Footer */}
        <div className="p-3 flex flex-col gap-1.5">
          {/* Row 1: ID and Captured Dot */}
          <div className="flex items-center justify-between">
            <PokemonId id={id} />
            {isCaptured && (
              <span
                className="w-2 h-2 bg-emerald-500 rounded-full"
                aria-label="Captured"
              />
            )}
          </div>

          {/* Row 2: Name */}
          <h2 className="font-display text-sm font-bold text-slate-900 truncate">
            {capitalizedName}
          </h2>

          {/* Row 3: Type Badges */}
          <div className="flex flex-wrap gap-1">
            {types.map((type) => (
              <TypeBadge key={type} type={type} size="sm" />
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
