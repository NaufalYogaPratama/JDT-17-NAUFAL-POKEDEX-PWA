import PageWrapper from '@/components/layout/PageWrapper'
<<<<<<< Updated upstream
=======
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
import { cn } from '@/lib/utils'

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-4 w-full col-span-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
    </div>
  )
}
>>>>>>> Stashed changes

export default function Home() {
  return (
<<<<<<< Updated upstream
    <PageWrapper className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">PokéDex PWA</h1>
=======
    <PageWrapper>
      <div className="md:max-w-2xl lg:max-w-3xl">
        {/* Search and Filters */}
        <div className="mt-2 mb-2">
          <SearchBar />
        </div>
        <div className="mb-3">
          <TypeFilterChips />
        </div>
      </div>

      {/* Results Count */}
      <p className="text-right text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-3">
        {totalCount} Pokémon
      </p>

      {/* Grid Content */}
      <div className={cn(
        "grid gap-3",
        "grid-cols-2",
        "sm:grid-cols-3",
        "md:grid-cols-4",
        "lg:grid-cols-5",
        "xl:grid-cols-6"
      )}>
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
>>>>>>> Stashed changes
    </PageWrapper>
  )
}
