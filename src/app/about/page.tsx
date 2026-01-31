import { remark } from "remark"
import html from "remark-html"
import { getAboutContent } from "@/lib/posts"

export default async function AboutPage() {
  const rawContent = getAboutContent()

  const content = rawContent
    ? (await remark().use(html).process(rawContent)).toString()
    : "<p>Edit <code>src/content/about.md</code> to add information about yourself.</p>"

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="font-title text-4xl font-bold mb-6">About myself</h1>
      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </main>
  )
}
