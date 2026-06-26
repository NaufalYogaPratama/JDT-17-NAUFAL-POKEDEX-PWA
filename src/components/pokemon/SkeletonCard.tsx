import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonCard() {
  return (
    <div className="rounded-[14px] border border-slate-100 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 transition-colors duration-200">
      {/* Top area skeleton */}
      <Skeleton className="h-28 w-full rounded-none" />
      {/* Bottom area skeleton */}
      <div className="p-3 space-y-2">
        <Skeleton className="h-3 w-16 rounded-full" />
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-md" />
      </div>
    </div>
  )
}
