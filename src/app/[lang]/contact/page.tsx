import { remark } from "remark"
import html from "remark-html"
import { getContactContent } from "@/lib/posts"
import { t, type Lang } from "@/lib/i18n"

type Props = {
  params: Promise<{ lang: string }>
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  const contactData = getContactContent(lang as Lang)

  const content = contactData
    ? (await remark().use(html).process(contactData.content)).toString()
    : `<p>Edit <code>src/content/contact-${lang}.md</code> to add your contact information.</p>`

  const title = contactData?.title ?? t(lang as Lang).nav.contact
  const email = contactData?.email

  return (
    <main className="max-w-2xl mx-auto">
      <div className="paper rounded-xl p-6 sm:p-8">
        <h1
          className="font-title text-4xl font-bold mb-4"
          dir={lang === "he" ? "rtl" : "ltr"}
          lang={lang}
        >
          {title}
        </h1>
        <div className="rule my-6" role="presentation" />
        <article
          dir={lang === "he" ? "rtl" : "ltr"}
          lang={lang}
          className="prose prose-neutral max-w-none prose-headings:font-title prose-headings:font-bold prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline"
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {email && (
            <p className="mt-2" dir="ltr" style={{ unicodeBidi: "isolate" }}>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          )}
        </article>
      </div>
    </main>
  )
}
