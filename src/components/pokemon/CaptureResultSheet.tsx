'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { capitalize } from '@/lib/utils'

export interface CaptureResultSheetProps {
  isOpen: boolean
  onClose: () => void
  isSuccess: boolean
  pokemon: { id: number; name: string; types: string[]; spriteUrl: string }
  onSave: (nickname: string) => void
  onRetry: () => void
}

export default function CaptureResultSheet({
  isOpen,
  onClose,
  isSuccess,
  pokemon,
  onSave,
  onRetry,
}: CaptureResultSheetProps) {
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    if (isOpen) {
      setNickname('')
    }
  }, [isOpen])

  const handleSave = () => {
    const finalNickname = nickname.trim() || pokemon.name
    onSave(finalNickname)
  }

  const handleSkip = () => {
    onSave(pokemon.name)
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-[20px] px-6 pb-8 pt-6 max-w-md mx-auto w-full border-t border-slate-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-900 focus-visible:outline-none transition-colors duration-200"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Capture Result</SheetTitle>
          <SheetDescription>
            {isSuccess ? `${pokemon.name} was caught!` : `${pokemon.name} broke free!`}
          </SheetDescription>
        </SheetHeader>

        {/* Artwork Area (centered) */}
        <div
          className={`w-full h-36 rounded-[14px] flex items-center justify-center p-4 mb-4 transition-colors duration-300 ${
            isSuccess ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-red-50 dark:bg-red-950/30'
          }`}
        >
          <div className="relative w-32 h-32 flex items-center justify-center">
            <Image
              src={pokemon.spriteUrl}
              alt={pokemon.name}
              width={128}
              height={128}
              className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            />
          </div>
        </div>

        {/* Result Heading */}
        <div className="text-center mb-6">
          <h2
            className={`font-display text-2xl font-extrabold ${
              isSuccess ? 'text-emerald-700' : 'text-red-600'
            }`}
          >
            {isSuccess ? 'Gotcha!' : 'Oh no!'}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 transition-colors duration-200">
            {capitalize(pokemon.name)}{' '}
            {isSuccess ? 'was caught!' : 'broke free!'}
          </p>
        </div>

        {/* Success Nickname input & Save actions */}
        {isSuccess ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-200">
                Give it a nickname
              </Label>
              <Input
                id="nickname"
                type="text"
                maxLength={20}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={capitalize(pokemon.name)}
                className="w-full h-11 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[10px] text-sm dark:text-slate-100 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 focus-visible:outline-none transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                onClick={handleSave}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-sm shadow-md active:scale-[0.98] transition-transform"
              >
                Save to Pokédex
              </Button>
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="w-full h-12 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full font-semibold text-sm transition-colors duration-200"
              >
                Skip nickname
              </Button>
            </div>
          </div>
        ) : (
          /* Failure Retry actions */
          <div className="flex flex-col gap-2">
            <Button
              onClick={onRetry}
              className="w-full h-12 bg-primary hover:bg-primary-dark text-white rounded-full font-semibold text-sm shadow-md active:scale-[0.98] transition-transform"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full h-12 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full font-semibold text-sm transition-colors duration-200"
            >
              Go Back
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
