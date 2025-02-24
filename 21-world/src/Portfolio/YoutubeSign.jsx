import React from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from "@react-three/rapier";


export default function VideoSign(props) {
    const { nodes, materials } = useGLTF('./portfolio/video-sign.glb')
    return (
        <RigidBody
            type="fixed"
            colliders="cuboid"
        >

            <group {...props} dispose={null} scale={0.25} >
                <mesh geometry={nodes['Frame_16-9_02_-_Default_0'].geometry} material={materials['02_-_Default']} />
            </group>
        </RigidBody>
    )
}

useGLTF.preload('./portfolio/video-sign.glb')
