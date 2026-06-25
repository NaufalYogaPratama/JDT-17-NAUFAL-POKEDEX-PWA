import { useQuery } from '@tanstack/react-query'
import { fetchPokemonDetail } from '@/lib/pokeapi'

export function usePokemonDetail(nameOrId: string | number | undefined) {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemonDetail(nameOrId!),
    enabled: !!nameOrId,
    staleTime: 10 * 60 * 1000,
  })
}
