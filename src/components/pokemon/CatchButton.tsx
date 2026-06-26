'use client'

import { useState } from 'react'
import { usePokemonStore } from '@/store/pokemon-store'
import { calculateCatchResult, getCatchRate } from '@/lib/catch'
import CaptureResultSheet from './CaptureResultSheet'
import { toast } from 'sonner'
import { Check } from 'lucide-react'

export interface CatchButtonProps {
  pokemonId: number
  pokemonName: string
  types: string[]
  spriteUrl: string
  fixed?: boolean
}

const PokeBallIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
)

export default function CatchButton({
  pokemonId,
  pokemonName,
  types,
  spriteUrl,
  fixed = false,
}: CatchButtonProps) {
  const [isThrowing, setIsThrowing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const addCapturedPokemon = usePokemonStore((state) => state.addCapturedPokemon)
  const isAlreadyCaptured = usePokemonStore((state) =>
    state.capturedPokemon.some((p) => p.id === pokemonId)
  )

  const triggerThrow = () => {
    setIsThrowing(true)
    setTimeout(() => {
      const rate = getCatchRate(pokemonId)
      const success = calculateCatchResult(rate)
      setIsSuccess(success)
      setIsThrowing(false)
      setShowResult(true)
    }, 800)
  }

  const handleSave = (nickname: string) => {
    addCapturedPokemon({
      id: pokemonId,
      name: pokemonName,
      nickname: nickname,
      types: types,
      sprite: spriteUrl,
      capturedAt: new Date().toISOString(),
    })
    setShowResult(false)
    setTimeout(() => {
      toast.success(`${nickname} was caught!`, {
        description: 'Added to your collection.',
      })
    }, 300)
  }

  const handleRetry = () => {
    setShowResult(false)
    // Wait for sheet closing transition before throwing again
    setTimeout(() => {
      triggerThrow()
    }, 300)
  }

  const handleClose = () => {
    setShowResult(false)
  }

  return (
    <>
      <div className={fixed ? "fixed bottom-16 left-0 right-0 px-4 pb-4 pt-6 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-slate-50/90 dark:via-slate-900/90 to-transparent z-30 transition-colors duration-200" : "w-full"}>
        <div className={fixed ? "max-w-md mx-auto" : "w-full"}>
          <button
            type="button"
            onClick={triggerThrow}
            disabled={isAlreadyCaptured || isThrowing}
            className={`w-full h-12 flex items-center justify-center rounded-full font-semibold text-sm transition-all duration-150 ${
              isAlreadyCaptured
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
                : isThrowing
                ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-none cursor-wait'
                : 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-red-500/30 active:scale-[0.98]'
            }`}
          >
            {isAlreadyCaptured ? (
              <>
                <Check size={16} className="mr-2 stroke-[3]" />
                Already in your Pokédex
              </>
            ) : isThrowing ? (
              <>
                <PokeBallIcon className="h-5 w-5 mr-2 animate-spin text-white" />
                Throwing...
              </>
            ) : (
              <>
                <PokeBallIcon className="h-5 w-5 mr-2 text-white" />
                Throw Poké Ball!
              </>
            )}
          </button>
        </div>
      </div>

      <CaptureResultSheet
        isOpen={showResult}
        onClose={handleClose}
        isSuccess={isSuccess}
        pokemon={{
          id: pokemonId,
          name: pokemonName,
          types,
          spriteUrl,
        }}
        onSave={handleSave}
        onRetry={handleRetry}
      />
    </>
  )
}
