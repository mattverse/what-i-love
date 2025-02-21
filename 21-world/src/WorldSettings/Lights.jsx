import { useRef } from "react"

export default function Lights() {
    const lightRef = useRef()
    const lightRef2 = useRef()

    return (
        <>
            <directionalLight
                ref={lightRef}
                position={[10, 10, 10]}
                intensity={2.8}
            />
            <directionalLight
                ref={lightRef2}
                position={[-10, 4, 10]}
                intensity={2}
            />
            <ambientLight intensity={1} />
        </>
    )
}
