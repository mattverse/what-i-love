import { useEffect } from "react";
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';

export default function Ground() {
    const { scene: groundScene } = useGLTF('./environment/plain-grass.glb');

    const groundTexture = useTexture('./environment/baked.jpg');

    useEffect(() => {
        groundTexture.flipY = false;
        groundTexture.needsUpdate = true;

        if (groundScene) {
            groundScene.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshBasicMaterial({ map: groundTexture });
                    child.material.needsUpdate = true;
                    child.castShadow = false;
                    child.receiveShadow = true;
                }
            });
        }
    }, [groundScene, groundTexture]);
    return <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={'#87a854'} roughness={1} />
    </mesh>
}