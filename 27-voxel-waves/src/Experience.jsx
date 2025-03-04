import * as THREE from 'three'

import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Lights from './Lights.jsx'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import { useEffect, useRef } from 'react'

export default function Experience() {
    const meshRef = useRef()

    const count = 20
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uTime: { value: 0 }
        }
    })

    useEffect(() => {
        if (!meshRef.current) return

        const transform = new THREE.Object3D()
        const positions = new Float32Array(3 * count ** 2)
        let ii = 0
        let jj = 0

        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                transform.position.set(
                    i - count / 2,
                    0,
                    j - count / 2,
                )
                transform.updateMatrix()

                positions[jj] = i / count
                positions[jj + 1] = 0
                positions[jj + 2] = j / count

                jj += 3

                meshRef.current.setMatrixAt(ii++, transform.matrix)

            }
        }
        geometry.setAttribute("pos", new THREE.InstancedBufferAttribute(positions, 3))

    }, [])

    useFrame((_, delta) => {
        material.uniforms.uTime.value += delta
    })

    return <>
        <color args={["black"]} attach="background" />

        <instancedMesh
            ref={meshRef}
            args={[geometry, material, count ** 2]}
        />
        <OrbitControls makeDefault />

        <Lights />
    </>
}