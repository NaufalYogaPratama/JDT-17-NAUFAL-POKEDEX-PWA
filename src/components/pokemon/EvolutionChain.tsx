import { useEvolutionChain } from '@/hooks/useEvolutionChain'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronRight } from 'lucide-react'
import EvolutionStageCard from '@/components/pokemon/EvolutionStageCard'
import {
  flattenEvolutionChain,
  isLinearChain,
  getEvolutionTriggerLabel,
  EvolutionStage,
} from '@/lib/utils'

interface EvolutionChainProps {
  chainUrl: string
  currentPokemonId: number
}

export default function EvolutionChain({
  chainUrl,
  currentPokemonId,
}: EvolutionChainProps) {
  const { data, isLoading } = useEvolutionChain(chainUrl)

  if (isLoading) {
    return <Skeleton className="h-32 rounded-[14px] w-full" />
  }

  if (!data || !data.chain) {
    return null
  }

  const root = flattenEvolutionChain(data.chain)
  const isLinear = isLinearChain(root)

  if (isLinear) {
    // Flatten linear branch into simple array
    const stages: EvolutionStage[] = []
    let current: EvolutionStage | undefined = root
    while (current) {
      stages.push(current)
      current = current.evolvesTo[0] // works because it's linear (0 or 1)
    }

    // Hide if it's a standalone Pokemon
    if (stages.length <= 1) return null

    return (
      <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 scrollbar-hide">
        {stages.map((stage, i) => (
          <div key={stage.pokemonId} className="flex items-center gap-2">
            {i > 0 && (
              <div className="flex flex-col items-center flex-shrink-0">
                <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 transition-colors duration-200" />
                <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5 whitespace-nowrap transition-colors duration-200">
                  {getEvolutionTriggerLabel(stage.evolutionDetails)}
                </span>
              </div>
            )}
            <EvolutionStageCard stage={stage} currentPokemonId={currentPokemonId} />
          </div>
        ))}
      </div>
    )
  }

  // Branching Chain (Eevee style)
  // For MVP, we only render root -> first evolutions
  return (
    <div className="flex items-center gap-4 overflow-x-auto py-2 px-1 scrollbar-hide">
      <EvolutionStageCard stage={root} currentPokemonId={currentPokemonId} />

      <div className="flex flex-col items-center flex-shrink-0">
        <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 transition-colors duration-200" />
      </div>

      <div className="flex flex-col gap-3">
        {root.evolvesTo.map((evo) => (
          <div key={evo.pokemonId} className="flex items-center gap-2">
            <div className="flex flex-col justify-center min-w-[50px]">
              <span className="text-[9px] text-slate-400 dark:text-slate-500 text-right pr-2 transition-colors duration-200">
                {getEvolutionTriggerLabel(evo.evolutionDetails)}
              </span>
            </div>
            <EvolutionStageCard stage={evo} currentPokemonId={currentPokemonId} />
          </div>
        ))}
      </div>
    </div>
  )
}
