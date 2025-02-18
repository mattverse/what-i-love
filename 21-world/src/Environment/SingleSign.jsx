
import React from 'react'
import { useGLTF, Text } from '@react-three/drei'
import { CuboidCollider, RigidBody } from "@react-three/rapier";


export default function SingleSign(props) {
    const { nodes, materials } = useGLTF('./environment/single-sign.glb')
    return (
        <>
            <RigidBody
                type="dynamic"
                colliders={false}
                linearDamping={5}
                angularDamping={5}
            >
                <CuboidCollider args={[0.1, 0.5, 0.1]} position={[-9.9, 0.9, 1.9]} />


                <group {...props} dispose={null} position={[-10, 0, 2]}>
                    <group scale={1.2}>
                        <mesh geometry={nodes.Sign1_1.geometry} material={materials['Dark Wood.001']} />
                        <mesh geometry={nodes.Sign1_2.geometry} material={materials.wood} />
                    </group>
                    <Text
                        font="./m6x11plus.ttf"
                        fontSize={0.2}
                        color="black"
                        position={[-0.3, 1.45, 0.06]}
                        letterSpacing={-0.04}
                        anchorX="center"
                        anchorY="middle"
                    >
                        Public Speaking
                    </Text>

                </group >
            </RigidBody>
        </>
    )
}

useGLTF.preload('./environment/single-sign.glb')
