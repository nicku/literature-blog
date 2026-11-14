import PublicationImage from "@/app/components/PublicationImage"
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
  const isRtl = lang === "he"
  const items = data?.items ?? []
  const email = getContactContent(currentLang)?.email

  function getBookingHref(lectureTitle: string) {
    const rtlMark = "\u200F"
    const subject = isRtl
      ? `${rtlMark}הזמנת הרצאה: ${lectureTitle}`
      : `Lecture booking: ${lectureTitle}`
    const body = isRtl
      ? [
          "היי!",
          `אשמח לתאם איתך את ההרצאה הבאה: ״${lectureTitle}״.`,
          "אשמח לקבל פרטים נוספים על מועדים, מיקום ועלות.",
          "תודה!",
        ].map((line) => `${rtlMark}${line}`).join("\n\n")
      : `Hi!\n\nI would like to schedule the following lecture with you: "${lectureTitle}".\n\nI would be happy to receive more information about available dates, location, and pricing.\n\nThank you!`

    return `mailto:${email ?? ""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

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

        {items.length === 0 ? (
          <p className="text-[var(--foreground-muted)]">{labels.lectures.noItems}</p>
        ) : (
          <ul className="space-y-6">
            {items.map((lecture, index) => (
              <li
                key={`${lecture.title}-${index}`}
                className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background-accent)]"
              >
                <div className={`flex flex-col ${isRtl ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
                  <div className="relative aspect-[4/3] w-full shrink-0 sm:w-56">
                    <PublicationImage src={lecture.image} alt={lecture.title} />
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-3 p-5">
                    <h2 className="font-title text-2xl font-bold leading-snug">
                      {lecture.title}
                    </h2>
                    <p className="leading-relaxed text-[var(--foreground-muted)]">
                      {lecture.description}
                    </p>
                    {email && (
                      <a
                        href={getBookingHref(lecture.title)}
                        className="mt-2 inline-flex w-fit rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                      >
                        {labels.lectures.order}
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>
    </main>
  )
}
