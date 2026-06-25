import Image from 'next/image'
import Link from 'next/link'
import { EvolutionStage, capitalize } from '@/lib/utils'

interface EvolutionStageCardProps {
  stage: EvolutionStage
  currentPokemonId: number
}

export default function EvolutionStageCard({
  stage,
  currentPokemonId,
}: EvolutionStageCardProps) {
  const isCurrent = stage.pokemonId === currentPokemonId
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stage.pokemonId}.png`

  return (
    <Link href={`/pokemon/${stage.pokemonId}`} className="block flex-shrink-0">
      <div
        className={`w-24 bg-slate-50 rounded-[14px] p-2 flex flex-col items-center justify-center transition-all ${
          isCurrent ? 'ring-2 ring-primary/40 shadow-sm' : 'border border-slate-100 hover:border-slate-200'
        }`}
      >
        <div className="relative w-16 h-16 drop-shadow-sm">
          <Image
            src={spriteUrl}
            alt={stage.speciesName}
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>
        <div className="mt-1 text-center w-full">
          <p className="text-[11px] font-bold text-slate-700 truncate">
            {capitalize(stage.speciesName)}
          </p>
          {isCurrent && (
            <p className="text-[10px] font-semibold text-primary mt-0.5">You</p>
          )}
        </div>
      </div>
    </Link>
  )
}
