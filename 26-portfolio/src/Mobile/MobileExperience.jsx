// In Mobile/MobileExperience.jsx
import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Suspense } from 'react'
import MattText from './MattText'
import Lights from '../Lights.jsx'

export default function MobileExperience() {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <color args={['black']} attach="background" />
            <Suspense fallback={null}>
                <MattText />
                <Lights />
                {/* Overlay text */}
                <Html transform={false}>
                    <div style={{
                        position: 'fixed',
                        top: '0',             // start at the very top of the viewport
                        left: '50%',
                        transform: 'translate(-50%, 250%)', // move 150% upward relative to its own height
                        fontFamily: 'm6x11plus',
                        fontSize: 'clamp(15px, 6vw, 25px)',
                        color: 'white',
                        textAlign: 'center',
                        pointerEvents: 'none',
                        letterSpacing: '1px',
                        padding: '0 20px',
                        minWidth: '300px',
                        maxWidth: 'none',
                        margin: '0 auto',
                        lineHeight: '1.4',
                        whiteSpace: 'pre-line',
                        zIndex: 1000,
                    }}>
                        {"Get to know me better on PC :)"}
                    </div>
                </Html>


            </Suspense>
        </Canvas>
    )
}