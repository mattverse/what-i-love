"use client"

import { useLazyVideo } from "@/hooks/use-lazy-video"

interface LazyVideoProps {
    src?: string
    poster: string
    className?: string
}

export function LazyVideo({ src, poster, className = "" }: LazyVideoProps) {
    const { videoRef, isVisible } = useLazyVideo()

    return (
        <video
            ref={videoRef}
            className={className}
            poster={poster}
            muted
            loop
            playsInline
            webkit-playsinline="true"
            data-src={src}
        >
            {src && <source type="video/mp4" />}
        </video>
    )
}

