import { notFound } from "next/navigation"
import Sidebar from "../Sidebar"
import { isValidLang, type Lang } from "@/lib/i18n"

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()

  return (
    <div className="flex min-h-screen">
      <Sidebar lang={lang as Lang} />
      <div className="flex-1 min-w-0 py-8 px-4 sm:px-8">{children}</div>
    </div>
  )
}

export function generateStaticParams() {
  return [{ lang: "he" }, { lang: "en" }]
}
