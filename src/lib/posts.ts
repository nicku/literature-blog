import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Lang } from "./i18n"

const contentDir = path.join(process.cwd(), "src/content")
const essaysDirectory = path.join(contentDir, "essays")

function getContentPath(base: string, lang: Lang): string {
  const langPath = path.join(contentDir, `${base}-${lang}.md`)
  const fallbackPath = path.join(contentDir, `${base}.md`)
  if (fs.existsSync(langPath)) return langPath
  return fallbackPath
}

export function getBooksContent(lang: Lang) {
  const filePath = getContentPath("books", lang)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"))
  return {
    title: data.title ?? "Published Books",
    content,
  }
}

export function getContactContent(lang: Lang) {
  const filePath = getContentPath("contact", lang)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"))
  return {
    title: data.title ?? "Contact",
    email: data.email ?? null,
    content,
  }
}

export function getAboutContent(lang: Lang): string | null {
  const filePath = getContentPath("about", lang)
  if (!fs.existsSync(filePath)) return null
  const { content } = matter(fs.readFileSync(filePath, "utf8"))
  return content
}

export interface ArticleEntry {
  title: string
  description: string
  publication: string
  url: string
  date?: string
}

export function getArticlesContent(lang: Lang): { title: string; articles: ArticleEntry[] } | null {
  const filePath = getContentPath("articles", lang)
  if (!fs.existsSync(filePath)) return null
  const { data } = matter(fs.readFileSync(filePath, "utf8"))
  return {
    title: data.title ?? "Published Articles",
    articles: Array.isArray(data.articles) ? data.articles : [],
  }
}

export function getAllEssays() {
  const fileNames = fs.readdirSync(essaysDirectory)

  return fileNames.map((fileName) => {
    const fullPath = path.join(essaysDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const { data, content } = matter(fileContents)
    const slug = fileName.replace(/\.md$/, "")

    // Support both string and array for categories
    const categories = Array.isArray(data.category)
      ? data.category
      : data.category
        ? [data.category]
        : []

    return {
      title: data.title,
      language: data.language,
      categories,
      date: data.date,
      slug,
      image: data.image ?? null,
      content,
    }
  })
}

export function getEssayBySlug(slug: string) {
  const fullPath = path.join(essaysDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const { data, content } = matter(fileContents)

  // Support both string and array for categories
  const categories = Array.isArray(data.category)
    ? data.category
    : data.category
      ? [data.category]
      : []

  return {
    title: data.title,
    language: data.language,
    categories,
    date: data.date,
    slug,
    image: data.image ?? null,
    content,
  }
}
