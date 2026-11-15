import LectureList from "@/app/components/LectureList"
import { getContactContent, getLecturesContent } from "@/lib/posts"
import { t, type Lang } from "@/lib/i18n"

type Props = {
  params: Promise<{ lang: string }>
}

export default async function LecturesPage({ params }: Props) {
  const { lang } = await params
  const currentLang = lang as Lang
  const data = getLecturesContent(currentLang)
  const labels = t(currentLang)
  const items = data?.items ?? []
  const email = getContactContent(currentLang)?.email
  const isRtl = lang === "he"

  return (
    <main className="max-w-2xl mx-auto" dir={isRtl ? "rtl" : "ltr"} lang={lang}>
      <div className="paper rounded-xl p-6 sm:p-8">
        <h1 className="font-title text-4xl font-bold mb-4">
          {data?.title ?? labels.nav.lectures}
        </h1>
        <div className="rule my-6" role="presentation" />

        {data?.intro && (
          <p className="mb-7 text-lg leading-relaxed text-[var(--foreground-muted)]">
            {data.intro}
          </p>
        )}

        <LectureList
          items={items}
          email={email}
          lang={currentLang}
          labels={labels.lectures}
        />

      </div>
    </main>
  )
}
