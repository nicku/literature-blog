'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import EssayImage from './components/EssayImage'
import { t, type Lang } from '@/lib/i18n'

interface Essay {
  title: string;
  language: string;
  categories: string[];
  date: string;
  slug: string;
  image: string | null;
  content: string;
}

interface EssayListProps {
  essays: Essay[];
  lang: Lang;
}

function matchesSearch(essay: Essay, query: string): boolean {
  if (!query.trim()) return true
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
  const searchable = [
    essay.title,
    ...essay.categories,
    essay.content,
  ]
    .join(' ')
    .toLowerCase()
  return terms.every((term) => searchable.includes(term))
}

export default function EssayList({ essays, lang }: EssayListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEssays = useMemo(() => {
    return essays
      .filter((essay) => essay.language === lang)
      .filter((essay) => matchesSearch(essay, searchQuery))
  }, [essays, lang, searchQuery])

  const labels = t(lang).essays
  const isRtl = lang === "he"

  return (
    <main className="max-w-3xl mx-auto">
      <div className="paper rounded-xl p-6 sm:p-8" dir={isRtl ? "rtl" : "ltr"} lang={lang}>
        <h1 className="font-title text-4xl font-bold mb-4 text-start">{labels.title}</h1>
        <div className="rule my-6" role="presentation" />

        <div className="mb-6">
          <label htmlFor="essay-search" className="sr-only">
            {labels.searchPlaceholder}
          </label>
          <input
            id="essay-search"
            type="search"
            dir={lang === "he" ? "rtl" : "ltr"}
            placeholder={labels.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border text-foreground placeholder-[var(--foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
            style={{ borderColor: "var(--border)", background: "var(--background)" }}
            aria-label={labels.searchPlaceholder}
          />
        </div>

        {filteredEssays.length === 0 ? (
          <p className="py-6" style={{ color: "var(--foreground-muted)" }}>
            {searchQuery.trim()
              ? labels.noResults
              : labels.noEssays}
          </p>
        ) : (
          <div className="space-y-6">
            {filteredEssays.map((essay) => {
              const isRtl = essay.language === "he"
              return (
                <article
                  key={essay.slug}
                  dir={isRtl ? "rtl" : "ltr"}
                  lang={essay.language}
                  className="flex flex-col sm:flex-row gap-4 py-6 pl-4 sm:pl-5 rounded-r-lg border-l-2 -ml-px rtl:pl-0 rtl:pr-4 sm:rtl:pr-5 rtl:border-l-0 rtl:border-r-2 rtl:rounded-l-lg rtl:rounded-r-none rtl:-mr-px rtl:ml-0"
                  style={{ borderColor: "var(--accent)", background: "var(--background)" }}
                >
                  <Link
                    href={`/${lang}/essays/${essay.slug}`}
                    className="shrink-0 w-full sm:w-40 h-32 sm:h-28 relative rounded-lg overflow-hidden order-first sm:order-none"
                    style={{ background: "var(--background-accent)" }}
                  >
                    <EssayImage
                      src={essay.image}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 10rem"
                    />
                  </Link>
                  <div className="min-w-0 text-start">
                    <h2 className="font-title text-2xl font-bold">
                      <Link
                        href={`/${lang}/essays/${essay.slug}`}
                        className="hover:opacity-80 transition-opacity"
                        style={{ color: "var(--foreground)" }}
                      >
                        {essay.title}
                      </Link>
                    </h2>
                    <p className="text-sm mt-1" style={{ color: "var(--foreground-muted)" }}>
                      {essay.categories.join(' • ')} • {essay.language.toUpperCase()} • {essay.date}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
