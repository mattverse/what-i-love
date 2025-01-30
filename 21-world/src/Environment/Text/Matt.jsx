import { Text, Text3D, useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function Matt() {
    const matt = useGLTF('./matt.glb')


    useEffect(() => {
        matt.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
    }, [matt])

    return <>
        <primitive
            object={matt.scene}
            rotation={[0, -Math.PI / 2, 0]}
        />


        <Text
            font="./m6x11plus.ttf"
            color={"black"}
            lineHeight={0.8}
            scale={0.7}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[3.1, 0.1, 1.2]}
        >
            {"Creative\nDeveloper"}

        </Text>
    </>
}