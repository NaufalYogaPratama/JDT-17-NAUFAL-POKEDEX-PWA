export interface PokemonIdProps {
  id: number
}

export default function PokemonId({ id }: PokemonIdProps) {
  const paddedId = String(id).padStart(4, '0')
  return (
    <span className="font-mono text-[13px] text-slate-400 tracking-wider">
      #{paddedId}
    </span>
  )
}
