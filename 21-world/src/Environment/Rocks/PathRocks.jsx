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
            <mesh geometry={rocksGeometryArray[0]} material={rockMaterial} scale={0.14} position={[5.4, 0.4, 2.5]} rotation={[0, Math.PI / 2, 0]} />
            <mesh geometry={rocksGeometryArray[0]} material={rockMaterial} scale={0.14} position={[6.2, 0.4, 2.5]} rotation={[0, Math.PI / 2, 0]} />
            <mesh geometry={rocksGeometryArray[2]} material={rockMaterial} scale={0.14} position={[7., 0.4, 2.5]} rotation={[0, Math.PI / 2, 0]} />

            <OsmosisRiiidPath geometry={rocksGeometryArray} material={rockMaterial} />
            <RiiidAwakePath geometry={rocksGeometryArray} material={rockMaterial} />
            <PortfolioPath geometry={rocksGeometryArray} material={rockMaterial} />
            <PublicSpeakingPath geometry={rocksGeometryArray} material={rockMaterial} />
            <GopherconPath geometry={rocksGeometryArray} material={rockMaterial} />
            <IBCSummitPath geometry={rocksGeometryArray} material={rockMaterial} />
            <PlatePath geometry={rocksGeometryArray} material={rockMaterial} />

        </>
    );
}

function OsmosisRiiidPath({ geometry, material }) {
    return (
        <>
            <mesh geometry={geometry[1]} material={material} scale={0.14} position={[16.2, 0.4, 2.5]} rotation={[0, Math.PI / 2, 0]} />
            <mesh geometry={geometry[0]} material={material} scale={0.135} position={[17., 0.4, 2.55]} rotation={[0, Math.PI / 2, 0]} />
            <mesh geometry={geometry[2]} material={material} scale={0.14} position={[17.8, 0.4, 2.55]} rotation={[0, Math.PI / 2, 0]} />
            <mesh geometry={geometry[2]} material={material} scale={0.14} position={[17.8, 0.4, 2.55]} rotation={[0, Math.PI / 2, 0]} />
            <mesh geometry={geometry[4]} material={material} scale={0.14} position={[18.5, 0.4, 2.38]} rotation={[0, Math.PI / 2, 0]} />
            <mesh geometry={geometry[2]} material={material} scale={0.14} position={[18.7, 0.4, 2.55]} rotation={[0, Math.PI / 2, 0]} />

        </>
    )
}

function RiiidAwakePath({ geometry, material }) {
    return (
        <>
            <mesh geometry={geometry[0]} material={material} scale={0.14} position={[28.5, 0.4, 2.5]} rotation={[0, Math.PI / 2, 0]} />
            <mesh geometry={geometry[0]} material={material} scale={0.14} position={[29.3, 0.4, 2.5]} rotation={[0, Math.PI / 2 + 0.05, 0]} />
            <mesh geometry={geometry[2]} material={material} scale={0.14} position={[30.1, 0.4, 2.5]} rotation={[0, Math.PI / 2, 0]} />
            <mesh geometry={geometry[0]} material={material} scale={0.14} position={[30.9, 0.4, 2.5]} rotation={[0, Math.PI / 2 - 0.05, 0]} />

        </>
    )
}

function PortfolioPath({ geometry, material }) {
    return (
        <>
            <mesh geometry={geometry[1]} material={material} scale={0.14} position={[-1.7, 0.4, 2.8]} rotation={[0, -Math.PI / 2, 0]} />
            <mesh geometry={geometry[2]} material={material} scale={0.14} position={[-2.4, 0.4, 2.8]} rotation={[0, -Math.PI / 2, 0]} />
            <mesh geometry={geometry[0]} material={material} scale={0.14} position={[-3.2, 0.4, 2.85]} rotation={[0, -Math.PI / 2, 0]} />

        </>
    )
}

function PublicSpeakingPath({ geometry, material }) {
    return (
        <>
            <mesh geometry={geometry[1]} material={material} scale={0.14} position={[-8.9, 0.4, 2.9]} rotation={[0, -Math.PI / 2, 0]} />
            <mesh geometry={geometry[2]} material={material} scale={0.14} position={[-9.6, 0.4, 2.85]} rotation={[0, -Math.PI / 2, 0]} />
            <mesh geometry={geometry[0]} material={material} scale={0.14} position={[-10.33, 0.4, 2.85]} rotation={[0, -Math.PI / 2, 0]} />

        </>
    )
}

function GopherconPath({ geometry, material }) {
    return (
        <>
            <mesh geometry={geometry[1]} material={material} scale={0.14} position={[-15.9, 0.4, 2.9]} rotation={[0, -Math.PI / 2, 0]} />
            <mesh geometry={geometry[0]} material={material} scale={0.14} position={[-16.6, 0.4, 2.85]} rotation={[0, -Math.PI / 2, 0]} />
            <mesh geometry={geometry[0]} material={material} scale={0.14} position={[-17.33, 0.4, 2.85]} rotation={[0, -Math.PI / 2, 0]} />

        </>
    )
}

function IBCSummitPath({ geometry, material }) {
    return (
        <>
            <mesh geometry={geometry[1]} material={material} scale={0.14} position={[-21.9, 0.4, 2.9]} rotation={[0, -Math.PI / 2, 0]} />
            <mesh geometry={geometry[0]} material={material} scale={0.14} position={[-22.6, 0.4, 2.85]} rotation={[0, -Math.PI / 2, 0]} />
            <mesh geometry={geometry[2]} material={material} scale={0.14} position={[-23.33, 0.4, 2.85]} rotation={[0, -Math.PI / 2, 0]} />

        </>
    )
}
function PlatePath({ geometry, material }) {
    return (
        <>
            <mesh geometry={geometry[1]} material={material} scale={0.14} position={[-27.9, 0.4, 2.9]} rotation={[0, -Math.PI / 2, 0]} />
            <mesh geometry={geometry[0]} material={material} scale={0.14} position={[-28.6, 0.4, 2.85]} rotation={[0, -Math.PI / 2, 0]} />
            <mesh geometry={geometry[1]} material={material} scale={0.14} position={[-29.33, 0.4, 2.85]} rotation={[0, Math.PI / 2, 0]} />

        </>
    )
}
