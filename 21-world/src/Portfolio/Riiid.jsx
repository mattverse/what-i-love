import * as THREE from 'three'
import React from 'react'
import { Text, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Riiid() {

    return <>
        <RigidBody colliders="cuboid">
            <RiiidLogo />
        </RigidBody>
        <RigidBody colliders="cuboid">
            <RiiidTextMesh />
        </RigidBody>
        <RiiidSoftWareEngineerText />
        <RiiidDateText />
        <RiiidExplanationText />
        <RiiidExperienceText />
    </>
}


function RiiidTextMesh() {
    const { nodes, materials } = useGLTF('./portfolio/riiid/riiidText.glb')
    return (
        <group
            dispose={null}
            scale={0.2}
            position={[19.5, 0.9, -3.7]}
        >
            <mesh geometry={nodes.Plane003.geometry} material={materials['Material.007']} />
            <mesh geometry={nodes.Plane003_1.geometry} material={materials['smoke-white']} />
        </group>
    )
}
useGLTF.preload('./portfolio/osmosis/osmosisText.glb')

function RiiidLogo() {
    const { nodes, materials } = useGLTF('./portfolio/riiid/riiidLogo.glb')
    return (
        <group dispose={null} scale={0.13} position={[20.8, 2, -3.45]}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={2.817}>
                <mesh geometry={nodes.Plane006.geometry} material={materials['Material.012']} />
                <mesh geometry={nodes.Plane006_1.geometry} material={materials['smoke-white']} />
            </group>
        </group>
    )
}
useGLTF.preload('./portfolio/riiid/riiidLogo.glb')



function RiiidSoftWareEngineerText() {
    return <Text
        font="./m6x11plus.ttf"
        color={"black"}
        lineHeight={0.8}
        scale={0.6}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[20.88, 0.4, -2.9]}
    >
        {"Frontend Developer"}
    </Text>
}

function RiiidDateText() {
    return <Text
        font="./m6x11plus.ttf"
        color={"black"}
        lineHeight={0.8}
        scale={0.35}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[25.3, 0.5, -2.7]}
    >
        {"2020-2021"}
    </Text>
}

function RiiidExplanationText() {
    return <Text
        font="./m6x11plus.ttf"
        color={"black"}
        lineHeight={1}
        scale={0.25}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[22.2, 0.5, -2.1]}
    >
        {`Riiid is an EdTech company that leverages AI to deliver personalized learning
solutions, specializing in adaptive test prep and educational analytics.
`}
    </Text>

}

function RiiidExperienceText() {
    return <Text
        font="./m6x11plus.ttf"
        color={"black"}
        lineHeight={1}
        scale={0.3}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[22.6, 0.5, 1.5]}>
        {`- Led end-to-end development of a flagship investor relations
  (IR) portal showcasing company products and metrics, collaborating with
  C-suite stakeholders to align design with strategic goals. The platform
  became the primary tool for securing investments and onboarding
  institutional partners.

- Pioneered gRPC adoption for inter-service communication, leveraging
  protocol buffers and HTTP/2 to streamline data workflows, achieving
  5% faster transmission speeds and 3% lower latency vs. RESTful APIs.


- Engineered a Redis-based distributed caching layer, reducing AI
  inference latency by 15% and accelerating real-time user interactions
  for 500K+ monthly active users.`}
    </Text>
}