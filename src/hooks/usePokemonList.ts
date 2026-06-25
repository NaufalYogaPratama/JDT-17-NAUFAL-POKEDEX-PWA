import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPokemonList } from '@/lib/pokeapi'

export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: ({ pageParam }) => fetchPokemonList(pageParam, 20),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length * 20 : undefined
    },
    staleTime: 5 * 60 * 1000,
  })
}
