export function calculateCatchResult(catchRate: number = 50): boolean {
  // catchRate is 0-100 (percentage)
  // Default 50% chance for MVP
  return Math.random() * 100 < catchRate
}

export function getCatchRate(pokemonId: number): number {
  // For MVP: flat 50% for all Pokémon
  // Could be extended later with actual base catch rates from PokeAPI
  return 50
}
