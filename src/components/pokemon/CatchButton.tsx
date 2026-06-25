import { Zap } from 'lucide-react'

export interface CatchButtonProps {
  pokemonId: number
  pokemonName: string
  onCatch: () => void
  disabled?: boolean
  isThrowing?: boolean
}

export default function CatchButton({
  pokemonId,
  pokemonName,
  onCatch,
  disabled = false,
  isThrowing = false,
}: CatchButtonProps) {
  return (
    <button
      type="button"
      onClick={onCatch}
      disabled={disabled || isThrowing}
      className={`w-full h-12 flex items-center justify-center rounded-full font-semibold text-sm transition-all duration-150 ${
        disabled || isThrowing
          ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          : 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-red-500/30 active:scale-[0.98]'
      }`}
    >
      {isThrowing ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-transparent mr-2" />
          Throwing...
        </>
      ) : (
        <>
          <Zap size={16} className="mr-2 fill-current" />
          Throw Poké Ball!
        </>
      )}
    </button>
  )
}
