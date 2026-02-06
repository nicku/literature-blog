import { remark } from "remark"
import html from "remark-html"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contactPath = path.join(process.cwd(), "src/content/contact.md")

function getContactContent() {
  if (!fs.existsSync(contactPath)) return null
  const fileContents = fs.readFileSync(contactPath, "utf8")
  const { data, content } = matter(fileContents)
  return { title: data.title ?? "Contact", content }
}

export default async function ContactPage() {
  const contactData = getContactContent()

  const content = contactData
    ? (await remark().use(html).process(contactData.content)).toString()
    : "<p>Edit <code>src/content/contact.md</code> to add your contact information.</p>"

  const title = contactData?.title ?? "Contact"

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
