import { getAllEssays } from "@/lib/posts"
import EssayList from "../../EssayList"
import type { Lang } from "@/lib/i18n"

type Props = {
  params: Promise<{ lang: string }>
}

export default async function EssaysPage({ params }: Props) {
  const { lang } = await params
  const essays = getAllEssays()

  return (
    <main className="max-w-3xl mx-auto p-6">
      <EssayList essays={essays} lang={lang as Lang} />
    </main>
  )
}
