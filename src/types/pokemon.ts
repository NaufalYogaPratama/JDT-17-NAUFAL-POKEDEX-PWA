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

// PokemonSpeciesSchema placeholder
export const PokemonSpeciesSchema = z.object({})
export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>

// EvolutionChainSchema placeholder
export const EvolutionChainSchema = z.object({})
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
