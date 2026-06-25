export const TYPE_COLORS: Record<string, string> = {
  normal: '#9CA3AF',
  fire: '#F97316',
  water: '#3B82F6',
  electric: '#EAB308',
  grass: '#22C55E',
  ice: '#67E8F9',
  fighting: '#DC2626',
  poison: '#A855F7',
  ground: '#CA8A04',
  flying: '#818CF8',
  psychic: '#EC4899',
  bug: '#84CC16',
  rock: '#A16207',
  ghost: '#7C3AED',
  dragon: '#4F46E5',
  dark: '#374151',
  steel: '#6B7280',
  fairy: '#F472B6',
  legendary: '#FBBF24',
  mythical: '#C084FC',
}

export const TYPE_NEEDS_LIGHT_TEXT = new Set<string>([
  'fighting',
  'ghost',
  'dragon',
  'dark',
  'poison',
  'rock',
  'ground',
  'mythical',
])

export function getTypeTextColor(type: string): string {
  const normalizedType = type.toLowerCase()
  if (TYPE_NEEDS_LIGHT_TEXT.has(normalizedType)) {
    return '#FFFFFF'
  }
  return TYPE_COLORS[normalizedType] || '#000000'
}
