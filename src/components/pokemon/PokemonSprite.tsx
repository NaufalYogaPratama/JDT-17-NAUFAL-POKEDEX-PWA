'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn, getOfficialArtwork, getShowdownGif } from '@/lib/utils'

interface PokemonSpriteProps {
  id: number
  name: string
  size?: number           // used for fixed-size contexts (cards, arena)
  variant?: 'fixed' | 'fluid'  // NEW — fluid for detail page hero
  className?: string
  priority?: boolean
}

export function PokemonSprite({ id, name, size = 120, variant = 'fixed', className, priority }: PokemonSpriteProps) {
  const [gifFailed, setGifFailed] = useState(false)

  if (variant === 'fluid') {
    if (gifFailed) {
      return (
        <Image
          src={getOfficialArtwork(id)}
          alt={`${name} artwork`}
          width={240}
          height={240}
          className={cn(
            'max-h-[260px] max-w-[260px] w-auto h-auto object-contain',
            'drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)]',
            className
          )}
          priority={priority}
        />
      )
    }

    return (
      <img
        src={getShowdownGif(id)}
        alt={`${name} animated sprite`}
        className={cn(
          'max-h-[260px] max-w-[260px] w-auto h-auto object-contain pixelated scale-[2.5]',
          'drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)]',
          'relative z-10',
          className
        )}
        style={{ imageRendering: 'pixelated' }}
        onError={() => setGifFailed(true)}
      />
    )
  }

  if (gifFailed) {
    return (
      <Image
        src={getOfficialArtwork(id)}
        alt={`${name} artwork`}
        width={size}
        height={size}
        className={cn('object-contain', className)}
        priority={priority}
      />
    )
  }

  return (
    <img
      src={getShowdownGif(id)}
      alt={`${name} animated sprite`}
      width={size}
      height={size}
      className={cn('object-contain pixelated', className)}
      onError={() => setGifFailed(true)}
      style={{ imageRendering: 'pixelated' }}
    />
  )
}
