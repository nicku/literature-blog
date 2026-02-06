'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About myself' },
  { href: '/essays', label: 'Essays' },
  { href: '/books', label: 'Published Books' },
  { href: '/contact', label: 'Contact' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="w-56 shrink-0 min-h-screen p-6"
      style={{
        borderRight: "1px solid var(--border)",
        background: "var(--background-accent)",
      }}
    >
      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "text-[var(--accent)] bg-[var(--paper)]"
                  : "text-[var(--foreground-muted)] hover:bg-[var(--paper)]/50 hover:text-[var(--foreground)]"
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
