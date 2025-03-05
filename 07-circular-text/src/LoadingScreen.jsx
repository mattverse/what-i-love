import { useProgress } from '@react-three/drei'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

export default function LoadingScreen() {
    const { progress, active } = useProgress()
    const containerRef = useRef()

    useEffect(() => {
        if (!active) {
            gsap.to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    containerRef.current.style.display = 'none'
                }
            })
        }
    }, [active])

    return (
        <div ref={containerRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#000000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            opacity: 1,
            transition: 'opacity 0.5s',
            fontFamily: 'm6x11plus' // Use your custom font here
        }}>
            <h1 style={{
                fontSize: '4rem',
                margin: 0,
                color: '#ffffff',
                fontWeight: 700,
                letterSpacing: '0.1em'
            }}>
                LOADING
            </h1>
            <p style={{
                fontSize: '2rem',
                margin: '1rem 0',
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 400,
                letterSpacing: '0.05em'
            }}>
                {Math.round(progress)}%
            </p>
        </div>
    )
}
