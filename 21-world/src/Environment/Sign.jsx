import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from 'three';
import { useControls } from 'leva';

export default function Sign({ position, scale }) {
    const { nodes } = useGLTF('./environment/sign.glb'); // Load as a mesh\

    const meshRef = useRef();
    const sign = useGLTF('./environment/sign.glb')

    return (
        <>
            <RigidBody
                type="dynamic"
                colliders="cuboid"
                linearDamping={5}
                angularDamping={5}
            >
                <primitive
                    object={sign.scene}
                    position={[0.3, 1.2, 2]}
                    rotation={[0, 0, 0]}
                    scale={0.15}
                />
            </RigidBody >
        </>

    );
}
