import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Overlay from './Overlay.jsx'
import { Scroll, ScrollControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, 0, 6]
            }}

        >
            <ScrollControls pages={3}>
                <Scroll>
                    <Experience />
                </Scroll>
                <Scroll html>
                    <h1></h1>
                </Scroll>
            </ScrollControls>
        </Canvas>
        {/* <Overlay /> */}
    </>
)