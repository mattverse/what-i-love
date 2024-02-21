import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* <Canvas camera={{ position: [10, 15, -10], fov: 45 }}> */}
        <ScrollControls pages={3} damping={0.2}>
            <Experience />
        </ScrollControls>
    </Canvas>
)