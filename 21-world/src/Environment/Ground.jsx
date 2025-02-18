import { useEffect } from "react";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Ground() {
    const stripeTexture = useTexture("./environment/grass/grass-stripes.png");

    useEffect(() => {
        // Configure textures
        stripeTexture.colorSpace = THREE.SRGBColorSpace;
        stripeTexture.flipY = false
        stripeTexture.needsUpdate = true


        // Stripe texture setup
        stripeTexture.wrapS = stripeTexture.wrapT = THREE.RepeatWrapping;
        stripeTexture.matrixAutoUpdate = false;
        stripeTexture.matrix.setUvTransform(
            0, 0,
            1.5, 1.5, // Repeat pattern
            Math.PI / 2, // 45° rotation
            0.5, 0.5
        );
    }, [stripeTexture]);

    return (
        <RigidBody type="fixed" colliders="cuboid" friction={2}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[20, 0, 0]}>
                <boxGeometry args={[120, 11, 0.7]} /> {/* Flat cube */}
                <meshBasicMaterial
                    map={stripeTexture}
                    metalness={0}
                    roughness={1}
                    toneMapped={true}
                />
            </mesh>
        </RigidBody>
    );
}
