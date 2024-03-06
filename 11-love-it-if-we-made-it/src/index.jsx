import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Overlay from './Overlay.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Overlay />
        <Canvas
            shadows
            camera={{
                fov: 90,
                near: 0.1,
                far: 200,
                position: [0, 10, 23]
            }}
        >
            <Experience />
        </Canvas>

    </>

)