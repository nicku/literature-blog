import { notFound } from "next/navigation"
import SidebarLayout from "../SidebarLayout"
import { isValidLang, type Lang } from "@/lib/i18n"

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
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
