import React from 'react'
import { Text, useGLTF } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

export default function Awake() {

    return <>
        <RigidBody colliders={false}>
            <CuboidCollider args={[0.2, 0.26, 0.4]}
                position={[32.5, 2, -3.7]}
            />
            <AwakeLogo />
        </RigidBody>
        <RigidBody colliders="cuboid">
            <AwakeTextMesh />
        </RigidBody>
        <AwakeSoftWareEngineerText />
        <AwakeDateText />
        <AwakeExplanationText />
        <AwakeExperienceText />
    </>
}


function AwakeTextMesh() {
    const { nodes, materials } = useGLTF('./work-experience/awake/awake-text.glb')
    return (
        <group position={[31, 2, -3.7]} dispose={null} scale={0.2}>
            <mesh geometry={nodes.Plane004.geometry} material={materials['Material.007']} />
            <mesh geometry={nodes.Plane004_1.geometry} material={materials['smoke-white']} />
        </group>
    )
}
useGLTF.preload('./work-experience/awake/awake-text.glb')

function AwakeLogo() {
    const { nodes, materials } = useGLTF('./work-experience/awake/awake-logo.glb')
    return (
        <group dispose={null} scale={0.015} position={[32.5, 2, -3.3]}>
            <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
                <mesh geometry={nodes.Icosphere001_0_1.geometry} material={materials.Brown_bear} />
                <mesh geometry={nodes.Icosphere001_0_2.geometry} material={materials.Brown_bear_Nose} />
                <mesh geometry={nodes.Icosphere001_0_3.geometry} material={materials['eye.001']} />
            </group>
        </group>
    )
}
useGLTF.preload('./work-experience/awake/awake-logo.glb')



function AwakeSoftWareEngineerText() {
    return <Text
        font="./fonts/m6x11plus.ttf"
        color={"black"}
        lineHeight={0.8}
        scale={0.5}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[32.8, 0.4, -2.9]}
    >
        {"CO-Founder, Full Stack Developer"}
    </Text>
}

function AwakeDateText() {
    return <Text
        font="./fonts/m6x11plus.ttf"
        color={"black"}
        lineHeight={0.8}
        scale={0.35}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[37.6, 0.5, -2.76]}
    >
        {"2019-2020"}
    </Text>
}

function AwakeExplanationText() {
    return <Text
        font="./fonts/m6x11plus.ttf"
        color={"black"}
        lineHeight={1}
        scale={0.25}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[34.1, 0.5, -2.1]}
    >
        {`Awake Corporation develops SaaS solutions that empower creators with business automation,
data analytics, aand scalable monetization tools.
`}
    </Text>

}

function AwakeExperienceText() {
    return <Text
        font="./fonts/m6x11plus.ttf"
        color={"black"}
        lineHeight={1}
        scale={0.3}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[33.7, 0.5, 1.2]}>
        {`-   System Architecture & Development: Spearheaded end-to-end
    development and launch of a data analytics SaaS platform for 
    Instagram influencers, enabling real-time audience demographics 
    tracking, engagement trend prediction, and content ROI analysis.

-   Data Visualization & Backend Engineering: Architected scalable backend
    infrastructure using MongoDB, Express, and Node.js, designing 
    RESTful APIs to handle 50+ concurrent requests/sec, and built an
    interactive frontend with React, Redux, and D3.js for 
    real-time data visualization.

-   Optimization: Drove platform adoption to 3,000+ registered users
    within 3 months of launch, optimizing PostgreSQL query performance
    to sustain 500ms latency during traffic spikes.`}
    </Text>
}