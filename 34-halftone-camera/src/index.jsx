import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'black'
        }}
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true }}
        dpr={window.devicePixelRatio}
    >
        <Experience />
    </Canvas>
)