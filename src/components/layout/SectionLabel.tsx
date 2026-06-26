export interface SectionLabelProps {
  children: React.ReactNode
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-3 transition-colors duration-200">
      {children}
    </p>
  )
}
