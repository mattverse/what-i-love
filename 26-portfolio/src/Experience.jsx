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
                        {...websiteData[i]}
                    />
                )
            })}
        </>
    )
}
function Item({ position, texture, aspect, url, labels }) {
    const meshRef = useRef()

    const [active, setActive] = useState(false)
    useCursor(active, "pointer")

    const baseWidth = 2.3
    const labelY = -(baseWidth * aspect / 2 + 0.1)
    // Use baseWidth to determine a constant offset
    const labelOffset = baseWidth / 2

    const { scale } = useSpring({
        scale: active
            ? [baseWidth * 1.15, baseWidth * aspect * 1.15, 1]
            : [baseWidth, baseWidth * aspect, 1],
        config: { mass: 1, tension: 500, friction: 50 },
    })

    return (
        <group position={position}>
            <a.mesh
                ref={meshRef}
                scale={scale}
                onPointerOver={() => setActive(true)}
                onPointerOut={() => setActive(false)}
                onClick={(e) => {
                    e.stopPropagation()
                    window.open(url, '_blank')
                }}
            >
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial map={texture} transparent />
            </a.mesh>

            <Html
                position={[-labelOffset * 1.18, labelY, 0.1]}
                distanceFactor={7}
                transform={false}
                wrapperClass="label-wrapper"
                style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    justifyContent: 'flex-start',
                    // Use baseWidth here to avoid dynamic movement on hover
                    transform: `translateX(${baseWidth * 17}px)`,
                }}
            >
                <style>{`.label-wrapper::-webkit-scrollbar { display: none }`}</style>

                {labels?.map((label, index) => (
                    <div key={index} style={labelStyle}>
                        <div style={{ ...colorDot, background: label.color }} />
                        <span style={labelText}>{label.category}</span>
                    </div>
                ))}
            </Html>
        </group>
    )
}

// Style constants for cleaner code
const labelStyle = {
    background: '#2a2a2a',
    borderRadius: '25px',
    padding: '8px 15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    flexShrink: 0
}

const colorDot = {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    flexShrink: 0
}

const labelText = {
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    fontSize: '0.9rem',
    fontWeight: '500',
    whiteSpace: 'nowrap'
}

// Updated data structure with multiple labels
const websiteData = [
    {
        url: '#',
        labels: [
            { category: 'Physics', color: '#ff6b6b' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Shader', color: '#4ecdc4' },
            { category: 'Gradient', color: '#ffd93d' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Gradient', color: '#ffd93d' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Particles', color: '#E9762B' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Shader', color: '#4ecdc4' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Transmission Material', color: '#FDB7EA' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Transmission Material', color: '#FDB7EA' },
            { category: 'Modeling', color: '#B3D8A8' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Particles', color: '#E9762B' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Modeling', color: '#B3D8A8' },
            { category: 'Transmission Material', color: '#FDB7EA' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Interaction', color: '#578FCA' },
            { category: 'Sound', color: '#3D8D7A' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Shader', color: '#4ecdc4' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Transmission Material', color: '#FDB7EA' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Scroll', color: '#854836' },
        ]
    },
    {
        url: '#',
        labels: [
            { category: 'Interaction', color: '#578FCA' },
        ]
    },
    // Add all 14 items following this pattern...
];
