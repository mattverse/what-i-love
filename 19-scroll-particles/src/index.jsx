import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Overlay from './Overlay.jsx'
import { Scroll, ScrollControls } from '@react-three/drei'

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
                            position: [0, 0, 6]
                        }}
                    >
                        <ScrollControls pages={2} damping={1.4}>
                            <Scroll>
                                <Experience />
                            </Scroll>
                            <Scroll html>
                                <h1 className='text'>It all starts from an idea</h1>
                                <p className='sub-text'>Every creative endeavor begins as a seed—an idea that sprouts in the fertile ground of the mind. This idea can be as simple as a fleeting thought or as complex as an intricate daydream. What's crucial is the spark that it ignites, compelling the creator to explore and expand upon it. This stage is about capturing that initial spark: how ideas form from inspirations drawn from experiences, emotions, art, nature, or even a word overheard in passing. The creative process is as diverse as the creators themselves, and this topic could explore various ways ideas have historically come to life and how they continue to evolve. Here, the webpage could feature interactive elements such as thought bubbles that expand into sketches or early drafts, illustrating the evolution of an idea from conception.</p>
                                <div className='bottom-container'>
                                    <h1 className='text'>Until the idea becomes us</h1>
                                    <p className='sub-text'>This topic transitions from the birth of an idea to its profound impact on both the creator and the audience. It examines the metamorphosis of a concept as it's refined and developed into a complete artistic expression. This is where the idea, through the medium of art, begins to weave itself into the fabric of identities and cultures, influencing perceptions and emotions. It reflects on how an idea, once external and formless, becomes internalized and personal, reshaping our understanding of ourselves and our surroundings. The webpage could portray this through layers of content that overlay and interact with each other—videos, sound clips, and animations that blend into a rich tapestry, showing the transformational power of art. This section could also include testimonials or interactive discussions about how specific artworks have influenced people's lives or sparked societal change.</p>
                                </div>

                            </Scroll>
                        </ScrollControls>
                    </Canvas>
                </>
            )}
        </>
    )
}


const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)




