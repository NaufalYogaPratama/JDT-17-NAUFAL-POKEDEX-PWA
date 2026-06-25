'use client'

import { useEffect, useState, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { usePokemonStore } from '@/store/pokemon-store'

export default function SearchBar() {
  const storeQuery = usePokemonStore((state) => state.searchQuery)
  const setSearchQuery = usePokemonStore((state) => state.setSearchQuery)

  const [localValue, setLocalValue] = useState(storeQuery)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Sync local input with store changes
  useEffect(() => {
    setLocalValue(storeQuery)
  }, [storeQuery])

  const handleInputChange = (value: string) => {
    setLocalValue(value)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setSearchQuery(value)
    }, 300)
  }

  const handleClear = () => {
    setLocalValue('')
    setSearchQuery('')
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={16} className="text-slate-400" />
      </div>
      <Input
        type="text"
        value={localValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search Pokémon..."
        aria-label="Search Pokémon by name or number"
        className="pl-9 pr-9 h-11 w-full bg-white border border-slate-200 rounded-[10px] text-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary focus-visible:outline-none"
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-3 flex items-center justify-center p-1 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Clear search query"
        >
          <X size={16} className="text-slate-400 hover:text-slate-600" />
        </button>
      )}
    </div>
  )
}
