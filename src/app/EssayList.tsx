'use client'

import { useState } from 'react'
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

export default function EssayList({ essays }: EssayListProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const filteredEssays = essays.filter((essay) => essay.language === selectedLanguage)

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-serif mb-8">Literature Blog</h1>

      <div className="mb-4">
        <button
          onClick={() => setSelectedLanguage('en')}
          className={`mr-2 px-4 py-2 rounded ${selectedLanguage === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          English
        </button>
        <button
          onClick={() => setSelectedLanguage('he')}
          className={`px-4 py-2 rounded ${selectedLanguage === 'he' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          עברית
        </button>
      </div>

      <div className="space-y-6">
        {filteredEssays.map((essay) => (
          <div key={essay.slug} className="border-b pb-4">
            <h2 className="text-2xl font-serif">
              <Link href={`/essays/${essay.slug}`} className="hover:underline">
                {essay.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500">
              {essay.category} • {essay.language.toUpperCase()} • {essay.date}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}