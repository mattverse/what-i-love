import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls } from '@react-three/drei'
import Experience from './Experience.jsx'
import { Suspense } from 'react'
import LoadingScreen from './LoadingScreen'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <LoadingScreen />
        <KeyboardControls
            map={[
                { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
                { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
                { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
                { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
                { name: 'run', keys: ['Shift'] },
                { name: 'teleport', keys: ['Space'] },
            ]}>
            <Canvas
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [0, 7, 8]
                }}
            >
                <Suspense fallback={null}>
                    <Experience />
                </Suspense>
            </Canvas>
        </KeyboardControls>
    </>
)