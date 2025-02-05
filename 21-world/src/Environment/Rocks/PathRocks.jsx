import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva';

export default function PathRocks() {
    const { nodes } = useGLTF('./environment/rock/rocks.glb'); // Load as a mesh

    // Use Leva to control the color
    const { color } = useControls('Path Rock', {
        color: '#adadad'
    });


    const rocksGeometryArray = Array.from({ length: 5 }, (_, i) => nodes[`rock-${i + 1}`].geometry);
    const rockMaterial = new THREE.MeshStandardMaterial({ color, roughness: 1 })



    return (
        <>
            <mesh geometry={rocksGeometryArray[4]} material={rockMaterial} scale={0.18} position={[-0.9, 0.4, -1.6]} rotation={[0, Math.PI / 2, 0]} />
            <mesh geometry={rocksGeometryArray[3]} material={rockMaterial} scale={0.18} position={[-0.7, 0.4, -0.8]} rotation={[0, Math.PI / 2 + 0.1, 0]} />
            <mesh geometry={rocksGeometryArray[2]} material={rockMaterial} scale={0.14} position={[-0.8, 0.4, 0.15]} rotation={[0, 0, 0]} />
            <mesh geometry={rocksGeometryArray[4]} material={rockMaterial} scale={0.2} position={[-0.6, 0.4, -0.1]} rotation={[0, 0, 0]} />
            <mesh geometry={rocksGeometryArray[2]} material={rockMaterial} scale={0.14} position={[-0.8, 0.4, 1]} rotation={[0, Math.PI / 2, 0]} />
            <mesh geometry={rocksGeometryArray[0]} material={rockMaterial} scale={0.14} position={[-0.8, 0.4, 1.9]} rotation={[0, 0, 0]} />
            <mesh geometry={rocksGeometryArray[0]} material={rockMaterial} scale={0.14} position={[-0.8, 0.4, 2.7]} rotation={[0, 0.1, 0]} />
            <mesh geometry={rocksGeometryArray[0]} material={rockMaterial} scale={0.14} position={[-0.8, 0.4, 2.7]} rotation={[0, 0.1, 0]} />
            <mesh geometry={rocksGeometryArray[0]} material={rockMaterial} scale={0.14} position={[0, 0.4, 2.7]} rotation={[0, 0, 0]} />
            <mesh geometry={rocksGeometryArray[1]} material={rockMaterial} scale={0.14} position={[0.8, 0.4, 2.7]} rotation={[0, 0, 0]} />
            <mesh geometry={rocksGeometryArray[2]} material={rockMaterial} scale={0.14} position={[1.5, 0.4, 2.6]} rotation={[0, 0, 0]} />
            <mesh geometry={rocksGeometryArray[4]} material={rockMaterial} scale={0.14} position={[1.7, 0.4, 2.4]} rotation={[0, 0, 0]} />
            <mesh geometry={rocksGeometryArray[0]} material={rockMaterial} scale={0.14} position={[2.3, 0.4, 2.55]} rotation={[0, 0, 0]} />
            <mesh geometry={rocksGeometryArray[1]} material={rockMaterial} scale={0.14} position={[3.1, 0.4, 2.5]} rotation={[0, Math.PI / 2 + 0.1, 0]} />
            <mesh geometry={rocksGeometryArray[2]} material={rockMaterial} scale={0.14} position={[3.8, 0.4, 2.5]} rotation={[0, -Math.PI / 2 - 0.05, 0]} />
            <mesh geometry={rocksGeometryArray[1]} material={rockMaterial} scale={0.14} position={[4.6, 0.4, 2.5]} rotation={[0, Math.PI / 2, 0]} />
        </>
    );
}
