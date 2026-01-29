import { getAllEssays } from "@/lib/posts"

import EssayList from "./EssayList"

export default function Home() {
  const essays = getAllEssays()

  return (
    <EssayList essays={essays} />
  )
}
