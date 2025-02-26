import { useState, useEffect } from 'react'

export const useViewport = () => {
    const [isMobile, setIsMobile] = useState(false)

    // Set your mobile breakpoint (in pixels)
    const MOBILE_BREAKPOINT = 768

    useEffect(() => {
        const checkViewport = () => {
            const width = window.innerWidth
            setIsMobile(width < MOBILE_BREAKPOINT)
        }

        // Initial check
        checkViewport()

        // Add resize listener
        window.addEventListener('resize', checkViewport)

        // Cleanup
        return () => window.removeEventListener('resize', checkViewport)
    }, [])

    return isMobile
}