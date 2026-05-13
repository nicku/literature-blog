import { getArticlesContent } from "@/lib/posts"
import { t, type Lang } from "@/lib/i18n"

type Props = {
  params: Promise<{ lang: string }>
}

export default async function ArticlesPage({ params }: Props) {
  const { lang } = await params
  const data = getArticlesContent(lang as Lang)
  const labels = t(lang as Lang)
  const isRtl = lang === "he"

  const title = data?.title ?? labels.nav.articles
  const articles = data?.articles ?? []

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

        {articles.length === 0 ? (
          <p
            className="text-[var(--foreground-muted)]"
            dir={isRtl ? "rtl" : "ltr"}
            lang={lang}
          >
            {labels.articles.noArticles}
          </p>
        ) : (
          <ul
            className="space-y-6"
            dir={isRtl ? "rtl" : "ltr"}
            lang={lang}
          >
            {articles.map((article, i) => (
              <li
                key={i}
                className="rounded-xl p-5"
                style={{
                  background: "var(--background-accent)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h2 className="font-title text-xl font-bold leading-snug">
                      {article.title}
                    </h2>
                    {article.date && (
                      <span
                        className="text-sm shrink-0"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        {article.date}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    {article.publication}
                  </p>
                  <p
                    className="text-[0.9375rem] leading-relaxed"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {article.description}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:underline"
                    style={{ color: "var(--accent)" }}
                  >
                    {labels.articles.readArticle} →
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
