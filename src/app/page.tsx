'use client'

import { useEffect, useRef } from 'react'
import { useQueries } from '@tanstack/react-query'
import PageWrapper from '@/components/layout/PageWrapper'
import SearchBar from '@/components/pokemon/SearchBar'
import TypeFilterChips from '@/components/pokemon/TypeFilterChips'
import PokemonCard from '@/components/pokemon/PokemonCard'
import SkeletonCard from '@/components/pokemon/SkeletonCard'
import ErrorState from '@/components/pokemon/ErrorState'
import EmptyState from '@/components/pokemon/EmptyState'
import { usePokemonStore } from '@/store/pokemon-store'
import { usePokemonList } from '@/hooks/usePokemonList'
import { usePokemonByType } from '@/hooks/usePokemonByType'
import { fetchPokemonDetail } from '@/lib/pokeapi'

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-4 w-full col-span-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
    </div>
  )
}

export default function Home() {
  const searchQuery = usePokemonStore((state) => state.searchQuery)
  const selectedType = usePokemonStore((state) => state.selectedType)
  const capturedPokemon = usePokemonStore((state) => state.capturedPokemon)

  // 1. Fetching list when type is NOT active
  const listQuery = usePokemonList()

  // 2. Fetching list when type IS active
  const typeQuery = usePokemonByType(selectedType)

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // Intersection Observer for Infinite Scroll
  const hasNextPage = listQuery.hasNextPage
  const isFetchingNextPage = listQuery.isFetchingNextPage
  const fetchNextPage = listQuery.fetchNextPage

  useEffect(() => {
    if (selectedType) return // No infinite scroll when type filter is active

    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sentinel)
    return () => {
      observer.unobserve(sentinel)
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, selectedType])

  // Determine items to fetch details for
  let displayedNames: string[] = []
  let totalCount = 0
  let isListLoading = false
  let isListError = false
  let refetchList = () => {}

  if (selectedType) {
    isListLoading = typeQuery.isLoading
    isListError = typeQuery.isError
    refetchList = () => typeQuery.refetch()

    const allTypeNames = typeQuery.data || []
    const filteredTypeNames = searchQuery
      ? allTypeNames.filter((name) =>
          name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allTypeNames

    // Displayed names is capped to first 20 for type query as per prompt
    displayedNames = filteredTypeNames.slice(0, 20)
    totalCount = filteredTypeNames.length
  } else {
    isListLoading = listQuery.isLoading
    isListError = listQuery.isError
    refetchList = () => listQuery.refetch()

    const allItems = listQuery.data
      ? listQuery.data.pages.flatMap((page) => page.results)
      : []

    const filteredItems = searchQuery
      ? allItems.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allItems

    displayedNames = filteredItems.map((item) => item.name)
    totalCount = searchQuery
      ? filteredItems.length
      : (listQuery.data?.pages[0]?.count ?? 0)
  }

  // Batch query for details of all displayed names
  const detailQueries = useQueries({
    queries: displayedNames.map((name) => ({
      queryKey: ['pokemon', name],
      queryFn: () => fetchPokemonDetail(name),
      staleTime: 10 * 60 * 1000,
    })),
  })

  const isAnyDetailError = detailQueries.some((q) => q.isError)

  const handleClearFilters = () => {
    usePokemonStore.getState().setSearchQuery('')
    usePokemonStore.getState().setSelectedType(null)
  }

  return (
    <PageWrapper>
      {/* Search and Filters */}
      <div className="mt-2 mb-2">
        <SearchBar />
      </div>
      <div className="mb-3">
        <TypeFilterChips />
      </div>

      {/* Results Count */}
      <p className="text-right text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-3">
        {totalCount} Pokémon
      </p>

      {/* Grid Content */}
      <div className="grid grid-cols-2 gap-3">
        {isListLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={`initial-skeleton-${i}`} />
          ))
        ) : isListError || isAnyDetailError ? (
          <ErrorState refetch={refetchList} />
        ) : displayedNames.length === 0 ? (
          <EmptyState
            message={
              searchQuery
                ? `No Pokémon match "${searchQuery}"`
                : 'No Pokémon found'
            }
            actionLabel={selectedType || searchQuery ? 'Clear Filters' : undefined}
            onAction={selectedType || searchQuery ? handleClearFilters : undefined}
          />
        ) : (
          detailQueries.map((query, index) => {
            if (query.isLoading || !query.data) {
              return <SkeletonCard key={`card-skeleton-${index}`} />
            }
            const pokemon = query.data
            const isCaptured = capturedPokemon.some((p) => p.id === pokemon.id)
            const sprite =
              pokemon.sprites.other?.['official-artwork']?.front_default ||
              pokemon.sprites.front_default

            return (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                types={pokemon.types.map((t) => t.type.name)}
                spriteUrl={sprite}
                isCaptured={isCaptured}
              />
            )
          })
        )}
      </div>

      {/* Sentinel for Infinite Scroll */}
      <div ref={sentinelRef} className="h-4" />

      {/* Load More Spinner */}
      {isFetchingNextPage && <LoadingSpinner />}
    </PageWrapper>
  )
}
