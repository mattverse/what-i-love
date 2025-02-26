import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
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
                            far: 200,
                            position: [0, 0, 4]
                        }}
                    >
                        <Experience />
                    </Canvas>
                </>
            )}
        </>
    )
}


const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)