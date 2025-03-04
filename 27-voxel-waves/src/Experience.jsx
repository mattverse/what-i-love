import * as THREE from 'three'

import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { useEffect, useRef } from 'react'

export default function Experience() {


    const meshRef = useRef()

    const count = 10
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    })

    useEffect(() => {
        if (!meshRef.current) return

        const transform = new THREE.Object3D()
        let ii = 0

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                transform.position.set(
                    i - count / 2,
                    0,
                    j - count / 2,
                )
                transform.updateMatrix()

                meshRef.current.setMatrixAt(ii++, transform.matrix)
            }
        }

    }, [])

    return <>
        <color args={["black"]} attach="background" />

        <instancedMesh
            ref={meshRef}
            args={[geometry, material, 10 ** 2]}
        />
        <OrbitControls makeDefault />

        <Lights />
    </>
}