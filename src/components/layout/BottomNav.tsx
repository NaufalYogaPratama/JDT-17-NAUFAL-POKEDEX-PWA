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
      {/* Desktop Sidebar Nav */}
      <nav className="hidden lg:flex fixed left-0 top-14 h-[calc(100vh-56px)] w-64 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex-col px-3 py-4 gap-1 z-10 transition-colors duration-200">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
          
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors duration-200",
                isActive 
                  ? "bg-red-50 dark:bg-red-950/30 text-primary" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              )}
            >
              <Icon size={18} />
              {tab.label}
            </Link>
          )
        })}
        
        {/* Pokéball decoration at bottom of sidebar */}
        <div className="mt-auto flex justify-center pb-4">
          <img 
            src="/icons/pokeball.svg" 
            alt="" 
            aria-hidden="true"
            className="w-16 h-16 opacity-10 pointer-events-none select-none"
          />
        </div>
      </nav>

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
