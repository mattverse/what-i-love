import { OrbitControls, useKeyboardControls, useTexture } from '@react-three/drei'
import Lights from './Lights.jsx'
import Me from './me.jsx'
import * as THREE from 'three'

export default function Experience() {
    const bakedTexture = useTexture('./blue-tile-4.png')
    bakedTexture.wrapS = THREE.RepeatWrapping
    bakedTexture.wrapT = THREE.RepeatWrapping
    bakedTexture.repeat.set(4, 4);
    return <>
        <OrbitControls makeDefault />
        <Lights />

        <mesh receiveShadow rotation-x={- Math.PI * 0.5} scale={100}>
            <planeGeometry />
            <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <Me />

    </>
}