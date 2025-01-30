import { useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function GrassShort({ position = [3, -3, -2], scale = 0.5 }) {
    const { nodes, materials } = useGLTF('./environment/grass-short.glb'); // Load as a mesh
    const meshRef = useRef();


    return (
        <mesh
            ref={meshRef}
            geometry={nodes['baked010'].geometry}
            castShadow={true}
            material={new THREE.MeshStandardMaterial({ color: '#74B72E', roughness: 1, metalness: 0 })}
            position={position}
            scale={scale}
        />
    );
}
