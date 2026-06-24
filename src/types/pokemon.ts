import { z } from 'zod'

// PokemonListSchema placeholder
export const PokemonListSchema = z.object({})
export type PokemonList = z.infer<typeof PokemonListSchema>

// PokemonDetailSchema placeholder
export const PokemonDetailSchema = z.object({})
export type PokemonDetail = z.infer<typeof PokemonDetailSchema>

// PokemonSpeciesSchema placeholder
export const PokemonSpeciesSchema = z.object({})
export type PokemonSpecies = z.infer<typeof PokemonSpeciesSchema>

// EvolutionChainSchema placeholder
export const EvolutionChainSchema = z.object({})
export type EvolutionChain = z.infer<typeof EvolutionChainSchema>

// CapturedPokemonSchema placeholder
export const CapturedPokemonSchema = z.object({})
export type CapturedPokemon = z.infer<typeof CapturedPokemonSchema>
