export interface SectionLabelProps {
  children: React.ReactNode
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mb-3">
      {children}
    </p>
  )
}
