import { Text, Text3D, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";

export default function MattText() {
    const matt = useGLTF('./mattText.glb')


    useEffect(() => {
        matt.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
    }, [matt])

    return <>
        <RigidBody
            colliders="hull"
            friction={0}
            restitution={0.2}
            canSleep={false}
            linearDamping={10}
            angularDamping={4}

        >
            <primitive
                position={[-0.2, 0, -2]}
                object={matt.scene}
                rotation={[0, -Math.PI / 2, 0]}
            />
        </RigidBody>

        <Text
            font="./m6x11plus.ttf"
            color={"black"}
            lineHeight={0.8}
            scale={0.7}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[2.9, 0.5, -0.4]}
        >
            {"Creative\nDeveloper"}
        </Text>
    </>
}