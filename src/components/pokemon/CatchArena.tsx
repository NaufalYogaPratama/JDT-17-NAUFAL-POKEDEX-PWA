'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, HeartHandshake, HeartCrack } from 'lucide-react'
import { cn, capitalize } from '@/lib/utils'
import { PokemonSprite } from './PokemonSprite'
import TypeBadge from './TypeBadge'
import { Input } from '@/components/ui/input'
import { TYPE_COLORS } from '@/lib/type-colors'

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
  const [hasEntered, setHasEntered] = useState(false)

  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    setMounted(true)
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setHasEntered(true), 500)
      return () => clearTimeout(t)
    } else {
      setHasEntered(false)
    }
  }, [isOpen])

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
      if (!result) {
        setIsPokemonCaptured(false)
      }
      setStage('result')
      setShowResult(true)
    }, 1700)
  }

  const handleRetry = () => {
    setStage('encounter')
    setIsPokeballThrown(false)
    setIsPokemonCaptured(false)
    setShowResult(false)
    setHasEntered(false)
    setTimeout(() => setHasEntered(true), 500)
  }

  if (!isOpen || !mounted) return null

  const typeColor = (TYPE_COLORS as Record<string, string>)[pokemon.types[0]] ?? '#6B7280'

  const stageGradient: Record<CatchStage, string> = {
    encounter: 'from-sky-400 via-sky-300 to-emerald-400 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
    throwing:  'from-sky-400 via-red-300/40 to-emerald-400 dark:from-slate-900 dark:via-red-950/40 dark:to-slate-900',
    shaking:   'from-sky-400 via-sky-300 to-emerald-400 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
    result:    isSuccess
      ? 'from-sky-400 via-emerald-300/40 to-emerald-400 dark:from-slate-900 dark:via-emerald-950/30 dark:to-slate-900'
      : 'from-sky-400 via-sky-300 to-emerald-400 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900',
  }

  return createPortal(
    <div className={cn(
      "fixed inset-0 z-[100] flex flex-col bg-slate-900", // Fallback background
      isCameraShaking && "animate-camera-shake"
    )}>

      {/* LAYER 1 — Base gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${stageGradient[stage]} transition-all duration-700`} />

      {/* LAYER 2 — Rotating large Pokéball watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/icons/pokeball.svg"
          alt=""
          aria-hidden="true"
          className="w-[380px] h-[380px] opacity-[0.08] dark:opacity-[0.04] animate-slow-rotate"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>

      {/* LAYER 3 — Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float-up"
            style={{
              left: `${10 + i * 11}%`,
              bottom: `${20 + (i % 3) * 10}%`,
              backgroundColor: typeColor,
              opacity: 0.4,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2.5 + (i % 3) * 0.8}s`,
              '--drift': `${(i % 2 === 0 ? 1 : -1) * (8 + i * 3)}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* LAYER 4 — Arena flash overlay */}
      {isFlashing && (
        <div className="absolute inset-0 bg-white animate-arena-flash z-10 pointer-events-none" />
      )}

      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="
          absolute top-4 left-4 z-20
          w-10 h-10 rounded-full
          bg-white/10 backdrop-blur-sm
          border border-white/10
          flex items-center justify-center
          text-white/70 hover:text-white
          hover:bg-white/20
          transition-all duration-150
        "
        aria-label="Exit catch arena"
      >
        <X size={18} />
      </button>

      {/* STAGE LABEL */}
      <div className="absolute top-4 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <span
          className="text-[11px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
          style={{
            color: typeColor,
            backgroundColor: `${typeColor}15`,
            border: `1px solid ${typeColor}30`,
          }}
        >
          {stage === 'encounter' && `Wild ${capitalize(pokemon.name)}!`}
          {stage === 'throwing' && 'Throwing...'}
          {stage === 'shaking' && 'Come on...'}
          {(stage === 'result' && isSuccess) && 'Gotcha!'}
          {(stage === 'result' && !isSuccess) && 'Oh no!'}
        </span>
      </div>

      {/* POKÉMON SCENE AREA (top 60%) */}
      <div className="flex-1 flex flex-col items-center justify-center relative pt-16 pb-4">
        
        {/* TYPE GLOW — radial behind Pokémon */}
        <div
          className="absolute w-56 h-56 rounded-full animate-glow-pulse pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${typeColor}55 0%, ${typeColor}11 50%, transparent 70%)`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
          }}
        />

        {/* PULSE RINGS */}
        {stage === 'encounter' && (
          <div
            className="absolute pointer-events-none"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -60%)' }}
          >
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="absolute w-32 h-32 rounded-full border-2 pointer-events-none"
                style={{
                  borderColor: `${typeColor}60`,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: `pulse-ring 1.8s ease-out infinite ${i * 0.6}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* POKÉMON */}
        <div className={cn(
          "relative z-10",
          !hasEntered && "animate-pokemon-enter",
          hasEntered && stage === 'encounter' && "animate-pokemon-float",
          isPokemonCaptured && "animate-pokemon-captured"
        )}>
          <PokemonSprite
            id={pokemon.id}
            name={pokemon.name}
            size={140}
            className="drop-shadow-[0_0_32px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* GROUND SHADOW */}
        <div
          className="w-28 h-4 rounded-full mt-2 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, ${typeColor}40 0%, transparent 70%)`,
          }}
        />

        {/* POKÉMON NAME + TYPES */}
        <div className="flex flex-col items-center gap-2 mt-3 z-10">
          <h2 className="text-slate-900 dark:text-white font-display text-xl font-extrabold drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {capitalize(pokemon.name)}
          </h2>
          <div className="flex gap-1.5">
            {pokemon.types.map(t => (
              <TypeBadge key={t} type={t} size="sm" />
            ))}
          </div>
        </div>

        {/* POKÉBALL THROW */}
        {stage === 'throwing' && (
          <div className={cn(
            "absolute z-20 w-12 h-12",
            "bottom-4 left-8",
            isPokeballThrown && "animate-pokeball-throw"
          )}>
            <img
              src="/icons/pokeball.svg"
              alt="Pokéball"
              className="w-full h-full drop-shadow-[0_4px_12px_rgba(220,38,38,0.6)]"
            />
          </div>
        )}

        {/* POKÉBALL SHAKING */}
        {stage === 'shaking' && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-14 h-14 animate-pokeball-shake">
            <img
              src="/icons/pokeball.svg"
              alt="Pokéball shaking"
              className="w-full h-full drop-shadow-[0_4px_16px_rgba(220,38,38,0.5)]"
            />
            {/* Shake attempt dots */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1">
              {[0,1,2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-slate-900/60 dark:bg-white/60"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* POKÉBALL CAUGHT */}
        {stage === 'result' && isSuccess && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-14 h-14">
            <img
              src="/icons/pokeball.svg"
              alt="Pokéball caught"
              className="w-full h-full drop-shadow-[0_4px_16px_rgba(220,38,38,0.5)]"
            />
          </div>
        )}
      </div>

      {/* BOTTOM PANEL */}
      <div className="relative">
        {/* Type color accent line at top of panel */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{ background: `linear-gradient(to right, transparent, ${typeColor}, transparent)` }}
        />

        <div className={cn(
          "bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm",
          "rounded-t-[28px] px-6 pt-7 pb-8",
          "min-h-[38vh]",
          "flex flex-col items-center justify-center gap-4",
          "border-t border-slate-200 dark:border-white/5",
        )}>

          {/* STAGE: ENCOUNTER */}
          {stage === 'encounter' && (
            <div className="w-full flex flex-col items-center gap-4 animate-panel-rise">
              <div className="text-center">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  A wild <span className="text-slate-900 dark:text-white font-semibold">{capitalize(pokemon.name)}</span> appeared!
                </p>
                <p className="text-slate-500 text-xs mt-1">Do you want to catch it?</p>
              </div>

              <button
                onClick={startCatch}
                className="w-full h-13 bg-primary text-white rounded-full
                           font-semibold text-sm shadow-lg shadow-primary/40
                           flex items-center justify-center gap-2.5
                           hover:bg-primary-dark active:scale-95 transition-all"
              >
                <img src="/icons/pokeball.svg" alt="" aria-hidden="true"
                     className="w-5 h-5 brightness-0 invert" />
                Throw Poké Ball!
              </button>

              <button
                onClick={onClose}
                className="text-slate-500 text-sm hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                Run away
              </button>
            </div>
          )}

          {/* STAGE: THROWING */}
          {stage === 'throwing' && (
            <div className="flex flex-col items-center gap-4 animate-panel-rise">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center animate-pokeball"
                style={{ border: `2px solid ${typeColor}60` }}
              >
                <img src="/icons/pokeball.svg" alt="" aria-hidden="true"
                     className="w-8 h-8" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Pokéball is flying...</p>
            </div>
          )}

          {/* STAGE: SHAKING */}
          {stage === 'shaking' && (
            <div className="flex flex-col items-center gap-4 animate-panel-rise">
              <div className="flex gap-2 items-center">
                {[0,1,2].map(i => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full animate-bounce"
                    style={{
                      backgroundColor: typeColor,
                      animationDelay: `${i * 150}ms`,
                    }}
                  />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm tracking-wide">Come on... Come on...</p>
            </div>
          )}

          {/* STAGE: RESULT */}
          {stage === 'result' && (
            <ResultPanel
              isSuccess={isSuccess}
              pokemon={pokemon}
              typeColor={typeColor}
              onSave={onSave}
              onRetry={handleRetry}
              onClose={onClose}
            />
          )}

        </div>
      </div>
    </div>,
    document.body
  )
}

interface ResultPanelProps {
  isSuccess: boolean
  pokemon: { id: number; name: string; types: string[] }
  typeColor: string
  onSave: (nickname: string) => void
  onRetry: () => void
  onClose: () => void
}

function ResultPanel({ isSuccess, pokemon, typeColor, onSave, onRetry, onClose }: ResultPanelProps) {
  const [nickname, setNickname] = useState('')

  return (
    <div className="w-full flex flex-col items-center gap-4 animate-panel-rise relative">

      {/* Confetti burst — success only */}
      {isSuccess && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          {[...Array(16)].map((_, i) => {
            const angle = (i / 16) * 360
            const distance = 80 + Math.random() * 60
            const cx = `${Math.cos(angle * Math.PI / 180) * distance}px`
            const cy = `${Math.sin(angle * Math.PI / 180) * distance - 40}px`
            const cr = `${Math.random() * 360}deg`
            const colors = ['#DC2626','#FACC15','#10B981','#3B82F6','#A855F7','#F97316','#EC4899','#22C55E','#67E8F9','#F472B6']
            return (
              <div
                key={i}
                className="absolute animate-confetti-fall"
                style={{
                  left: '50%',
                  top: '20%',
                  width: i % 3 === 0 ? '8px' : '6px',
                  height: i % 3 === 0 ? '8px' : '10px',
                  borderRadius: i % 2 === 0 ? '50%' : '2px',
                  backgroundColor: colors[i % colors.length],
                  '--cx': cx,
                  '--cy': cy,
                  '--cr': cr,
                  animationDelay: `${i * 30}ms`,
                } as React.CSSProperties}
              />
            )
          })}
        </div>
      )}

      {/* Result icon with glow */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl relative"
        style={{
          backgroundColor: isSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
          boxShadow: isSuccess
            ? '0 0 24px rgba(16, 185, 129, 0.4)'
            : '0 0 24px rgba(239, 68, 68, 0.3)',
        }}
      >
        {isSuccess ? <HeartHandshake size={32} className="text-emerald-600 dark:text-emerald-400" /> : <HeartCrack size={32} className="text-red-600 dark:text-red-400" />}
      </div>

      {/* Result text */}
      <div className="text-center">
        <h3 className={cn(
          "font-display text-3xl font-extrabold",
          isSuccess ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
        )}>
          {isSuccess ? 'Gotcha!' : 'Oh no!'}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          {isSuccess
            ? `${capitalize(pokemon.name)} was caught!`
            : `${capitalize(pokemon.name)} broke free!`
          }
        </p>
      </div>

      {/* Nickname input (success only) */}
      {isSuccess && (
        <div className="w-full">
          <label className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5 block">
            Give it a nickname
          </label>
          <input
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder={capitalize(pokemon.name)}
            maxLength={20}
            className="w-full h-11 rounded-[10px] px-4
                       bg-slate-100 border border-slate-200 text-slate-900
                       dark:bg-slate-800 dark:border-slate-700 dark:text-white
                       placeholder:text-slate-400 dark:placeholder:text-slate-500
                       text-sm focus:outline-none focus:ring-2
                       focus:border-transparent transition-all"
            style={{ '--tw-ring-color': typeColor } as React.CSSProperties}
          />
        </div>
      )}

      {/* Action buttons */}
      {isSuccess ? (
        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={() => onSave(nickname || capitalize(pokemon.name))}
            className="w-full h-12 rounded-full font-semibold text-sm
                       text-white shadow-lg transition-all active:scale-95"
            style={{
              backgroundColor: '#DC2626',
              boxShadow: '0 4px 20px rgba(220, 38, 38, 0.4)',
            }}
          >
            Save to Pokédex
          </button>
          <button
            onClick={() => onSave(capitalize(pokemon.name))}
            className="w-full h-10 text-slate-500 text-sm
                       hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Skip nickname
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={onRetry}
            className="w-full h-12 bg-primary text-white rounded-full
                       font-semibold text-sm shadow-lg shadow-primary/30
                       active:scale-95 transition-all"
          >
            Try Again
          </button>
          <button
            onClick={onClose}
            className="w-full h-10 border border-slate-300 dark:border-slate-700 
                       text-slate-600 dark:text-slate-400
                       rounded-full text-sm hover:border-slate-400 dark:hover:border-slate-500
                       hover:text-slate-900 dark:hover:text-slate-200 transition-all"
          >
            Run away
          </button>
        </div>
      )}
    </div>
  )
}
