"use client"

import { useState } from "react"
import Image from "next/image"

const PLACEHOLDER = "/essays/placeholder.svg"

type AboutPhotoProps = {
  src: string
  alt: string
}

export default function AboutPhoto({ src, alt }: AboutPhotoProps) {
  const [failed, setFailed] = useState(false)
  const effectiveSrc = failed ? PLACEHOLDER : src

  return (
    <Image
      src={effectiveSrc}
      alt={alt}
      fill
      className="object-cover object-center"
      sizes="(max-width: 640px) 220px, 200px"
      priority
      onError={() => setFailed(true)}
    />
  )
}
