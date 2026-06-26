import { cn } from '@/lib/utils'

export interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 lg:pl-64 transition-colors duration-200">
      <main className={cn(
        "mx-auto w-full max-w-screen-xl",
        "pt-14 pb-20 px-4",
        "md:px-8",
        "lg:px-12 lg:pb-8",
        className
      )}>
        {children}
      </main>
    </div>
  )
}
