import {
  PokemonDetail,
  PokemonDetailSchema,
  PokemonListResponse,
  PokemonListResponseSchema,
} from '@/types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemonList(
  offset: number,
  limit: number = 20
): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon list: ${response.statusText}`)
  }
  const data = await response.json()
  return PokemonListResponseSchema.parse(data)
}

export async function fetchPokemonDetail(
  nameOrId: string | number
): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon detail for ${nameOrId}: ${response.statusText}`)
  }
  const data = await response.json()
  return PokemonDetailSchema.parse(data)
}

export async function fetchPokemonByType(type: string): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/type/${type.toLowerCase()}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokémon by type ${type}: ${response.statusText}`)
  }
  const data = await response.json()

  if (!data.pokemon || !Array.isArray(data.pokemon)) {
    return []
  }

  return data.pokemon.map((p: any) => p.pokemon.name)
}
