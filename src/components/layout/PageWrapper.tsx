import { cn } from '@/lib/utils'

export interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 transition-colors duration-200">
      <main className={cn(
        "mx-auto w-full",
        "pt-20 pb-20 px-4",
        "md:px-8",
        "lg:pl-24 lg:pr-8 lg:pb-8 lg:pt-20",
        className
      )}>
        <div className="max-w-screen-xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
