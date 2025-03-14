import * as THREE from 'three'

import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Lights from './Lights.jsx'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'


export default function Experience() {

    const meshRef = useRef()
    const wireframeRef = useRef()
    const count = 10

    let geometry = new THREE.BoxGeometry(1, 1, 1)
    let material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            time: { type: 'f', value: 0 }
        }
    })

    let wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff, // White wireframe
        wireframe: true,
    })

    let pos = new Float32Array(3 * count ** 3)
    let random = new Float32Array(count ** 3)
    let depth = new Float32Array(count ** 3)

    useEffect(() => {
        if (!meshRef.current) return

        const transform = new THREE.Object3D()
        let ii = 0
        let jj = 0
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                for (let k = 0; k < count; k++) {
                    transform.position.set(i - count / 2, j - count / 2, k - count / 2)
                    transform.updateMatrix()

                    random[ii] = Math.random()
                    depth[ii] = j / count

                    pos[jj] = i / count
                    pos[jj + 1] = j / count
                    pos[jj + 2] = k / count
                    jj += 3

                    meshRef.current.setMatrixAt(ii++, transform.matrix)

                }
            }
        }
        geometry.setAttribute('depth', new THREE.InstancedBufferAttribute(depth, 1))
        geometry.setAttribute('random', new THREE.InstancedBufferAttribute(random, 1))
        geometry.setAttribute('pos', new THREE.InstancedBufferAttribute(pos, 3))
    }, [])

    useFrame((state, delta) => {
        meshRef.current.rotation.y += delta / 4
        material.uniforms.time.value += delta
    })



    return <>
        <color args={['black']} attach="background" />
        <OrbitControls makeDefault />

        <Lights />

        <instancedMesh
            ref={meshRef}
            args={[geometry, material, count ** 3]}
        />
    </>
}