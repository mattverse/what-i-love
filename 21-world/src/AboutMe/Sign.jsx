import { useGLTF, Text } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from 'three';
import { useControls } from 'leva';

export default function Sign(props) {
    const { nodes, materials } = useGLTF('./environment/signs/sign-main.glb')

    return (
        <>
            <RigidBody
                type="dynamic"
                colliders="cuboid"
                linearDamping={5}
                angularDamping={5}
            >
                <group {...props} scale={0.17} position={[-2, 1.2, 2]} dispose={null}>
                    <mesh geometry={nodes.signpost_1003.geometry} material={materials.wood} />
                    <mesh geometry={nodes.signpost_1003_1.geometry} material={materials['Dark Wood']} />
                </group>
                <Text
                    font="./fonts/m6x11plus.ttf"
                    fontSize={0.2}
                    color="black"
                    position={[-2.1, 1.1, 2.05]}
                    rotation={[0, 0., 0.1]}
                    letterSpacing={-0.04}
                    anchorX="center"
                    anchorY="middle"
                >
                    Portfolio
                </Text>
                <Text
                    font="./fonts/m6x11plus.ttf"
                    fontSize={0.2}
                    color="black"
                    position={[-1.65, 1.48, 2.05]}
                    rotation={[0, 0., 0.1]}
                    letterSpacing={-0.04}
                    anchorX="center"
                    anchorY="middle"
                >
                    Work Experience
                </Text>
            </RigidBody >

        </>

    );
}
useGLTF.preload('./environment/signs/sign-main.glb')
