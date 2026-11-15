"use client"

import { useMemo, useState } from "react"
import PublicationImage from "./PublicationImage"
import type { Lang } from "@/lib/i18n"
import type { LectureCategory, LectureEntry } from "@/lib/posts"

const categoryOrder: LectureCategory[] = [
  "technology",
  "literature",
  "children-literature",
]

type Labels = {
  noItems: string
  order: string
  searchPlaceholder: string
  allCategories: string
  noResults: string
  categories: Record<LectureCategory, string>
}

type Props = {
  items: LectureEntry[]
  email?: string | null
  lang: Lang
  labels: Labels
}

export default function LectureList({ items, email, lang, labels }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<LectureCategory | null>(null)
  const isRtl = lang === "he"

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase(lang)

    return items.filter((lecture) => {
      if (activeCategory && !lecture.categories.includes(activeCategory)) return false
      if (!query) return true

      const searchable = [
        lecture.title,
        lecture.description,
        ...lecture.categories.map((category) => labels.categories[category]),
      ]
        .join(" ")
        .toLocaleLowerCase(lang)

      return searchable.includes(query)
    })
  }, [activeCategory, items, labels.categories, lang, searchQuery])

  function getBookingHref(lectureTitle: string) {
    const rtlMark = "\u200F"
    const subject = isRtl
      ? `${rtlMark}הזמנת הרצאה: ${lectureTitle}`
      : `Lecture booking: ${lectureTitle}`
    const body = isRtl
      ? [
          "היי!",
          `אשמח לתאם איתך את ההרצאה הבאה: ״${lectureTitle}״.`,
          "אשמח לקבל פרטים נוספים על מועדים, מיקום ועלות.",
          "תודה!",
        ].map((line) => `${rtlMark}${line}`).join("\n\n")
      : `Hi!\n\nI would like to schedule the following lecture with you: "${lectureTitle}".\n\nI would be happy to receive more information about available dates, location, and pricing.\n\nThank you!`

    return `mailto:${email ?? ""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  if (items.length === 0) {
    return <p className="text-[var(--foreground-muted)]">{labels.noItems}</p>
  }

  return (
    <>
      <div className="mb-7 space-y-4">
        <label htmlFor="lecture-search" className="sr-only">
          {labels.searchPlaceholder}
        </label>
        <input
          id="lecture-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={labels.searchPlaceholder}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-accent)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
        />
        <div className="flex flex-wrap gap-2" aria-label={labels.searchPlaceholder}>
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            aria-pressed={activeCategory === null}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${activeCategory === null ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--border)] bg-[var(--background-accent)] hover:border-[var(--accent)]"}`}
          >
            {labels.allCategories}
          </button>
          {categoryOrder.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${activeCategory === category ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--border)] bg-[var(--background-accent)] hover:border-[var(--accent)]"}`}
            >
              {labels.categories[category]}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-[var(--foreground-muted)]">{labels.noResults}</p>
      ) : (
        <ul className="space-y-6">
          {filteredItems.map((lecture) => (
            <li
              key={lecture.title}
              className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background-accent)]"
            >
              <div className={`flex flex-col ${isRtl ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
                <div className="relative aspect-[4/3] w-full shrink-0 sm:w-56">
                  <PublicationImage src={lecture.image} alt={lecture.title} />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-3 p-5">
                  <div className="flex flex-wrap gap-2">
                    {lecture.categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className="rounded-full bg-[var(--background)] px-2.5 py-1 text-xs text-[var(--foreground-muted)] transition hover:text-[var(--accent)]"
                      >
                        {labels.categories[category]}
                      </button>
                    ))}
                  </div>
                  <h2 className="font-title text-2xl font-bold leading-snug">
                    {lecture.title}
                  </h2>
                  <p className="leading-relaxed text-[var(--foreground-muted)]">
                    {lecture.description}
                  </p>
                  {email && (
                    <a
                      href={getBookingHref(lecture.title)}
                      className="mt-2 inline-flex w-fit rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    >
                      {labels.order}
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
