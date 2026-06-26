'use client'

import { useRouter } from 'next/navigation'
import { PackageOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MyPokemonEmptyState() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400 dark:text-slate-500 transition-colors duration-200">
        <PackageOpen size={32} />
      </div>
      <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 transition-colors duration-200">
        Your Pokédex is empty
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-[280px] transition-colors duration-200">
        Start catching Pokémon to build your collection.
      </p>
      <Button
        onClick={() => router.push('/')}
        className="mt-6 bg-primary hover:bg-primary-dark text-white rounded-full px-6 h-11 font-semibold text-sm shadow-md active:scale-[0.98] transition-transform"
      >
        Explore Pokémon
      </Button>
    </div>
  )
}
