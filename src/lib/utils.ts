import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PokemonSpecies, ChainLink, EvolutionDetail } from "@/types/pokemon"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function formatStatName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => (word.toLowerCase() === 'hp' ? 'HP' : capitalize(word)))
    .join(' ')
}

export function formatHeight(h: number): string {
  return `${(h / 10).toFixed(1)} m`
}

export function formatWeight(w: number): string {
  return `${(w / 10).toFixed(1)} kg`
}

export function getOfficialArtwork(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 0) return 'just now'
  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes}m ago`
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours}h ago`
  }
  if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days}d ago`
  }
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000)
    return `${months}mo ago`
  }
  const years = Math.floor(diffInSeconds / 31536000)
  return `${years}y ago`
}

export function getEnglishGenus(species: PokemonSpecies): string {
  const entry = species.genera.find((g) => g.language.name === 'en')
  return entry ? entry.genus : ''
}

export function getEnglishFlavorText(
  species: PokemonSpecies,
  preferredVersion?: string
): { text: string; version: string } {
  const englishEntries = species.flavor_text_entries.filter(
    (entry) => entry.language.name === 'en'
  )

  if (englishEntries.length === 0) {
    return { text: '', version: '' }
  }

  let targetEntry = englishEntries[0]
  if (preferredVersion) {
    const preferred = englishEntries.find(
      (entry) => entry.version.name === preferredVersion
    )
    if (preferred) {
      targetEntry = preferred
    }
  }

  const cleanedText = targetEntry.flavor_text.replace(/[\n\f\r]+/g, ' ')
  return { text: cleanedText, version: targetEntry.version.name }
}

export type EvolutionStage = {
  speciesName: string
  pokemonId: number
  evolutionDetails: EvolutionDetail[]
  evolvesTo: EvolutionStage[]
}

export function flattenEvolutionChain(chain: ChainLink): EvolutionStage {
  const parts = chain.species.url.split('/').filter(Boolean)
  const pokemonId = parseInt(parts[parts.length - 1], 10)

  return {
    speciesName: chain.species.name,
    pokemonId,
    evolutionDetails: chain.evolution_details,
    evolvesTo: chain.evolves_to.map(flattenEvolutionChain),
  }
}

export function isLinearChain(root: EvolutionStage): boolean {
  if (root.evolvesTo.length === 0) return true
  if (root.evolvesTo.length > 1) return false
  return isLinearChain(root.evolvesTo[0])
}

export function getEvolutionTriggerLabel(details: EvolutionDetail[]): string {
  if (!details || details.length === 0) return 'Evolve'
  
  const detail = details[0]
  if (detail.min_level) return `Lv. ${detail.min_level}`
  if (detail.item?.name) return `Use ${capitalize(detail.item.name.replace(/-/g, ' '))}`
  if (detail.min_happiness) return 'Friendship'
  if (detail.trigger?.name === 'trade') return 'Trade'
  
  return 'Evolve'
}
