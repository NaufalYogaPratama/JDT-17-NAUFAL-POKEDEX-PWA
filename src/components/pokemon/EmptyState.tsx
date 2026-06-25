'use client'

import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface EmptyStateProps {
  message: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-sm mx-auto w-full col-span-2">
      <SearchX size={48} className="text-slate-300 mb-4" />
      <h3 className="font-display text-base font-semibold text-slate-500 mb-4">
        {message}
      </h3>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-primary hover:bg-primary-dark text-white rounded-full font-semibold px-6 shadow-sm active:scale-[0.98] transition-transform"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
