export interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <main className={`pt-14 pb-20 px-4 min-h-screen bg-[#F8FAFC] ${className}`}>
      {children}
    </main>
  )
}
