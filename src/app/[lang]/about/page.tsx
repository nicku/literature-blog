import { remark } from "remark"
import html from "remark-html"
import { getAboutContent } from "@/lib/posts"
import { t, type Lang } from "@/lib/i18n"

type Props = {
  params: Promise<{ lang: string }>
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  const isRtl = lang === "he"
  const rawContent = getAboutContent(lang as Lang)

  const content = rawContent
    ? (await remark().use(html).process(rawContent)).toString()
    : `<p>Edit <code>src/content/about-${lang}.md</code> to add information about yourself.</p>`

  return (
    <main className="max-w-2xl mx-auto">
      <div
        className="paper rounded-xl p-6 sm:p-8"
        dir={isRtl ? "rtl" : "ltr"}
        lang={lang}
      >
        <h1 className="font-title text-4xl font-bold mb-4 text-start">
          {t(lang as Lang).nav.about}
        </h1>
        <div className="rule my-6" role="presentation" />
        <article
          className="prose prose-neutral max-w-none prose-headings:font-title prose-headings:font-bold"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </main>
  )
}
