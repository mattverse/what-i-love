import { OrbitControls, useKeyboardControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Me from './me.jsx'

export default function Experience() {
    return <>
        <OrbitControls makeDefault />
        <Lights />

        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <Me />

    </>
}