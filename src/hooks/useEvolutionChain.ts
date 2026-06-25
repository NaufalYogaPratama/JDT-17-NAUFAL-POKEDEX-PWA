import { useQuery } from '@tanstack/react-query'
import { fetchEvolutionChain } from '@/lib/pokeapi'
import { EvolutionChain } from '@/types/pokemon'

export function useEvolutionChain(url?: string | null) {
  return useQuery<EvolutionChain, Error>({
    queryKey: ['evolution-chain', url],
    queryFn: () => fetchEvolutionChain(url!),
    enabled: !!url,
    staleTime: 10 * 60 * 1000,
  })
}
