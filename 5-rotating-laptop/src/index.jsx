import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'

import Experience from './Experience.jsx'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        camera={{
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [-3, 1.5, 4]
        }}
    >
        <ScrollControls >
            <Experience />
        </ScrollControls>
    </Canvas>
)