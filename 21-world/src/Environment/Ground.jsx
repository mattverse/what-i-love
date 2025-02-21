import { useEffect } from "react";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export default function Ground() {
    const stripeTexture = useTexture("./environment/grass-stripes.png");

    // Mesh dimensions
    const meshArgs = [81.5, 11, 0.7]; // [width, height, depth]
    const textureScale = 10; // Adjust this to control texture density (lower = more repeats)

    useEffect(() => {
        stripeTexture.colorSpace = THREE.SRGBColorSpace;
        stripeTexture.flipY = false;
        stripeTexture.needsUpdate = true;

        stripeTexture.wrapS = stripeTexture.wrapT = THREE.RepeatWrapping;

        const tileSize = 10; // adjust this value as needed
        const groundWidth = 120; // the width of your ground geometry
        const groundDepth = 11;  // the depth of your ground geometry

        stripeTexture.repeat.set(groundWidth / tileSize, groundDepth / tileSize);
    }, [stripeTexture]);


    return (
        <RigidBody type="fixed" colliders="cuboid" friction={2}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[1., 0, 0]}>
                <boxGeometry args={meshArgs} />
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