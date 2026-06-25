import PageWrapper from '@/components/layout/PageWrapper'

export default function PokemonDetailPage({ params }: { params: { id: string } }) {
  return (
    <PageWrapper>
      <h1 className="text-xl font-bold">Pokémon Detail Placeholder (ID: {params.id})</h1>
    </PageWrapper>
  )
}
