import { useRef, useEffect } from "react"
import { useHelper } from "@react-three/drei"
import { DirectionalLightHelper } from "three"

export default function Lights() {
    const lightRef = useRef()
    const lightRef2 = useRef()

    useHelper(lightRef, DirectionalLightHelper, 5)
    useHelper(lightRef2, DirectionalLightHelper, 5)

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
            position={[10, 10, 10]}
            intensity={2.8}
            shadow-mapSize={[4096, 4096]}
            shadow-camera-near={0.1}
            shadow-camera-far={100}
        />
        <directionalLight
            ref={lightRef2}
            castShadow
            position={[-10, 4, 10]}
            intensity={2}
            shadow-mapSize={[4096, 4096]}
            shadow-camera-near={0.1}
            shadow-camera-far={100}
        />
        <ambientLight intensity={1} />
    </>
}
