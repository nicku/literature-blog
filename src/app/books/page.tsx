import { remark } from "remark"
import html from "remark-html"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const booksPath = path.join(process.cwd(), "src/content/books.md")

function getBooksContent() {
  if (!fs.existsSync(booksPath)) return null
  const fileContents = fs.readFileSync(booksPath, "utf8")
  const { data, content } = matter(fileContents)
  return { title: data.title ?? "Published Books", content }
}

export default async function BooksPage() {
  const booksData = getBooksContent()

  const content = booksData
    ? (await remark().use(html).process(booksData.content)).toString()
    : "<p>Edit <code>src/content/books.md</code> to add your published books.</p>"

  const title = booksData?.title ?? "Published Books"

  return (
    <main className="max-w-2xl mx-auto">
      <div className="paper rounded-xl p-6 sm:p-8">
        <h1 className="font-title text-4xl font-bold mb-4">{title}</h1>
        <div className="rule my-6" role="presentation" />
        <article
          className="prose prose-neutral max-w-none prose-headings:font-title prose-headings:font-bold prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </main>
  )
}
