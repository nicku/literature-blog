import type { Metadata } from "next"
import { notFound } from "next/navigation"
import SidebarLayout from "../SidebarLayout"
import { isValidLang, type Lang } from "@/lib/i18n"

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}

  if (lang === "he") {
    return {
      title: "ניק קושניר | בלוג ספרות",
      description: "בלוג ספרות מאת ניק קושניר",
    }
  }
  return {
    title: "Nick Kushnir | Literature Blog",
    description: "A blog about literature by Nick Kushnir",
  }
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()

  return (
    <SidebarLayout lang={lang as Lang}>
      {children}
    </SidebarLayout>
  )
}

export function generateStaticParams() {
  return [{ lang: "he" }, { lang: "en" }]
}
