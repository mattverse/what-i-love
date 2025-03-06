import Lights from './Lights.jsx'
import { Canvas } from '@react-three/fiber'
import { useLoader, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { OrbitControls, Environment, Html, useCursor } from '@react-three/drei'
import { useRef, useState, useMemo, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { a } from '@react-spring/three'
import { useRoute, useLocation } from 'wouter'
import * as THREE from 'three'
import { easing } from 'maath'




export default function Experience() {
    return (
        <>
            <Environment preset='city' />
            <color args={['#141414']} attach="background" />
            <Lights />
            <PortfolioItems />
        </>
    )
}

function PortfolioItems() {
    const items = Array.from({ length: 14 }, (_, i) => i + 1)
    const textures = useLoader(TextureLoader, items.map((n) => `${n}.png`))

    return (
        <>
            {items.map((_, i) => {
                const texture = textures[i]
                const aspect = texture.image.height / texture.image.width
                const col = i % 4
                const row = Math.floor(i / 4)
                const position = [
                    col * 2.5 - 3.75,
                    -row * 1.9 + 2.2,
                    0
                ]
                return (
                    <Item
                        key={i}
                        position={position}
                        texture={texture}
                        aspect={aspect}
                        column={col}
                        {...websiteData[i]}
                    />
                )
            })}
        </>
    )
}

// Custom hook for responsive values
function useResponsive() {
    const [state, setState] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1200,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
        dpr: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
        isMobile: false,
        isTablet: false
    })

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            const height = window.innerHeight
            setState({
                width,
                height,
                dpr: window.devicePixelRatio,
                isMobile: width < 640,
                isTablet: width >= 640 && width < 1024
            })
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return state
}

function Item({ position, texture, aspect, url, labels, column }) {
    const meshRef = useRef()
    const labelRef = useRef()
    const { width, isMobile, isTablet } = useResponsive()

    const [active, setActive] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [showLabels, setShowLabels] = useState(true)

    useCursor(active, "pointer")

    const baseWidth = 2.3
    const labelY = -(baseWidth * aspect / 2 + 0.1)

    const columnOffsets = {
        0: 0.55,   // Left-most column
        1: 0.57,
        2: 0.58,
        3: 0.59   // Right-most column
    }

    // Adjusted labelOffset to move labels more to the left
    const labelOffset = baseWidth * columnOffsets[column] // Changed from baseWidth/2 to move labels left

    // Responsive label configuration with increased base size
    const labelScale = useMemo(() => {
        if (isMobile) return 0.8    // Increased from 0.65
        if (isTablet) return 0.9    // Increased from 0.75
        return 1.0                  // Increased from 0.85
    }, [isMobile, isTablet])

    // Helper to calculate viewport-based sizes
    const vw = (percentage) => (percentage * width) / 100

    // Animation for labels
    const { labelOpacity, labelY: animatedLabelY } = useSpring({
        labelOpacity: (active || hovered || !isMobile) ? 1 : 0,
        labelY: active ? labelY - 0.05 : labelY,
        config: { mass: 1, tension: 280, friction: 60 }
    })

    // Item scale animation
    const { scale } = useSpring({
        scale: active
            ? [baseWidth * 1.15, baseWidth * aspect * 1.15, 1]
            : [baseWidth, baseWidth * aspect, 1],
        config: { mass: 1, tension: 280, friction: 60 },
    })

    // Measure the label width after rendering
    useEffect(() => {
        if (labelRef.current) {
            // You could add logic here to measure and adjust based on actual rendered size
            // This would use labelRef.current.clientWidth etc.
        }
    }, [labels, width])

    // Handle very small screens by hiding labels on mobile until hover
    useEffect(() => {
        setShowLabels(!isMobile || active || hovered)
    }, [isMobile, active, hovered])

    return (
        <group position={position}>
            <a.mesh
                ref={meshRef}
                scale={scale}
                onPointerOver={() => {
                    setActive(true)
                    setHovered(true)
                }}
                onPointerOut={() => {
                    setActive(false)
                    setHovered(false)
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    window.open(url, '_blank')
                }}
            >
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial map={texture} transparent />
            </a.mesh>

            <Html
                ref={labelRef}
                position={[-labelOffset, labelY, 0.1]}
                distanceFactor={7}
                transform={false}
                occlude={[meshRef]}
                wrapperClass="label-wrapper"
                style={{
                    display: showLabels ? 'flex' : 'none',
                    flexDirection: isMobile ? 'column' : 'row',
                    flexWrap: 'nowrap',
                    gap: isMobile ? '4px' : isTablet ? '5px' : '7px', // Increased spacing
                    pointerEvents: 'none',
                    opacity: isMobile ? labelOpacity : 1,
                    transform: `translateX(${baseWidth * (isMobile ? 10 : 12)}px) scale(${labelScale})`, // Adjusted translateX to move labels left
                    transformOrigin: 'left center',
                }}
            >
                <style>{`
                    .label-wrapper::-webkit-scrollbar { display: none }
                    .label-wrapper {
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                        z-index: 10;
                    }
                    @media (max-width: 640px) {
                        .label-wrapper {
                            transition: opacity 0.2s ease;
                        }
                    }
                `}</style>

                {labels?.map((label, index) => (
                    <div
                        key={index}
                        style={{
                            background: '#2a2a2a',
                            borderRadius: '25px',
                            padding: isMobile ? '3px 7px' : isTablet ? '4px 9px' : '5px 11px', // Increased padding
                            display: 'flex',
                            alignItems: 'center',
                            gap: isMobile ? '5px' : '7px', // Increased gap
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                            flexShrink: 0,
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <div
                            style={{
                                width: isMobile ? '9px' : isTablet ? '11px' : '13px', // Increased dot size
                                height: isMobile ? '9px' : isTablet ? '11px' : '13px', // Increased dot size
                                borderRadius: '50%',
                                background: label.color,
                                flexShrink: 0
                            }}
                        />
                        <span
                            style={{
                                color: 'white',
                                fontFamily: 'Arial, sans-serif',
                                fontSize: isMobile ? '0.7rem' : isTablet ? '0.8rem' : '0.85rem', // Increased font size
                                fontWeight: '500',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {label.category}
                        </span>
                    </div>
                ))}
            </Html>
        </group>
    )
}

// Updated data structure with multiple labels
const websiteData = [
    {
        url: 'https://bowlofwrongs.mattparkarchive.xyz/',
        labels: [
            { category: 'Physics', color: '#ff6b6b' },
            { category: 'Raycasting', color: '#F7CFD8' },
        ]
    },
    {
        url: 'https://gradient-cat.mattparkarchive.xyz/',
        labels: [
            { category: 'Shader', color: '#4ecdc4' },
            { category: 'Gradient', color: '#ffd93d' },
        ]
    },
    {
        url: 'https://gradient-cone.mattparkarchive.xyz/',
        labels: [
            { category: 'Gradient', color: '#ffd93d' },
        ]
    },
    {
        url: 'https://scroll-particles.mattparkarchive.xyz/',
        labels: [
            { category: 'Particles', color: '#E9762B' },
        ]
    },
    {
        url: 'https://holographic-text.mattparkarchive.xyz/',
        labels: [
            { category: 'Shader', color: '#4ecdc4' },
        ]
    },
    {
        url: 'https://transparent-text.mattparkarchive.xyz/',
        labels: [
            { category: 'Transmission Material', color: '#FDB7EA' },
        ]
    },
    {
        url: 'https://twisted-text.mattparkarchive.xyz/',
        labels: [
            { category: 'Transmission Material', color: '#FDB7EA' },
            { category: 'Modeling', color: '#B3D8A8' },
        ]
    },
    {
        url: 'https://make-rain.mattparkarchive.xyz/',
        labels: [
            { category: 'Particles', color: '#E9762B' },
        ]
    },
    {
        url: 'https://bar.mattparkarchive.xyz/',
        labels: [
            { category: 'Modeling', color: '#B3D8A8' },
            { category: 'Transmission Material', color: '#FDB7EA' },
        ]
    },
    {
        url: 'https://cube-asmr.mattparkarchive.xyz/',
        labels: [
            { category: 'Interaction', color: '#578FCA' },
            { category: 'Sound', color: '#3D8D7A' },
        ]
    },
    {
        url: 'https://homer.mattparkarchive.xyz/',
        labels: [
            { category: 'Shader', color: '#4ecdc4' },
        ]
    },
    {
        url: 'https://transparent-cube.mattparkarchive.xyz/',
        labels: [
            { category: 'Transmission Material', color: '#FDB7EA' },
        ]
    },
    {
        url: 'https://rotating-laptop.mattparkarchive.xyz/',
        labels: [
            { category: 'Scroll', color: '#854836' },
        ]
    },
    {
        url: 'https://lighted-text.mattparkarchive.xyz/',
        labels: [
            { category: 'Interaction', color: '#578FCA' },
        ]
    },
    // Add all 14 items following this pattern...
];
