import { remark } from "remark"
import html from "remark-html"
import { getContactContent } from "@/lib/posts"
import { t, type Lang } from "@/lib/i18n"

type Props = {
  params: Promise<{ lang: string }>
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  const currentLang = lang as Lang
  const contactData = getContactContent(currentLang)
  const labels = t(currentLang)

  const content = contactData
    ? (await remark().use(html).process(contactData.content)).toString()
    : `<p>Edit <code>src/content/contact-${lang}.md</code> to add your contact information.</p>`

  const title = contactData?.title ?? labels.nav.contact
  const email = contactData?.email
  const rtlMark = "\u200F"
  const subject = lang === "he" ? `${rtlMark}פנייה מהאתר` : "Website inquiry"
  const body = lang === "he"
    ? `${rtlMark}היי!\n\n${rtlMark}אשמח לקבל פרטים נוספים.\n\n${rtlMark}תודה!`
    : "Hi!\n\nI would like to receive more information.\n\nThank you!"
  const emailHref = email
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : null

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
            <>
              <p className="mt-2" dir="ltr" style={{ unicodeBidi: "isolate" }}>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <a
                href={emailHref ?? undefined}
                className="mt-5 inline-flex rounded-xl bg-[var(--accent)] px-5 py-3 font-medium text-white no-underline transition-opacity hover:opacity-90 hover:no-underline"
              >
                {labels.contact.sendEmail}
              </a>
            </>
          )}
        </article>
      </div>
    </main>
  )
}
