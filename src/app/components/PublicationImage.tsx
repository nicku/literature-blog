"use client"

import { useState } from "react"
import Image from "next/image"

const PLACEHOLDER = "/essays/placeholder.svg"

type PublicationImageProps = {
  src: string
  alt: string
}

export default function PublicationImage({ src, alt }: PublicationImageProps) {
  const [failed, setFailed] = useState(false)
  const effectiveSrc = failed ? PLACEHOLDER : src

  return (
    <Image
      src={effectiveSrc}
      alt={failed ? "" : alt}
      fill
      className="object-cover object-center"
      sizes="(max-width: 640px) 100vw, 280px"
      onError={() => setFailed(true)}
    />
  )
}
