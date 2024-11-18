import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import * as THREE from 'three'


import { useFrame } from '@react-three/fiber'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default function Experience() {
    const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512)
    const waterMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uTime: new THREE.Uniform(0)
        }
    })

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

    useFrame((state, delta) => {
        waterMaterial.uniforms.uTime.value += delta
    })
    return <>

        <OrbitControls makeDefault />

        <Lights />

        {/* <mesh`
            material={waterMaterial}
            geometry={boxGeometry}
        />
 */}

        <mesh
            rotation={[-Math.PI * 0.5, 0, 0]}
            geometry={waterGeometry}
            material={waterMaterial}
        >

        </mesh>

    </>
}