'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BottomNav() {
  const pathname = usePathname()

  const tabs = [
    {
      label: 'Home',
      href: '/',
      icon: House,
    },
    {
      label: 'My Pokémon',
      href: '/my-pokemon',
      icon: Heart,
    },
  ]

  return (
    <>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 w-full h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 z-20 flex items-center justify-around transition-colors duration-200">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive =
            tab.href === '/'
              ? pathname === '/'
              : pathname.startsWith(tab.href)

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 h-full flex flex-col items-center justify-center transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium mt-0.5">{tab.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
