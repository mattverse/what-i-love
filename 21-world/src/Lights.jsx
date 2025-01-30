import { useRef, useEffect } from "react"

export default function Lights() {
    const lightRef = useRef()

    useEffect(() => {
        if (lightRef.current) {

            lightRef.current.shadow.camera.left = -50
            lightRef.current.shadow.camera.right = 50
            lightRef.current.shadow.camera.top = 50
            lightRef.current.shadow.camera.bottom = -50
            lightRef.current.shadow.camera.updateProjectionMatrix()
        }
    }, [])

    return <>
        <directionalLight
            ref={lightRef}
            castShadow
            position={[25, 25, 25]}
            intensity={4.5}
            shadow-mapSize={[4096, 4096]}
            shadow-camera-near={0.1}
            shadow-camera-far={100}
        />
        <ambientLight intensity={1.5} />
    </>
}