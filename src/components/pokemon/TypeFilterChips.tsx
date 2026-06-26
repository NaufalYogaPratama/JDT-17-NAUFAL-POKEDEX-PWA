'use client'

import { usePokemonStore } from '@/store/pokemon-store'
import { TYPE_COLORS } from '@/lib/type-colors'

const TYPES = Object.keys(TYPE_COLORS)

export default function TypeFilterChips() {
  const selectedType = usePokemonStore((state) => state.selectedType)
  const setSelectedType = usePokemonStore((state) => state.setSelectedType)

  const handleChipClick = (type: string | null) => {
    setSelectedType(type)
  }

  return (
    <div className="flex gap-1.5 overflow-x-auto scrollbar-hide px-0 py-1 w-full select-none">
      {/* "All" Chip */}
      <button
        type="button"
        onClick={() => handleChipClick(null)}
        aria-pressed={selectedType === null}
        className={`h-8 px-4 shrink-0 rounded-full text-xs font-semibold cursor-pointer transition-all duration-150 flex items-center justify-center ${
          selectedType === null
            ? 'bg-primary text-white shadow-sm'
            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
        }`}
      >
        All
      </button>

      {/* Type Chips */}
      {TYPES.map((type) => {
        const isActive = selectedType === type
        const typeColor = TYPE_COLORS[type]

        // '26' is 15% opacity hex
        const bgHex = typeColor + '26'

        const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1)

        return (
          <button
            key={type}
            type="button"
            onClick={() => handleChipClick(type)}
            aria-pressed={isActive}
            className="h-8 px-3 shrink-0 rounded-full text-xs font-semibold cursor-pointer border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 transition-all duration-150 flex items-center justify-center"
            style={{
              backgroundColor: isActive ? bgHex : undefined,
              borderColor: isActive ? typeColor : undefined,
              color: isActive ? typeColor : undefined,
            }}
          >
            {capitalizedType}
          </button>
        )
      })}
    </div>
  )
}
