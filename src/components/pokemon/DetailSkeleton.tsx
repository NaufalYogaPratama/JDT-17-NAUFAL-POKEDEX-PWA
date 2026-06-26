import { Skeleton } from '@/components/ui/skeleton'

export default function DetailSkeleton() {
  return (
    <div className="w-full pb-28">
      {/* Artwork Area Skeleton */}
      <Skeleton className="h-60 w-full rounded-none" />

      {/* Content Skeleton */}
      <div className="px-4 mt-4 space-y-6">
        {/* Name */}
        <Skeleton className="h-8 w-40 rounded-md" />

        {/* Type badges */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>

        {/* Height/Weight pills */}
        <div className="flex gap-4">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>

        <hr className="border-slate-100 dark:border-slate-700 my-5 transition-colors duration-200" />

        {/* Stats Section */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-20 rounded-md" /> {/* Section Label */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 w-full">
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-4 w-8 rounded-md" />
              <Skeleton className="h-2 flex-1 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
