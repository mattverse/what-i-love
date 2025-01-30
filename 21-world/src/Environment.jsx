import { useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import GrassShort from './Environment/GrassShort';

export default function Environment() {
    const { scene: plainGrassScene } = useGLTF('./environment/plain-grass.glb'); // Load the entire grass scene
    const grassRef = useRef();
    const grassTexture = useTexture('./environment/baked.jpg');

    useEffect(() => {
        grassTexture.flipY = false;
        grassTexture.needsUpdate = true;

        if (plainGrassScene) {
            plainGrassScene.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshBasicMaterial({ map: grassTexture });
                    child.material.needsUpdate = true;
                    child.castShadow = false;  // Make sure the plane does NOT cast shadows
                    child.receiveShadow = true;
                }
            });
        }
    }, [plainGrassScene, grassTexture]);

    return <>
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
        >
            <planeGeometry args={[100, 100]} /> {/* Adjust size as needed */}
            <meshStandardMaterial color={'#D7FF6A'} />
        </mesh>
        <GrassShort position={[10, 0, 2]} scale={1.5} />

    </>
}
