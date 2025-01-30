import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

export default function GrassTall({ position, scale }) {
    const { nodes } = useGLTF('./environment/grass-tall.glb'); // Load as a mesh
    const meshRef = useRef();

    // Use Leva to control the color
    const { color } = useControls('Grass Tall', {
        color: '#8dbd35'
    });

    return (
        <>

            <mesh
                ref={meshRef}
                geometry={nodes['baked004'].geometry}
                castShadow={true}
                wireFrame={true}
                material={new THREE.MeshBasicMaterial({ color })}
                // material={new THREE.MeshStandardMaterial({ color, roughness: 0, metalness: 0 })}
                position={position}
                scale={scale}
            />
        </>

    );
}
