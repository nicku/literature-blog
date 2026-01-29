import Link from "next/link"
import { notFound } from "next/navigation"
import { remark } from "remark"
import html from "remark-html"

import { getAllEssays, getEssayBySlug } from "@/lib/posts"

type EssayPageProps = {
  params: Promise<{ slug: string }>
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params
  if (!slug) notFound()

  const essay = getEssayBySlug(slug)

  const processedContent = await remark().use(html).process(essay.content)
  const contentHtml = processedContent.toString()

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Link href="/" className="text-blue-600 hover:underline block mb-6">
        ← Back
      </Link>

      <h1 className="text-4xl font-serif mb-2">{essay.title}</h1>
      <p className="text-sm text-gray-500 mb-8">
        {essay.category} • {essay.language?.toUpperCase?.() ?? ""} • {essay.date}
      </p>

      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </main>
  )
}

export async function generateStaticParams() {
  const essays = getAllEssays()
  return essays.map((essay) => ({
    slug: essay.slug,
  }))
}

