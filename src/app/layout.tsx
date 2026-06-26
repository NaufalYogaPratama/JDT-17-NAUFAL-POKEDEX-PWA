import type { Metadata } from 'next'
import { Nunito, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import AppHeader from '@/components/layout/AppHeader'
import BottomNav from '@/components/layout/BottomNav'
import StorageInitializer from '@/components/providers/StorageInitializer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { FloatingSidebar } from '@/components/layout/FloatingSidebar'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'PokéDex PWA',
  description: 'Catch. Collect. Master.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${inter.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <StorageInitializer />
          <AppHeader />
          <FloatingSidebar />
          <Providers>{children}</Providers>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}

