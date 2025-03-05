import { Icosahedron, OrbitControls, useGLTF } from '@react-three/drei'
import { useRapier, Physics, RigidBody } from '@react-three/rapier'
import { useFrame, useThree } from '@react-three/fiber'
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three'


export default function Hand(props) {
    // Hands
    const hand = useRef()
    const handModel = useGLTF('./Hand/hand.gltf')
    const [fingerTo, setFingerTo] = useState(new THREE.Vector3())

    const { camera, raycaster } = useThree()
    const bowlMesh = props.bowlRef.current

    handModel.scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true
        }
    })

    handModel.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    useEffect(() => {
        const handleMouseMove = (event) => {
            // Update cursor position state
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera({ x, y }, camera)

            const intersects = raycaster.intersectObject(bowlMesh, false)

            if (intersects.length > 0) {
                setFingerTo(intersects[0].point)
            }
        }

        window.addEventListener('mousemove', handleMouseMove);

        // Clean up
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [bowlMesh]);

    useFrame(() => {
        // ensure model is loaded before animating it
        if (hand.current) {
            // Move hand towards fingerTo
            const fingerPosition = fingerTo.clone()
            fingerPosition.y += 2.6
            hand.current.setNextKinematicTranslation(fingerPosition)
        }
    })

    return <RigidBody
        position={[5, 5, 0]}
        colliders="trimesh"
        ref={hand}
        scale={0.02}
        rotation={[Math.PI * 1 / 2, 0, 0]}
        type='kinematicPosition'
        friction={0.9}
        canSleep={false}
    >
        <primitive
            object={handModel.scene}
        >
        </primitive>
    </RigidBody>
}

useGLTF.preload('./Hand/hand.gltf')