'use client'

import { useParams } from 'next/navigation'
import { usePokemonDetail } from '@/hooks/usePokemonDetail'
import DetailSkeleton from '@/components/pokemon/DetailSkeleton'
import ErrorState from '@/components/pokemon/ErrorState'
import ArtworkContainer from '@/components/pokemon/ArtworkContainer'
import PokemonId from '@/components/pokemon/PokemonId'
import TypeBadge from '@/components/pokemon/TypeBadge'
import StatBar from '@/components/pokemon/StatBar'
import SectionLabel from '@/components/layout/SectionLabel'
import CatchButton from '@/components/pokemon/CatchButton'
import { capitalize, formatHeight, formatWeight, formatStatName } from '@/lib/utils'

export default function PokemonDetailPage() {
  const params = useParams()
  const idStr = params?.id as string
  const id = idStr ? parseInt(idStr, 10) : NaN

  const { data, isLoading, isError, refetch } = usePokemonDetail(id)

  if (isLoading) {
    return <DetailSkeleton />
  }

  if (isError || !data) {
    return <ErrorState refetch={refetch} />
  }

  const types = data.types.map((t) => t.type.name)
  const totalStats = data.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
  const officialSprite =
    data.sprites.other?.['official-artwork']?.front_default ||
    data.sprites.front_default

  return (
    <div className="w-full min-h-screen bg-white pb-32 relative">
      {/* Section 1 - Hero */}
      <ArtworkContainer
        name={data.name}
        id={data.id}
        types={types}
        spriteUrl={officialSprite}
      />

      {/* Section 2 - Content */}
      <div className="px-4 mt-4 space-y-5">
        <div>
          <div className="flex items-baseline gap-2">
            <h1 className="font-display text-3xl font-extrabold text-slate-900 leading-tight">
              {capitalize(data.name)}
            </h1>
            <PokemonId id={data.id} />
          </div>

          {/* Type Badges Row */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {types.map((type) => (
              <TypeBadge key={type} type={type} size="md" />
            ))}
          </div>
        </div>

        {/* Height & Weight Pills */}
        <div className="flex gap-4">
          <div className="bg-slate-50 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-600 border border-slate-100 flex items-center gap-1.5 shadow-xs">
            <span className="text-slate-400 font-medium">Height</span>
            <span className="font-mono">{formatHeight(data.height)}</span>
          </div>
          <div className="bg-slate-50 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-600 border border-slate-100 flex items-center gap-1.5 shadow-xs">
            <span className="text-slate-400 font-medium">Weight</span>
            <span className="font-mono">{formatWeight(data.weight)}</span>
          </div>
        </div>

        <hr className="border-slate-100 my-5" />

        {/* Section 3 - Base Stats */}
        <div className="space-y-3">
          <SectionLabel>Base Stats</SectionLabel>
          <div className="space-y-2.5">
            {data.stats.map((stat) => (
              <StatBar
                key={stat.stat.name}
                label={formatStatName(stat.stat.name)}
                value={stat.base_stat}
              />
            ))}
            {/* Total Row */}
            <div className="pt-2 border-t border-slate-100 mt-2">
              <StatBar label="Total" value={totalStats} max={600} />
            </div>
          </div>
        </div>

        {/* Section 4 - Species Stub */}
        <div className="pt-2">
          <SectionLabel>Species</SectionLabel>
          <div className="bg-slate-50 border border-slate-100 rounded-[14px] p-4 text-slate-400 text-sm font-medium">
            Species data coming soon...
          </div>
        </div>

        {/* Section 5 - Evolution Stub */}
        <div className="pt-2">
          <SectionLabel>Evolution</SectionLabel>
          <div className="bg-slate-50 border border-slate-100 rounded-[14px] p-4 text-slate-400 text-sm font-medium">
            Evolution chain coming soon...
          </div>
        </div>
      </div>

      {/* Section 6 - Sticky Catch Button Container */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-4 pt-6 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent z-10">
        <div className="max-w-md mx-auto">
          <CatchButton
            pokemonId={data.id}
            pokemonName={data.name}
            onCatch={() => console.log('catch')}
          />
        </div>
      </div>
    </div>
  )
}
