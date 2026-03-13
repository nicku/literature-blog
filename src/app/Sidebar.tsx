'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { t, type Lang } from '@/lib/i18n'

const navKeys = ['home', 'about', 'essays', 'books', 'contact'] as const

function getHref(lang: Lang, key: string): string {
  const base = lang === 'he' ? '/he' : '/en'
  if (key === 'home') return base
  return `${base}/${key}`
}

interface SidebarProps {
  lang: Lang
}

export default function Sidebar({ lang }: SidebarProps) {
  const pathname = usePathname()
  const labels = t(lang).nav

  return (
    <aside
      className="w-56 shrink-0 min-h-screen p-6"
      style={{
        borderRight: "1px solid var(--border)",
        background: "var(--background-accent)",
      }}
    >
      <nav className="flex flex-col gap-1">
        {navKeys.map((key) => {
          const href = getHref(lang, key)
          const isActive = key === 'home'
            ? pathname === href || pathname === `/${lang}`
            : pathname.startsWith(href)
          return (
            <Link
              key={key}
              href={href}
              className={`px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "text-[var(--accent)] bg-[var(--paper)]"
                  : "text-[var(--foreground-muted)] hover:bg-[var(--paper)]/50 hover:text-[var(--foreground)]"
              }`}
            >
              {labels[key]}
            </Link>
          )
        })}
      </nav>
      <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex gap-2 text-sm">
          <Link
            href={pathname.replace(/^\/(he|en)/, lang === 'he' ? '/en' : '/he')}
            className="px-3 py-1.5 rounded-md font-medium hover:bg-[var(--paper)]/50 transition-colors"
            style={{ color: "var(--foreground-muted)" }}
          >
            {lang === 'he' ? 'English' : 'עברית'}
          </Link>
        </div>
      </div>
    </aside>
  )
}
