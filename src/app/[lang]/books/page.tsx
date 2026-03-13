import { remark } from "remark"
import html from "remark-html"
import { getBooksContent } from "@/lib/posts"
import { t, type Lang } from "@/lib/i18n"

/** Add target and rel to external links so they open in a new tab and are safe. */
function addExternalLinkAttrs(htmlContent: string): string {
  return htmlContent.replace(
    /<a\s+([^>]*?)href="([^"]*)"([^>]*)>/gi,
    (_, before, href, after) => {
      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//")
      if (!isExternal) return `<a ${before}href="${href}"${after}>`
      const hasTarget = /target=/i.test(before + after)
      const hasRel = /rel=/i.test(before + after)
      const target = hasTarget ? "" : ' target="_blank"'
      const rel = hasRel ? "" : ' rel="noopener noreferrer"'
      const linkClass = ' class="book-purchase-link"'
      const hasClass = /class=/i.test(before + after)
      const cls = hasClass ? "" : linkClass
      return `<a ${before}href="${href}"${target}${rel}${cls}${after}>`
    }
  )
}

type Props = {
  params: Promise<{ lang: string }>
}

export default async function BooksPage({ params }: Props) {
  const { lang } = await params
  const booksData = getBooksContent(lang as Lang)

  let content = booksData
    ? (await remark().use(html).process(booksData.content)).toString()
    : `<p>Edit <code>src/content/books-${lang}.md</code> to add your published books.</p>`

  content = addExternalLinkAttrs(content)

  const title = booksData?.title ?? t(lang as Lang).nav.books
  const isRtl = lang === "he"

  return (
    <main className="max-w-2xl mx-auto">
      <div className="paper rounded-xl p-6 sm:p-8">
        <h1
          className="font-title text-4xl font-bold mb-4"
          dir={isRtl ? "rtl" : "ltr"}
          lang={lang}
        >
          {title}
        </h1>
        <div className="rule my-6" role="presentation" />
        <article
          dir={isRtl ? "rtl" : "ltr"}
          lang={lang}
          className="prose prose-neutral max-w-none prose-headings:font-title prose-headings:font-bold prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </main>
  )
}
