import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ToneMapping, Glitch } from '@react-three/postprocessing'
import { ToneMappingMode, GlitchMode } from 'postprocessing'

export default function MattText() {
    const { nodes, materials } = useGLTF('/about-me/matt-park-text.glb');
    const groupRef = useRef();

    // Auto-rotation configuration
    const ROTATION_SPEED = 1; // Adjust this value to change rotation speed

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Continuous rotation around Z-axis
            groupRef.current.rotation.z += delta * ROTATION_SPEED;
        }
    });

    return (
        <group>
            <group
                position={[0.1, 0., 0.8]}
            >
                <group
                    ref={groupRef}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={[0.8, 0.6, 0.6]}
                >
                    <mesh geometry={nodes.Plane026.geometry} material={materials['Material.007']} />
                    <mesh geometry={nodes.Plane026_1.geometry} material={materials['smoke-white']} />
                </group>
            </group>
            <EffectComposer disableNormalPass>
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
                <Bloom
                    luminanceThreshold={0.5}
                    intensity={1.2}
                    mipmapBlur
                />
                <Glitch
                    delay={[1.5, 3.5]}
                    duration={[0.6, 1.0]}
                    strength={[0.3, 1.0]}
                    mode={GlitchMode.SPORADIC}
                    active
                    ratio={0.85}
                />
            </EffectComposer>
        </group>
    );
}

useGLTF.preload('/about-me/matt-park-text.glb');