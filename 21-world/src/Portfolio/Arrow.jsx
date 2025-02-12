import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Arrow(props) {
    const { nodes } = useGLTF('./portfolio/arrow.glb')
    return (
        <group position={[-6.6, 0.4, 1.4]} {...props} dispose={null} scale={[1.5, 1, 1]}>
            <mesh geometry={nodes.Plane015.geometry} material={new THREE.MeshBasicMaterial({ color: "white", opacity: 0.5, transparent: true })} />
        </group>
    )
}

useGLTF.preload('./portfolio/arrow.glb')
