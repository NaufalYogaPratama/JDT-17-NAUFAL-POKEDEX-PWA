'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { capitalize } from '@/lib/utils'
import { usePokemonStore, CapturedPokemon } from '@/store/pokemon-store'

export interface ReleaseDialogProps {
  pokemon: CapturedPokemon | null
  isOpen: boolean
  onClose: () => void
}

export default function ReleaseDialog({ pokemon, isOpen, onClose }: ReleaseDialogProps) {
  const removeCapturedPokemon = usePokemonStore((state) => state.removeCapturedPokemon)

  const handleRelease = () => {
    if (!pokemon) return
    removeCapturedPokemon(pokemon.nickname)
    toast.info(`${pokemon.nickname} was released.`)
    onClose()
  }

  if (!pokemon) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[340px] rounded-[20px] p-6 gap-6 bg-white border border-slate-200 shadow-lg mx-auto focus-visible:outline-none">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="font-display text-lg font-bold text-slate-900">
            Release {pokemon.nickname}?
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500 leading-normal">
            This will remove {capitalize(pokemon.name)} from your Pokédex. This can't be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-col gap-2">
          <Button
            variant="destructive"
            onClick={handleRelease}
            className="w-full h-11 rounded-full font-semibold text-sm shadow-sm active:scale-[0.98] transition-transform"
          >
            Release
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full h-11 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-full font-semibold text-sm transition-colors"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
