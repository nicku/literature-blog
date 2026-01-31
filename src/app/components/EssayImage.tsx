'use client'

import { useState } from 'react'
import Image from 'next/image'

const PLACEHOLDER = '/essays/placeholder.svg'

type EssayImageProps = {
  src: string | null
  placeholder?: string
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
}

export default function EssayImage({
  src,
  placeholder = PLACEHOLDER,
  fill = true,
  className,
  sizes,
  priority,
}: EssayImageProps) {
  const [failed, setFailed] = useState(false)
  const effectiveSrc = failed || !src ? placeholder : src

  return (
    <Image
      src={effectiveSrc}
      alt=""
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
    />
  )
}
