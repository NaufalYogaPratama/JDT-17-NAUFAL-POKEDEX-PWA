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
      <nav className="
        lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-52 h-15
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-700
        rounded-4xl shadow-lg dark:shadow-slate-900/50
        z-20 flex items-center justify-around
        transition-colors duration-200 pl-4 pr-4
      ">
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
