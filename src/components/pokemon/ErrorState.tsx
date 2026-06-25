'use client'

import { WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface ErrorStateProps {
  refetch: () => void
}

export default function ErrorState({ refetch }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-sm mx-auto w-full col-span-2">
      <WifiOff size={48} className="text-slate-300 mb-4" />
      <h3 className="font-display text-lg font-bold text-slate-700 mb-2">
        Something went wrong
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        Couldn&apos;t load Pokémon. Check your connection.
      </p>
      <Button
        onClick={() => refetch()}
        className="w-full bg-primary hover:bg-primary-dark text-white rounded-full font-semibold px-6 shadow-sm active:scale-[0.98] transition-transform"
      >
        Try Again
      </Button>
    </div>
  )
}
