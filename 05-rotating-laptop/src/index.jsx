import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'

import Experience from './Experience.jsx'

import LoadingScreen from './LoadingScreen'
import { useViewport } from './Mobile/useViewport.js'
import MobileExperience from './Mobile/MobileExperience'


function App() {
    const isMobile = useViewport()

    return (
        <>
            {isMobile ? (
                <MobileExperience />
            ) : (
                <>
                    <LoadingScreen />
                    <Canvas
                        shadows
                        camera={{
                            fov: 45,
                            near: 0.1,
                            far: 2000,
                            position: [-3, 1.5, 6]
                        }}
                    >
                        <ScrollControls>
                            <Experience />
                        </ScrollControls>

                    </Canvas>
                </>
            )}
        </>
    )
}


const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
