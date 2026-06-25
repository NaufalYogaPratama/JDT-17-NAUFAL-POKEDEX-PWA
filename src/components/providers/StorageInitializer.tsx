'use client'

import { useEffect } from 'react'
import { usePokemonStore } from '@/store/pokemon-store'

export default function StorageInitializer() {
  useEffect(() => {
    usePokemonStore.getState().loadFromStorage()
  }, [])

  return null
}
