import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SpaceBackground } from '@/components/space-background'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Lucas Romero — Full Stack Developer',
  // description:    'Desenvolvedor Full Stack apaixonado por criar soluções web modernas e eficientes.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-black text-white">
        <SpaceBackground />
        <Navbar />
        <main className="flex-1 pb-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
