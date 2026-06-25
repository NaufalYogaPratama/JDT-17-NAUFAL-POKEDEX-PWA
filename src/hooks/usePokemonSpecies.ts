import { useQuery } from '@tanstack/react-query'
import { fetchPokemonSpecies } from '@/lib/pokeapi'
import { PokemonSpecies } from '@/types/pokemon'

export function usePokemonSpecies(idOrName?: string | number) {
  return useQuery<PokemonSpecies, Error>({
    queryKey: ['pokemon-species', idOrName],
    queryFn: () => fetchPokemonSpecies(idOrName!),
    enabled: !!idOrName,
    staleTime: 10 * 60 * 1000,
  })
}
