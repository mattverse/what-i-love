import { useGLTF, Text } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ToneMapping, Glitch } from '@react-three/postprocessing'
import { ToneMappingMode, GlitchMode } from 'postprocessing'


export default function MattText() {
    const { nodes, materials } = useGLTF('/about-me/matt-park-text.glb');
    const groupRef = useRef();
    const [targetRotation, setTargetRotation] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);
    const { viewport } = useThree();

    // Rotation configuration
    const SNAP_STEPS = Math.PI / 8; // 45 degree increments (π/4 radians)
    const MAX_ROTATION = Math.PI / 3; // 60 degrees maximum rotation (π/3 radians)
    const ROTATION_SENSITIVITY = 1.5;

    const calculateRotation = (clientX) => {
        const normalizedX = (clientX / window.innerWidth) * 2 - 1;
        const rawRotation = normalizedX * MAX_ROTATION * ROTATION_SENSITIVITY;
        return Math.round(rawRotation / SNAP_STEPS) * SNAP_STEPS;
    };

    const handleMove = (event) => {
        let clientX;
        if (event.touches) {
            event.preventDefault();
            clientX = event.touches[0].clientX;
        } else {
            clientX = event.clientX;
        }

        if ('vibrate' in navigator && event.touches) {
            navigator.vibrate(10);
        }

        const newRotation = calculateRotation(clientX);
        setTargetRotation(newRotation);

        // Immediate rotation update
        if (groupRef.current) {
            groupRef.current.rotation.z = newRotation;
        }
    };

    useEffect(() => {
        const handleMoveWrapper = (e) => isInteracting && handleMove(e);

        window.addEventListener('mousemove', handleMoveWrapper);
        window.addEventListener('touchmove', handleMoveWrapper, { passive: false });

        return () => {
            window.removeEventListener('mousemove', handleMoveWrapper);
            window.removeEventListener('touchmove', handleMoveWrapper);
        };
    }, [isInteracting]);

    // Removed the useFrame animation
    // Removed the scale animation

    return (
        <group >
            <group
                position={[0.1, 0., 0.8]}
                onPointerOver={() => setIsInteracting(true)}
                onPointerOut={() => setIsInteracting(false)}
                onTouchStart={() => setIsInteracting(true)}
                onTouchEnd={() => setIsInteracting(false)}
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
                    intensity={2}
                    mipmapBlur
                />
                <Glitch
                    delay={[1.5, 3.5]} // min and max glitch delay
                    duration={[0.6, 1.0]} // min and max glitch duration
                    strength={[0.3, 1.0]} // min and max glitch strength
                    mode={GlitchMode.SPORADIC} // glitch mode
                    active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                    ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
                />
            </EffectComposer>
        </group>


    );
}

useGLTF.preload('/about-me/matt-park-text.glb');