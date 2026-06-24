import { TYPE_COLORS, getTypeTextColor } from '@/lib/type-colors'

export interface TypeBadgeProps {
  type: string
  size?: 'sm' | 'md'
}

export default function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const normalizedType = type.toLowerCase()
  const baseColor = TYPE_COLORS[normalizedType] || '#9CA3AF'
  const textColor = getTypeTextColor(normalizedType)

  // '26' is hex for 15% opacity, '4d' is hex for 30% opacity
  const bgHex = baseColor + '26'
  const borderHex = baseColor + '4d'

  const sizeClasses =
    size === 'sm'
      ? 'px-2 py-0.5 text-[11px] font-bold tracking-wider'
      : 'px-3 py-1 text-xs font-bold tracking-wider'

  return (
    <span
      role="img"
      aria-label={`${type} type`}
      className={`inline-flex items-center justify-center uppercase font-mono rounded-md border ${sizeClasses}`}
      style={{
        backgroundColor: bgHex,
        borderColor: borderHex,
        color: textColor,
      }}
    >
      {type}
    </span>
  )
}
