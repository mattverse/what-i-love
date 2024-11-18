import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Lights from './Lights.jsx'
import { useEffect, useRef } from 'react'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'


export default function Experience() {
    const meshRef = useRef()
    const count = 15

    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            count: new THREE.Uniform(count),
            time: new THREE.Uniform(0)
        }
    })
    const geometry = new THREE.BoxGeometry(1, 1, 1)


    useFrame((state, delta) => {
        material.uniforms.time.value += delta

    })

    useEffect(() => {
        const transform = new THREE.Object3D()
        const offset = (count - 1) / 2

        const instancedPosition = new Float32Array(3 * count ** 3)

        let i = 0
        let j = 0
        for (let x = 0; x < count; x++) {
            for (let y = 0; y < count; y++) {
                for (let z = 0; z < count; z++) {
                    instancedPosition[j] = x
                    instancedPosition[j + 1] = y
                    instancedPosition[j + 2] = z
                    j += 3

                    transform.position.set(offset - x, offset - y, offset - z);
                    transform.updateMatrix();

                    meshRef.current.setMatrixAt(i++, transform.matrix);
                }
            }
        }

        geometry.setAttribute('instancedPosition', new THREE.InstancedBufferAttribute(instancedPosition, 3))
    }, [])

    return <>
        <color args={['white']} attach="background" />
        <OrbitControls makeDefault />

        <Lights />

        <instancedMesh
            ref={meshRef}
            args={[geometry, material, count ** 3]}
        />
    </>
}