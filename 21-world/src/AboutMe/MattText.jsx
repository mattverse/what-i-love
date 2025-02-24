import { Text, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

// ...

export default function MattText() {
    const { nodes, materials } = useGLTF('/about-me/matt-park-text.glb')

    return <group position={[0, 0, 0.8]}>
        <RigidBody
            colliders="cuboid"
            friction={0}
            restitution={0.2}
            canSleep={false}
            linearDamping={10}
            angularDamping={4}

        >
            <group rotation={[Math.PI / 2, 0, 0]} scale={[0.8, 0.6, 0.6]} position={[0.8, 1.2, -1.2]}>
                <mesh geometry={nodes.Plane026.geometry} material={materials['Material.007']} />
                <mesh geometry={nodes.Plane026_1.geometry} material={materials['smoke-white']} />
            </group>
        </RigidBody>

        <Text
            font="./fonts/m6x11plus.ttf"
            color={"black"}
            lineHeight={0.8}
            scale={0.6}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[1., 0.5, -0.4]}
        >
            {"Creative\nDeveloper"}
        </Text>
    </group>
}

useGLTF.preload('/about-me/matt-park-text.glb')
