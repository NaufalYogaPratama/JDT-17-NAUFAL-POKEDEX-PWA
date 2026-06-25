'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { usePokemonDetail } from '@/hooks/usePokemonDetail'
import { usePokemonSpecies } from '@/hooks/usePokemonSpecies'
import DetailSkeleton from '@/components/pokemon/DetailSkeleton'
import ErrorState from '@/components/pokemon/ErrorState'
import ArtworkContainer from '@/components/pokemon/ArtworkContainer'
import PokemonId from '@/components/pokemon/PokemonId'
import TypeBadge from '@/components/pokemon/TypeBadge'
import StatBar from '@/components/pokemon/StatBar'
import SectionLabel from '@/components/layout/SectionLabel'
import CatchButton from '@/components/pokemon/CatchButton'
import SpeciesCard from '@/components/pokemon/SpeciesCard'
import EvolutionChain from '@/components/pokemon/EvolutionChain'
import { Skeleton } from '@/components/ui/skeleton'
import { capitalize, formatHeight, formatWeight, formatStatName } from '@/lib/utils'

export default function PokemonDetailPage() {
  const params = useParams()
  const idStr = params?.id as string
  const id = idStr ? parseInt(idStr, 10) : NaN

  const { data, isLoading, isError, refetch } = usePokemonDetail(id)
  const { data: speciesData, isLoading: isSpeciesLoading } = usePokemonSpecies(data?.id)
  const [evolutionChainUrl, setEvolutionChainUrl] = useState<string | null>(null)

  useEffect(() => {
    if (speciesData?.evolution_chain?.url) {
      setEvolutionChainUrl(speciesData.evolution_chain.url)
    }
  }, [speciesData])

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
    data.sprites.front_default ||
    ''

  return (
    <div className="w-full min-h-screen bg-white pb-32 relative pt-14 lg:bg-[#F8FAFC] lg:pl-64">
      <div className="lg:max-w-screen-xl lg:mx-auto lg:px-12 lg:flex lg:flex-row lg:gap-12 lg:items-start lg:pt-8 lg:pb-16">
        
        {/* Left column — artwork + identity */}
        <div className="lg:w-[400px] lg:shrink-0 lg:sticky lg:top-24 flex flex-col">
          <ArtworkContainer
            name={data.name}
            id={data.id}
            types={types}
            spriteUrl={officialSprite}
          />
          
          {/* Name, ID, types — move these inside left col on desktop */}
          <div className="hidden lg:flex flex-col px-0 mt-6">
            <div className="flex items-baseline gap-2">
              <h1 className="font-display text-4xl font-extrabold text-slate-900 leading-tight">
                {capitalize(data.name)}
              </h1>
              <PokemonId id={data.id} />
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {types.map((type) => (
                <TypeBadge key={type} type={type} size="md" />
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block mt-8">
            <CatchButton
              pokemonId={data.id}
              pokemonName={data.name}
              types={types}
              spriteUrl={officialSprite}
            />
          </div>
        </div>

        {/* Right column — stats, species, evolution */}
        <div className="flex-1 min-w-0 px-4 lg:px-0 lg:bg-white lg:rounded-3xl lg:p-8 lg:shadow-sm lg:border lg:border-slate-200 lg:pl-8 lg:pr-8">
          
          {/* Name, ID, types — show on mobile only */}
          <div className="lg:hidden mt-4 space-y-5">
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
          </div>

          {/* Height & Weight Pills */}
          <div className="flex gap-4 mt-5 lg:mt-0">
            <div className="bg-slate-50 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-600 border border-slate-100 flex items-center gap-1.5 shadow-xs">
              <span className="text-slate-400 font-medium">Height</span>
              <span className="font-mono">{formatHeight(data.height)}</span>
            </div>
            <div className="bg-slate-50 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-600 border border-slate-100 flex items-center gap-1.5 shadow-xs">
              <span className="text-slate-400 font-medium">Weight</span>
              <span className="font-mono">{formatWeight(data.weight)}</span>
            </div>
          </div>

          <hr className="border-slate-100 my-5 lg:my-6" />

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

          {/* Section 4 - Species */}
          <div className="pt-6">
            <SectionLabel>Species</SectionLabel>
            {isSpeciesLoading ? (
              <Skeleton className="h-36 rounded-[14px] w-full" />
            ) : speciesData ? (
              <SpeciesCard species={speciesData} />
            ) : (
              <div className="bg-slate-50 border border-slate-100 rounded-[14px] p-4 text-slate-400 text-sm font-medium">
                Species data not available.
              </div>
            )}
          </div>

          {/* Section 5 - Evolution */}
          <div className="pt-6">
            <SectionLabel>Evolution</SectionLabel>
            {evolutionChainUrl ? (
              <EvolutionChain chainUrl={evolutionChainUrl} currentPokemonId={data.id} />
            ) : !isSpeciesLoading ? (
              <div className="bg-slate-50 border border-slate-100 rounded-[14px] p-4 text-slate-400 text-sm font-medium">
                No evolution data available.
              </div>
            ) : (
              <Skeleton className="h-32 rounded-[14px] w-full" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Catch Button */}
      <div className="lg:hidden">
        <CatchButton
          fixed
          pokemonId={data.id}
          pokemonName={data.name}
          types={types}
          spriteUrl={officialSprite}
        />
      </div>
    </div>
  )
}
