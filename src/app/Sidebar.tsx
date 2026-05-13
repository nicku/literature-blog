'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { t, type Lang } from '@/lib/i18n'

const navKeys = ['home', 'about', 'essays', 'books', 'articles', 'contact'] as const

function getHref(lang: Lang, key: string): string {
  const base = lang === 'he' ? '/he' : '/en'
  if (key === 'home') return base
  return `${base}/${key}`
}

/** Get the counterpart essay slug when switching language (e.g. Coelho-he <-> Coelho-en) */
function getCounterpartEssaySlug(slug: string, targetLang: Lang): string {
  if (slug.endsWith('-he')) {
    return targetLang === 'en' ? slug.replace(/-he$/, '-en') : slug
  }
  if (slug.endsWith('-en')) {
    return targetLang === 'he' ? slug.replace(/-en$/, '-he') : slug
  }
  return slug
}

function getLangSwitchHref(pathname: string, currentLang: Lang): string {
  const targetLang: Lang = currentLang === 'he' ? 'en' : 'he'
  const base = `/${targetLang}`

  // Essay page: /he/essays/Coelho-he or /en/essays/Coelho-en
  const essayMatch = pathname.match(/^\/(he|en)\/essays\/(.+)$/)
  if (essayMatch) {
    const slug = essayMatch[2]
    const counterpartSlug = getCounterpartEssaySlug(slug, targetLang)
    return `${base}/essays/${counterpartSlug}`
  }

  return pathname.replace(/^\/(he|en)/, base)
}

interface SidebarProps {
  lang: Lang
  onNavigate?: () => void
}

export default function Sidebar({ lang, onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const labels = t(lang).nav
  const isRtl = lang === 'he'

  return (
    <div className="flex flex-col">
      <nav
        dir={isRtl ? 'rtl' : 'ltr'}
        lang={lang}
        className="flex flex-col gap-0.5"
      >
        {navKeys.map((key) => {
          const href = getHref(lang, key)
          const isActive = key === 'home'
            ? pathname === href || pathname === `/${lang}`
            : pathname.startsWith(href)
          return (
            <Link
              key={key}
              href={href}
              onClick={onNavigate}
              className={`rounded-xl px-4 py-3 text-[0.9375rem] font-medium transition-all duration-200 text-start ${
                isActive
                  ? "text-[var(--accent)]"
                  : "text-[var(--foreground-muted)] hover:bg-[var(--background-accent)]/60 hover:text-[var(--foreground)]"
              }`}
              style={
                isActive
                  ? {
                      background: 'var(--background-accent)',
                      boxShadow: 'inset 0 0 0 1px var(--border)',
                    }
                  : undefined
              }
            >
              {labels[key]}
            </Link>
          )
        })}
      </nav>
      <div
        className="mt-8 pt-6"
        style={{
          borderTop: '1px solid var(--border)',
        }}
      >
        <Link
          href={getLangSwitchHref(pathname, lang)}
          onClick={onNavigate}
          dir="ltr"
          className="inline-flex rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-[var(--background-accent)]"
          style={{ color: 'var(--foreground-muted)' }}
        >
          {lang === 'he' ? 'English' : 'עברית'}
        </Link>
      </div>
    </div>
  )
}
