import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { InstancedMesh } from 'three'
import Lights from './Lights.jsx'

export default function Experience() {
    const grid = 10; // Adjust grid size to test visibility
    const size = 0.5;
    const gridSize = grid * size;

    // Reference to the instanced mesh
    const meshRef = useRef(null);

    // Set instance positions
    if (meshRef.current) {
        let i = 0;
        for (let x = 0; x < grid; x++) {
            for (let z = 0; z < grid; z++) {
                const id = i++;
                const position = [x * size, 0, z * size];
                meshRef.current.setMatrixAt(id, new THREE.Matrix4().setPosition(...position));
            }
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    }

    return (
        <>
            <OrbitControls makeDefault />
            <Lights />

            <instancedMesh
                ref={meshRef}
                castShadow
                receiveShadow
                args={[null, null, grid * grid]}
            >
                <boxGeometry args={[size, 0.5, size]} />
                <meshPhysicalMaterial color={"#1f84ff"} metalness={0} roughness={0.0} />
            </instancedMesh>
        </>
    )
}
