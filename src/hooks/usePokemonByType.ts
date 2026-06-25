import { useQuery } from '@tanstack/react-query'
import { fetchPokemonByType } from '@/lib/pokeapi'

export function usePokemonByType(type: string | null | undefined) {
  return useQuery({
    queryKey: ['pokemon-type', type],
    queryFn: () => fetchPokemonByType(type!),
    enabled: !!type,
    staleTime: 10 * 60 * 1000,
  })
}
