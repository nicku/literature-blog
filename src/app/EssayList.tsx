'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface Essay {
  title: string;
  language: string;
  category: string;
  date: string;
  slug: string;
  content: string;
}

interface EssayListProps {
  essays: Essay[];
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
    essay.category,
    essay.content,
  ]
    .join(' ')
    .toLowerCase()
  return terms.every((term) => searchable.includes(term))
}

export default function EssayList({ essays }: EssayListProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEssays = useMemo(() => {
    return essays
      .filter((essay) => essay.language === selectedLanguage)
      .filter((essay) => matchesSearch(essay, searchQuery))
  }, [essays, selectedLanguage, searchQuery])

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="font-title text-4xl font-bold mb-8">Essays</h1>

      <div className="mb-6">
        <label htmlFor="essay-search" className="sr-only">
          Search essays by category or words
        </label>
        <input
          id="essay-search"
          type="search"
          placeholder="Search by category or words in essays..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-foreground/20 bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/30 focus:border-foreground/40"
          aria-label="Search essays by category or words"
        />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="text-sm text-foreground/70">Language:</span>
        <button
          onClick={() => setSelectedLanguage('en')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedLanguage === 'en' ? 'bg-blue-500 text-white' : 'bg-foreground/10 text-foreground hover:bg-foreground/15'}`}
        >
          English
        </button>
        <button
          onClick={() => setSelectedLanguage('he')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedLanguage === 'he' ? 'bg-blue-500 text-white' : 'bg-foreground/10 text-foreground hover:bg-foreground/15'}`}
        >
          עברית
        </button>
      </div>

      {filteredEssays.length === 0 ? (
        <p className="text-foreground/70 py-4">
          {searchQuery.trim()
            ? 'No essays match your search. Try different words or categories.'
            : 'No essays in this language yet.'}
        </p>
      ) : (
        <div className="space-y-6">
          {filteredEssays.map((essay) => (
            <div key={essay.slug} className="border-b border-foreground/10 pb-4">
              <h2 className="font-title text-2xl font-bold">
                <Link href={`/essays/${essay.slug}`} className="hover:underline">
                  {essay.title}
                </Link>
              </h2>
              <p className="text-sm text-foreground/60">
                {essay.category} • {essay.language.toUpperCase()} • {essay.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}