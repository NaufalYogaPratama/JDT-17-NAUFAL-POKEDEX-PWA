import { PokemonSpecies } from '@/types/pokemon'
import { getEnglishGenus, getEnglishFlavorText } from '@/lib/utils'
import TypeBadge from '@/components/pokemon/TypeBadge'

interface SpeciesCardProps {
  species: PokemonSpecies
}

export default function SpeciesCard({ species }: SpeciesCardProps) {
  const genus = getEnglishGenus(species)
  const flavorTextObj = getEnglishFlavorText(species)

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-[14px] p-5 space-y-4 shadow-sm transition-colors duration-200">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 text-lg transition-colors duration-200">
          {genus || 'Unknown Pokémon'}
        </h3>
      </div>

      {(species.is_legendary || species.is_mythical) && (
        <div className="flex gap-2">
          {species.is_legendary && <TypeBadge type="legendary" size="sm" />}
          {species.is_mythical && <TypeBadge type="mythical" size="sm" />}
        </div>
      )}

      {flavorTextObj.text && (
        <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 transition-colors duration-200">
          <p className="italic">"{flavorTextObj.text}"</p>
          <div className="mt-2 text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1.5 transition-colors duration-200">
            <span className="inline-block w-4 h-[1px] bg-slate-300 dark:bg-slate-600 transition-colors duration-200"></span>
            Pokémon {flavorTextObj.version.replace(/-/g, ' ')}
          </div>
        </div>
      )}
    </div>
  )
}
