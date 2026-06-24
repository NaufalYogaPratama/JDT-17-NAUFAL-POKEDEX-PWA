import { create } from 'zustand'

export interface CapturedPokemon {
  id: number
  name: string
  nickname: string
  types: string[]
  sprite: string
  capturedAt: string  // ISO date string
}

export interface PokemonStore {
  // Search & filter
  searchQuery: string
  setSearchQuery: (q: string) => void
  selectedType: string | null
  setSelectedType: (type: string | null) => void

  // Captured Pokémon (in-memory, synced with localStorage)
  capturedPokemon: CapturedPokemon[]
  addCapturedPokemon: (p: CapturedPokemon) => void
  removeCapturedPokemon: (nickname: string) => void
  renameCapturedPokemon: (nickname: string, newNickname: string) => void
  loadFromStorage: () => void
}PokemonStore

export const usePokemonStore = create<>((set) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  selectedType: null,
  setSelectedType: (type) => set({ selectedType: type }),

  capturedPokemon: [],
  addCapturedPokemon: (p) => {},
  removeCapturedPokemon: (nickname) => {},
  renameCapturedPokemon: (nickname, newNickname) => {},
  loadFromStorage: () => {},
}))
