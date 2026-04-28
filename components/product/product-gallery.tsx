"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type Props = {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all",
                active === i
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`${name} ảnh ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
