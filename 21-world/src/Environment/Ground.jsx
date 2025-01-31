import { useEffect } from "react";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Ground() {
    const { scene: groundScene } = useGLTF("./environment/plain-grass.glb");

    // Load both textures
    const groundTexture = useTexture("./environment/baked.jpg");
    const stripeTexture = useTexture("./environment/grass-stripes.png");

    useEffect(() => {
        // Configure textures
        [groundTexture, stripeTexture].forEach(texture => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.flipY = false;
            texture.needsUpdate = true;
        });

        // Stripe texture setup
        stripeTexture.wrapS = stripeTexture.wrapT = THREE.RepeatWrapping;
        stripeTexture.matrixAutoUpdate = false;
        stripeTexture.matrix.setUvTransform(
            0, 0,
            1.5, 1.5, // Repeat pattern
            Math.PI / 2, // 45° rotation
            0.5, 0.5
        );

        // Ground material setup
        if (groundScene) {
            groundScene.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        map: groundTexture,
                        metalness: 0,
                        roughness: 1,
                        toneMapped: true
                    });
                    child.receiveShadow = true;
                }
            });
        }
    }, [groundScene, groundTexture, stripeTexture]);

    return (
        <RigidBody type="fixed" colliders="cuboid" friction={0}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <boxGeometry args={[10, 8, 0.7]} /> {/* Flat cube */}
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
