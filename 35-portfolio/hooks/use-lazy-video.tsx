"use client"

import { useEffect, useRef, useState } from "react"

interface UseLazyVideoProps {
    threshold?: number
    rootMargin?: string
}

export function useLazyVideo({ threshold = 0.1, rootMargin = "100px" }: UseLazyVideoProps = {}) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)

    useEffect(() => {
        const currentVideo = videoRef.current
        if (!currentVideo) return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                setIsVisible(entry.isIntersecting)

                if (entry.isIntersecting && !hasLoaded) {
                    // Load the video when it becomes visible
                    if (currentVideo.getAttribute("data-src")) {
                        const source = currentVideo.querySelector("source")
                        if (source) {
                            source.src = currentVideo.getAttribute("data-src") || ""
                            currentVideo.load()
                            setHasLoaded(true)

                            // Start playing after loading if autoplay is desired
                            currentVideo.play().catch((err) => {
                                console.log("Autoplay prevented:", err)
                            })
                        }
                    }
                } else if (!entry.isIntersecting && hasLoaded) {
                    // Pause when out of view to save resources
                    currentVideo.pause()
                } else if (entry.isIntersecting && hasLoaded) {
                    // Resume playing when back in view
                    currentVideo.play().catch((err) => {
                        console.log("Autoplay prevented:", err)
                    })
                }
            },
            { threshold, rootMargin },
        )

        observer.observe(currentVideo)

        return () => {
            if (currentVideo) {
                observer.unobserve(currentVideo)
            }
        }
    }, [hasLoaded, threshold, rootMargin])

    return { videoRef, isVisible, hasLoaded }
}

