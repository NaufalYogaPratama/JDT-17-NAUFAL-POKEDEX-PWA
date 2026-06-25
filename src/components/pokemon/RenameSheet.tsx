'use client'

import { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { capitalize } from '@/lib/utils'
import { usePokemonStore, CapturedPokemon } from '@/store/pokemon-store'

export interface RenameSheetProps {
  pokemon: CapturedPokemon | null
  isOpen: boolean
  onClose: () => void
}

export default function RenameSheet({ pokemon, isOpen, onClose }: RenameSheetProps) {
  const [nickname, setNickname] = useState('')
  const renameCapturedPokemon = usePokemonStore((state) => state.renameCapturedPokemon)

  useEffect(() => {
    if (isOpen && pokemon) {
      setNickname(pokemon.nickname)
    }
  }, [isOpen, pokemon])

  const handleSave = () => {
    if (!pokemon) return
    const finalNickname = nickname.trim() || pokemon.name
    renameCapturedPokemon(pokemon.nickname, finalNickname)
    toast.success(`Renamed to ${finalNickname}!`)
    onClose()
  }

  if (!pokemon) return null

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-[20px] px-6 pb-8 pt-6 max-w-md mx-auto w-full border-t border-slate-200 shadow-md bg-white focus-visible:outline-none"
      >
        <SheetHeader className="mb-4">
          <SheetTitle className="font-display text-lg font-bold text-slate-900">Rename Pokémon</SheetTitle>
          <SheetDescription className="text-slate-500 text-xs">
            Change the nickname of your {capitalize(pokemon.name)}.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rename-input" className="text-xs font-semibold text-slate-500">
              New Nickname
            </Label>
            <Input
              id="rename-input"
              type="text"
              maxLength={20}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={capitalize(pokemon.name)}
              className="w-full h-11 bg-white border border-slate-200 rounded-[10px] text-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary focus-visible:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={handleSave}
              className="w-full h-12 bg-primary hover:bg-primary-dark text-white rounded-full font-semibold text-sm shadow-md active:scale-[0.98] transition-transform"
            >
              Save Nickname
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full h-12 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-full font-semibold text-sm transition-colors"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
