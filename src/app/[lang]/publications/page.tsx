import PublicationImage from "@/app/components/PublicationImage"
import { getPublicationsContent } from "@/lib/posts"
import { t, type Lang } from "@/lib/i18n"

type Props = {
  params: Promise<{ lang: string }>
}

export default async function PublicationsPage({ params }: Props) {
  const { lang } = await params
  const data = getPublicationsContent(lang as Lang)
  const labels = t(lang as Lang)
  const isRtl = lang === "he"

  const title = data?.title ?? labels.nav.publications
  const items = data?.items ?? []

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

        {items.length === 0 ? (
          <p
            className="text-[var(--foreground-muted)]"
            dir={isRtl ? "rtl" : "ltr"}
            lang={lang}
          >
            {labels.publications.noItems}
          </p>
        ) : (
          <ul
            className="space-y-6"
            dir={isRtl ? "rtl" : "ltr"}
            lang={lang}
          >
            {items.map((item, i) => (
              <li
                key={i}
                className="rounded-xl p-5"
                style={{
                  background: "var(--background-accent)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className={`flex flex-col gap-4 ${
                    item.image
                      ? isRtl
                        ? "sm:flex-row-reverse"
                        : "sm:flex-row"
                      : ""
                  }`}
                >
                  {item.image && (
                    <figure className="mx-auto sm:mx-0 shrink-0 w-full max-w-[280px] sm:max-w-[200px]">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[var(--border)]">
                        <PublicationImage
                          src={item.image}
                          alt={item.title ?? title}
                        />
                      </div>
                    </figure>
                  )}
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      {item.title && (
                        <h2 className="font-title text-xl font-bold leading-snug">
                          {item.title}
                        </h2>
                      )}
                      {item.date && (
                        <span
                          className="text-sm shrink-0"
                          style={{ color: "var(--foreground-muted)" }}
                        >
                          {item.date}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p
                        className="text-[0.9375rem] leading-relaxed"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        {item.description}
                      </p>
                    )}
                    {(item.url || item.pdf) && (
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
                            style={{ color: "var(--accent)" }}
                          >
                            {labels.publications.viewLink} →
                          </a>
                        )}
                        {item.pdf && (
                          <a
                            href={item.pdf}
                            download={item.pdf.split("/").filter(Boolean).pop() ?? true}
                            className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
                            style={{ color: "var(--accent)" }}
                          >
                            {labels.publications.downloadPdf}
                          </a>
                        )}
                      </div>
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
