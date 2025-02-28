import React from 'react'
import { Text, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Osmosis() {

    return <>
        <RigidBody colliders="cuboid">
            <Potion />
        </RigidBody>
        <RigidBody colliders="cuboid">
            <OsmosisTextMesh />
        </RigidBody>
        <OsmosisSoftWareEngineerText />
        <OsmosisDateText />
        <OsmosisExplanationText />
        <OsmosisExperienceText />
    </>
}


function OsmosisTextMesh() {
    const { nodes, materials } = useGLTF('./work-experience/osmosis/osmosis-text.glb')
    return (
        <group
            dispose={null}
            scale={0.2}
            position={[7.5, 2, -3.5]}
        >
            <mesh geometry={nodes.Plane003.geometry} material={materials['Material.007']} />
            <mesh geometry={nodes.Plane003_1.geometry} material={materials['smoke-white']} />
        </group>
    )
}
useGLTF.preload('./work-experience/osmosis/osmosis-text.glb')

function Potion() {
    const { nodes, materials } = useGLTF('./work-experience/osmosis/osmosis-logo.glb')
    return (
        <group
            scale={0.15}
            dispose={null}
            position={[9.5, 2, -3.5]}
        >
            <mesh geometry={nodes.mesh2068853349.geometry} material={materials.mat24} />
            <mesh geometry={nodes.mesh2068853349_1.geometry} material={materials.mat2} />
            <mesh geometry={nodes.mesh2068853349_2.geometry} material={materials.mat19} />
        </group>
    )
}
useGLTF.preload('./work-experience/osmosis/osmosis-logo.glb')



function OsmosisSoftWareEngineerText() {
    return <Text
        font="./fonts/m6x11plus.ttf"
        color={"black"}
        lineHeight={0.8}
        scale={0.6}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[8.1, 0.4, -2.9]}
    >
        {"Software Engineer"}
    </Text>
}

function OsmosisDateText() {
    return <Text
        font="./fonts/m6x11plus.ttf"
        color={"black"}
        lineHeight={0.8}
        scale={0.35}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[12.6, 0.5, -2.7]}
    >
        {"2021-2025"}
    </Text>
}

function OsmosisExplanationText() {
    return <Text
        font="./fonts/m6x11plus.ttf"
        color={"black"}
        lineHeight={1}
        scale={0.25}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[9.8, 0.5, -2.1]}
    >
        {`Osmosis is the largest decentralized exchange in the Cosmos ecosystem,
facilitating cross-chain liquidity via IBC with over $100M in total value locked (TVL).`}
    </Text>

}

function OsmosisExperienceText() {
    return <Text
        font="./fonts/m6x11plus.ttf"
        color={"black"}
        lineHeight={1}
        scale={0.3}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[9.7, 0.5, 1.5]}>
        {`-   Rust & WebAssembly: Pioneered ICNS (Interchain Name Service)
    by adapting DNS infrastructure in Rust and CosmWasm, simplifying
    cross-chain user interactions. Drove adoption to 52,000+ registered
    domains within 3 months of launch.

-   Performance & Optimization: Delivered cross-system performance 
    optimizations, 400% performance speedup in IAVL database,74% 
    reduced SDK operation time, and 24% shorter Next.js builds via 
    Webpack/SWC integration, enhancing network speed and application
    efficiency.

-   GoLang & System Architecture: Architected high-performance network
    with Golang and Cosmos SDK, focusing on efficiency improvements
    that enhanced network speed and application responsiveness.

-   Open Source Contribution: Core contributor to open-sourced Osmosis
    codebase. Spearheaded cross-functional feature development,
    contribution and codereviews for 1000+ PRs.`}

    </Text>
}