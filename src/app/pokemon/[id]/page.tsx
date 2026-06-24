export default function PokemonDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Pokémon Detail Placeholder (ID: {params.id})</h1>
    </div>
  )
}
