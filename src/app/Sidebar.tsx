'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About myself' },
  { href: '/essays', label: 'Essays' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 border-r border-foreground/10 bg-foreground/5 min-h-screen p-6">
      <nav className="flex flex-col gap-2">
        {navItems.map(({ href, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-foreground/15 text-foreground'
                  : 'text-foreground/80 hover:bg-foreground/10 hover:text-foreground'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
