'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn, getOfficialArtwork, getShowdownGif } from '@/lib/utils'

interface PokemonSpriteProps {
  id: number
  name: string
  size?: number        // px, default 120
  className?: string
  priority?: boolean
}

export function PokemonSprite({ id, name, size = 120, className, priority }: PokemonSpriteProps) {
  const [gifFailed, setGifFailed] = useState(false)

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
