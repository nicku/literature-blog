import Link from "next/link"
import { notFound } from "next/navigation"
import { remark } from "remark"
import html from "remark-html"

import EssayImage from "@/app/components/EssayImage"
import { getAllEssays, getEssayBySlug } from "@/lib/posts"
import { t, type Lang } from "@/lib/i18n"

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

export default async function EssayPage({ params }: Props) {
  const { lang, slug } = await params
  if (!slug) notFound()

  const essay = getEssayBySlug(slug)
  if (!essay || essay.language !== lang) notFound()

  const processedContent = await remark().use(html).process(essay.content)
  const contentHtml = processedContent.toString()

  const isRtl = essay.language === "he"
  const labels = t(lang as Lang)

  return (
    <main className="max-w-3xl mx-auto">
      <div className="paper rounded-xl p-6 sm:p-8">
        <Link
          href={`/${lang}/essays`}
          dir="ltr"
          className="inline-block mb-6 text-sm font-medium hover:opacity-80 transition-opacity"
          style={{ color: "var(--accent)" }}
        >
          {labels.backToEssays}
        </Link>

        <div
          dir={isRtl ? "rtl" : "ltr"}
          lang={essay.language}
          className="text-start"
        >
          <div
            className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-8"
            style={{ background: "var(--background-accent)" }}
          >
            <EssayImage
              src={essay.image}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 48rem"
            />
          </div>

          <h1 className="font-title text-4xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
            {essay.title}
          </h1>
          <p className="text-sm mb-8" style={{ color: "var(--foreground-muted)" }}>
            {essay.categories.join(' • ')} • {essay.language?.toUpperCase?.() ?? ""} • {essay.date}
          </p>

          <div className="rule my-8" role="presentation" />

          <article
            className="prose prose-neutral max-w-none prose-headings:font-title prose-headings:font-bold prose-p:leading-relaxed prose-a:no-underline hover:prose-a:underline"
            dir={isRtl ? "rtl" : "ltr"}
            lang={essay.language}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const essays = getAllEssays()
  return essays.map((essay) => ({
    lang: essay.language,
    slug: essay.slug,
  }))
}
