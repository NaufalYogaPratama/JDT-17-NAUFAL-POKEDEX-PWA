'use client'

import { useEffect, useState } from 'react'

export interface StatBarProps {
  label: string
  value: number
  max?: number
}

export default function StatBar({ label, value, max = 255 }: StatBarProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  let colorClass = 'bg-red-500'
  if (value >= 120) {
    colorClass = 'bg-blue-500'
  } else if (value >= 80) {
    colorClass = 'bg-emerald-500'
  } else if (value >= 50) {
    colorClass = 'bg-amber-400'
  }

  return (
    <div className="flex items-center gap-3 w-full">
      <span className="w-20 shrink-0 uppercase text-[11px] font-medium tracking-wider text-slate-500">
        {label}
      </span>
      <span className="w-8 shrink-0 text-right font-mono text-[13px] text-slate-700">
        {value}
      </span>
      <div
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}: ${value}`}
        className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"
      >
        <div
          className={`h-full rounded-full ${colorClass} ${
            mounted ? 'animate-stat-fill' : 'w-0'
          }`}
          style={{
            '--stat-width': `${percentage}%`,
            width: mounted ? 'var(--stat-width)' : '0%',
          } as React.CSSProperties}
        />
      </div>
    </div>
  )
}
