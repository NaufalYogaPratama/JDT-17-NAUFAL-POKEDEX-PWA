import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
