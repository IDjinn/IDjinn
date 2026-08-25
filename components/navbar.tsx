'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-tight text-white"
        >
          LR
        </Link>

        <ul className="flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <span className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-white/30 cursor-default select-none">
              Blog
              <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] leading-none text-white/50">
                soon
              </span>
            </span>
          </li>
        </ul>
      </nav>
    </header>
  )
}
