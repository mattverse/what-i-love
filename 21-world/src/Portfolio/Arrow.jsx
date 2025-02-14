import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Arrow(props) {
    const { nodes } = useGLTF('./portfolio/arrow.glb')
    return (
        <group
            position={[-0.6, 0.4, 1.4]}
            scale={[1.5, 1, 1]}
            {...props}
            dispose={null}
        >
            <mesh geometry={nodes.Plane015.geometry} material={new THREE.MeshBasicMaterial({ color: "white", opacity: 0.5, transparent: true })} />
        </group>
    )
}

useGLTF.preload('./portfolio/arrow.glb')
