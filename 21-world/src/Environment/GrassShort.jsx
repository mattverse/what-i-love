import { useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function GrassShort({ position = [3, -3, -2], scale = 1 }) {
    const { nodes, materials } = useGLTF('./environment/grass-short.glb'); // Load as a mesh
    const meshRef = useRef();

    console.log(materials);

    return (
        <mesh
            ref={meshRef}
            geometry={nodes['baked010'].geometry}
            castShadow={true}
            material={new THREE.MeshStandardMaterial({ color: '#a2c44a', roughness: 0.8, metalness: 0 })}
            position={position}
            scale={scale}
        />
    );
}
