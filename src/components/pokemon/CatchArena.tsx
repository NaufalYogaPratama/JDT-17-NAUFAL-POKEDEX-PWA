'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, HeartHandshake, HeartCrack } from 'lucide-react'
import { cn, capitalize } from '@/lib/utils'
import { PokemonSprite } from './PokemonSprite'
import TypeBadge from './TypeBadge'
import { Input } from '@/components/ui/input'

type CatchStage = 'encounter' | 'throwing' | 'shaking' | 'result'

interface CatchArenaProps {
  isOpen: boolean
  pokemon: {
    id: number
    name: string
    types: string[]
  }
  onClose: () => void
  onSave: (nickname: string) => void
}

export function CatchArena({ isOpen, pokemon, onClose, onSave }: CatchArenaProps) {
  const [stage, setStage] = useState<CatchStage>('encounter')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isCameraShaking, setIsCameraShaking] = useState(false)
  const [isPokeballThrown, setIsPokeballThrown] = useState(false)
  const [isPokemonCaptured, setIsPokemonCaptured] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [mounted, setMounted] = useState(false)

  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    setMounted(true)
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  const addTimeout = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay)
    timeoutsRef.current.push(id)
  }

  const startCatch = () => {
    setStage('throwing')
    setIsPokeballThrown(true)

    addTimeout(() => {
      setIsPokemonCaptured(true)
      setIsFlashing(true)
    }, 800)

    addTimeout(() => {
      setIsFlashing(false)
      setStage('shaking')
    }, 1100)

    addTimeout(() => {
      const result = Math.random() > 0.5
      setIsSuccess(result)
      setStage('result')
      setShowResult(true)
    }, 1700)
  }

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className={cn(
      "fixed inset-0 z-[100] flex flex-col",
      "bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-400",
      "dark:from-slate-900 dark:via-slate-800 dark:to-slate-900",
      isCameraShaking && "animate-camera-shake"
    )}>

      {isFlashing && (
        <div className="absolute inset-0 bg-white animate-capture-flash z-10 pointer-events-none" />
      )}

      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full
                   bg-black/20 flex items-center justify-center
                   text-white hover:bg-black/30 transition-colors"
        aria-label="Exit catch arena"
      >
        <X size={20} />
      </button>

      <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
        <span className="text-white/80 text-xs font-medium tracking-widest uppercase drop-shadow-md">
          {stage === 'encounter' && 'A wild Pokémon appeared!'}
          {stage === 'throwing' && 'Throwing...'}
          {stage === 'shaking' && 'Come on...'}
          {stage === 'result' && (isSuccess ? 'Gotcha!' : 'Oh no!')}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative pt-12">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />

        <div className={cn(
          "relative z-10 mb-4",
          isPokemonCaptured && "animate-pokemon-captured"
        )}>
          <PokemonSprite
            id={pokemon.id}
            name={pokemon.name}
            size={140}
            className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
          />
        </div>

        <div className="flex flex-col items-center gap-2 z-10">
          <h2 className="text-white font-display text-xl font-extrabold drop-shadow-sm">
            {capitalize(pokemon.name)}
          </h2>
          <div className="flex gap-1.5">
            {pokemon.types.map(t => (
              <TypeBadge key={t} type={t} size="sm" />
            ))}
          </div>
        </div>

        {stage !== 'encounter' && stage !== 'result' && (
          <div className={cn(
            "absolute bottom-8 left-8 w-10 h-10 z-20",
            isPokeballThrown && "animate-pokeball-throw",
            stage === 'shaking' && "animate-pokeball-shake"
          )}>
            <img
              src="/icons/pokeball.svg"
              alt="Pokéball"
              className="w-full h-full"
            />
          </div>
        )}

        {stage === 'shaking' && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 z-20 animate-pokeball-shake">
            <img src="/icons/pokeball.svg" alt="Pokéball shaking" className="w-full h-full" />
          </div>
        )}
      </div>

      <div className={cn(
        "bg-white dark:bg-slate-900",
        "rounded-t-[24px] px-6 pt-6 pb-8",
        "min-h-[40vh]",
        "flex flex-col items-center justify-center gap-4 relative z-30"
      )}>
        {stage === 'encounter' && (
          <>
            <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
              You encountered a wild <strong className="text-slate-800 dark:text-slate-200">{capitalize(pokemon.name)}</strong>!
            </p>
            <button
              onClick={startCatch}
              className="w-full h-13 bg-primary text-white rounded-full
                         font-semibold text-sm shadow-lg shadow-primary/30
                         flex items-center justify-center gap-2
                         hover:bg-primary-dark transition-colors"
            >
              <img src="/icons/pokeball.svg" alt="" aria-hidden="true" className="w-5 h-5" />
              Throw Poké Ball!
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 text-sm hover:text-slate-600 transition-colors"
            >
              Run away
            </button>
          </>
        )}

        {(stage === 'throwing' || stage === 'shaking') && (
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
            <p className="text-slate-400 text-sm">
              {stage === 'throwing' ? 'Pokéball is flying...' : 'Almost there...'}
            </p>
          </div>
        )}

        {stage === 'result' && (
          <ResultPanel
            isSuccess={isSuccess}
            pokemon={pokemon}
            onSave={onSave}
            onRetry={() => {
              setStage('encounter')
              setIsPokeballThrown(false)
              setIsPokemonCaptured(false)
              setShowResult(false)
            }}
            onClose={onClose}
          />
        )}
      </div>
    </div>,
    document.body
  )
}

interface ResultPanelProps {
  isSuccess: boolean
  pokemon: { id: number; name: string; types: string[] }
  onSave: (nickname: string) => void
  onRetry: () => void
  onClose: () => void
}

function ResultPanel({ isSuccess, pokemon, onSave, onRetry, onClose }: ResultPanelProps) {
  const [nickname, setNickname] = useState('')

  return (
    <div className="w-full flex flex-col items-center gap-4 animate-success-burst">
      <div className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center text-3xl",
        isSuccess
          ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
          : "bg-red-100 dark:bg-red-950/50 text-red-500 dark:text-red-400"
      )}>
        {isSuccess ? <HeartHandshake size={32} /> : <HeartCrack size={32} />}
      </div>

      <div className="text-center">
        <h3 className={cn(
          "font-display text-2xl font-extrabold",
          isSuccess ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"
        )}>
          {isSuccess ? 'Gotcha!' : 'Oh no!'}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          {isSuccess
            ? `${capitalize(pokemon.name)} was caught!`
            : `${capitalize(pokemon.name)} broke free!`
          }
        </p>
      </div>

      {isSuccess && (
        <div className="w-full">
          <label className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 block text-center">
            Give it a nickname
          </label>
          <Input
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder={capitalize(pokemon.name)}
            maxLength={20}
            className="w-full text-center"
          />
        </div>
      )}

      {isSuccess && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-particle-fly"
              style={{
                left: '50%',
                top: '30%',
                backgroundColor: ['#DC2626','#FACC15','#10B981','#3B82F6','#A855F7','#F97316','#EC4899','#22C55E'][i],
                '--tx': `${(Math.cos(i * 45 * Math.PI / 180) * 80).toFixed(0)}px`,
                '--ty': `${(Math.sin(i * 45 * Math.PI / 180) * 80).toFixed(0)}px`,
                animationDelay: `${i * 50}ms`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {isSuccess ? (
        <div className="w-full flex flex-col gap-2 z-10">
          <button
            onClick={() => onSave(nickname || capitalize(pokemon.name))}
            className="w-full h-12 bg-primary text-white rounded-full
                       font-semibold text-sm shadow-lg shadow-primary/30"
          >
            Save to Pokédex
          </button>
          <button
            onClick={onClose}
            className="w-full h-12 text-slate-400 text-sm"
          >
            Skip nickname
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2 z-10">
          <button
            onClick={onRetry}
            className="w-full h-12 bg-primary text-white rounded-full
                       font-semibold text-sm shadow-lg shadow-primary/30"
          >
            Try Again
          </button>
          <button
            onClick={onClose}
            className="w-full h-12 border border-slate-200 dark:border-slate-700
                       text-slate-500 dark:text-slate-400 rounded-full text-sm"
          >
            Run away
          </button>
        </div>
      )}
    </div>
  )
}
