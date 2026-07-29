import { remark } from "remark"
import html from "remark-html"
import AboutPhoto from "@/app/components/AboutPhoto"
import { getAboutContent } from "@/lib/posts"
import { t, type Lang } from "@/lib/i18n"

const ABOUT_PHOTO_PATH = "/images/about.jpg"

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
        <div
          className={`flex flex-col gap-8 sm:items-start ${
            isRtl ? "sm:flex-row-reverse" : "sm:flex-row"
          }`}
        >
          <figure className="mx-auto sm:mx-0 shrink-0 w-full max-w-[220px] sm:max-w-[200px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[var(--border)] shadow-[0_4px_20px_var(--paper-shadow)]">
              <AboutPhoto
                src={ABOUT_PHOTO_PATH}
                alt={t(lang as Lang).about.photoAlt}
              />
            </div>
          </figure>
          <article
            className="prose prose-neutral min-w-0 flex-1 max-w-none prose-headings:font-title prose-headings:font-bold"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </main>
  )
}
