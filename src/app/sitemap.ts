import type { MetadataRoute } from "next"
import { getAllEssays } from "@/lib/posts"
import { languages } from "@/lib/i18n"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://literatureblognick.com"

const staticPaths = ["", "/about", "/books", "/contact", "/essays"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const essays = getAllEssays()

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ]

  for (const lang of languages) {
    for (const path of staticPaths) {
      const url = path ? `/${lang}${path}` : `/${lang}`
      entries.push({
        url: `${baseUrl}${url}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      })
    }

    for (const essay of essays) {
      if (essay.language === lang) {
        const date = essay.date ? new Date(essay.date) : null
        entries.push({
          url: `${baseUrl}/${lang}/essays/${essay.slug}`,
          lastModified: date && !Number.isNaN(date.getTime()) ? date : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })
      }
    }
  }

  return entries
}
