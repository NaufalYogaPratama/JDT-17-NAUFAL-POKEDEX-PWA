import { create } from 'zustand'
import { CapturedPokemonSchema } from '@/types/pokemon'

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

  // Captured Pokémon
  capturedPokemon: CapturedPokemon[]
  addCapturedPokemon: (p: CapturedPokemon) => void
  removeCapturedPokemon: (nickname: string) => void
  renameCapturedPokemon: (nickname: string, newNickname: string) => void
  loadFromStorage: () => void

  // Selector
  isCaptured: (pokemonId: number) => boolean
}

export const usePokemonStore = create<PokemonStore>((set, get) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),
  selectedType: null,
  setSelectedType: (type) => set({ selectedType: type }),

  capturedPokemon: [],

  addCapturedPokemon: (p) => {
    const updated = [...get().capturedPokemon, p]
    set({ capturedPokemon: updated })
    localStorage.setItem('pokedex-captured', JSON.stringify(updated))
  },

  removeCapturedPokemon: (nickname) => {
    const updated = get().capturedPokemon.filter((item) => item.nickname !== nickname)
    set({ capturedPokemon: updated })
    localStorage.setItem('pokedex-captured', JSON.stringify(updated))
  },

  renameCapturedPokemon: (nickname, newNickname) => {
    const updated = get().capturedPokemon.map((item) =>
      item.nickname === nickname ? { ...item, nickname: newNickname } : item
    )
    set({ capturedPokemon: updated })
    localStorage.setItem('pokedex-captured', JSON.stringify(updated))
  },

  loadFromStorage: () => {
    try {
      const raw = localStorage.getItem('pokedex-captured')
      if (!raw) {
        set({ capturedPokemon: [] })
        return
      }

      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        const validated: CapturedPokemon[] = []
        for (const item of parsed) {
          const res = CapturedPokemonSchema.safeParse(item)
          if (res.success) {
            validated.push(res.data as CapturedPokemon)
          }
        }
        set({ capturedPokemon: validated })
      } else {
        set({ capturedPokemon: [] })
      }
    } catch (e) {
      console.error('Failed to load captured Pokémon from storage', e)
      set({ capturedPokemon: [] })
    }
  },

  isCaptured: (pokemonId) => {
    return get().capturedPokemon.some((p) => p.id === pokemonId)
  },
}))
