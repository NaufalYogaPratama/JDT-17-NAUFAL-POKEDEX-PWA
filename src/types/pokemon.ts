import { z } from 'zod'

// PokemonListItemSchema
export const PokemonListItemSchema = z.object({
  name: z.string(),
  url: z.string().url(),
})
export type PokemonListItem = z.infer<typeof PokemonListItemSchema>

// PokemonListResponseSchema
export const PokemonListResponseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(PokemonListItemSchema),
})
export type PokemonListResponse = z.infer<typeof PokemonListResponseSchema>

// PokemonTypeSlotSchema
export const PokemonTypeSlotSchema = z.object({
  slot: z.number(),
  type: z.object({
    name: z.string(),
    url: z.string(),
  }),
})
export type PokemonTypeSlot = z.infer<typeof PokemonTypeSlotSchema>

// PokemonSpriteSchema
export const PokemonSpriteSchema = z.object({
  front_default: z.string().nullable(),
  other: z.object({
    'official-artwork': z.object({
      front_default: z.string().nullable(),
    }),
  }).optional(),
})
export type PokemonSprite = z.infer<typeof PokemonSpriteSchema>

// PokemonDetailSchema
export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(PokemonTypeSlotSchema),
  sprites: PokemonSpriteSchema,
  base_experience: z.number().nullable(),
  height: z.number(),
  weight: z.number(),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      stat: z.object({
        name: z.string(),
      }),
    })
  ),
  moves: z.array(
    z.object({
      move: z.object({
        name: z.string(),
      }),
    })
  ).optional(),
})
export type PokemonDetail = z.infer<typeof PokemonDetailSchema>

// PokemonSpeciesSchema
export const PokemonSpeciesSchema = z.object({
  id: z.number(),
  name: z.string(),
  genera: z.array(
    z.object({
      genus: z.string(),
      language: z.object({ name: z.string() }),
    })
  ),
  flavor_text_entries: z.array(
    z.object({
      flavor_text: z.string(),
      language: z.object({ name: z.string() }),
      version: z.object({ name: z.string() }),
    })
  ),
  habitat: z.object({ name: z.string() }).nullable(),
  is_legendary: z.boolean(),
  is_mythical: z.boolean(),
  evolution_chain: z.object({ url: z.string() }),
})
export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>

export const EvolutionDetailSchema = z.object({
  min_level: z.number().nullable(),
  trigger: z.object({ name: z.string() }),
  item: z.object({ name: z.string() }).nullable(),
  min_happiness: z.number().nullable(),
})
export type EvolutionDetail = z.infer<typeof EvolutionDetailSchema>

export type ChainLink = {
  species: { name: string; url: string }
  evolution_details: EvolutionDetail[]
  evolves_to: ChainLink[]
}

export const ChainLinkSchema: z.ZodType<ChainLink> = z.lazy(() =>
  z.object({
    species: z.object({ name: z.string(), url: z.string() }),
    evolution_details: z.array(EvolutionDetailSchema),
    evolves_to: z.array(ChainLinkSchema),
  })
)

export const EvolutionChainSchema = z.object({
  id: z.number(),
  chain: ChainLinkSchema,
})
export type EvolutionChain = z.infer<typeof EvolutionChainSchema>

// CapturedPokemonSchema
export const CapturedPokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  nickname: z.string(),
  types: z.array(z.string()),
  sprite: z.string(),
  capturedAt: z.string(), // ISO date string
})
export type CapturedPokemon = z.infer<typeof CapturedPokemonSchema>
