import fs from "fs"
import path from "path"
import matter from "gray-matter"

const essaysDirectory = path.join(process.cwd(), "src/content/essays")
const aboutPath = path.join(process.cwd(), "src/content/about.md")

export function getAboutContent(): string | null {
  if (!fs.existsSync(aboutPath)) return null
  const fileContents = fs.readFileSync(aboutPath, "utf8")
  const { content } = matter(fileContents)
  return content
}

export function getAllEssays() {
  const fileNames = fs.readdirSync(essaysDirectory)

  return fileNames.map((fileName) => {
    const fullPath = path.join(essaysDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const { data, content } = matter(fileContents)
    const slug = fileName.replace(/\.md$/, "")

    return {
      title: data.title,
      language: data.language,
      category: data.category,
      date: data.date,
      slug,
      content,
    }
  })
}

export function getEssayBySlug(slug: string) {
  const fullPath = path.join(essaysDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const { data, content } = matter(fileContents)

  return {
    title: data.title,
    language: data.language,
    category: data.category,
    date: data.date,
    slug,
    content,
  }
}
