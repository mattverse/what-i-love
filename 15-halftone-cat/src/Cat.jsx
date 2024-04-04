import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { extend, useFrame, useThree } from "@react-three/fiber"


import * as THREE from 'three'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default function Cat() {
    const cat = useState()
    const sizes = useThree((state) => state.size);
    const gl = useThree((state) => state.gl);

    const pixelRatio = gl.getPixelRatio();
    const { nodes } = useGLTF('/cat/cat.gltf')

    useFrame(() => {
        console.log(cat.current)
        cat.current.rotation.y += 0.01;
    })

    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uBaseColor: new THREE.Uniform(
                new THREE.Color("#5FF3DE")
            ),
            uPointColor: new THREE.Uniform(
                new THREE.Color("#F5039E")
            ),
            uResolution: new THREE.Uniform(
                new THREE.Vector2(sizes.width * pixelRatio, sizes.height * pixelRatio)
            )
        }
    })
    return (
        <group dispose={null} scale={2}>
            <mesh
                geometry={nodes.concrete_cat_statue.geometry}
                material={shaderMaterial}
                ref={cat}
            />
        </group>
    )
}
useGLTF.preload('/cat/cat.gltf')