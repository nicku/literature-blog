import { getAllEssays } from "@/lib/posts"
import EssayList from "../EssayList"

export default function EssaysPage() {
  const essays = getAllEssays()

  return (
    <main className="max-w-3xl mx-auto p-6">
      <EssayList essays={essays} />
    </main>
  )
}
