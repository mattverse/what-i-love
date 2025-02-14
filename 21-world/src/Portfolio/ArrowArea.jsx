import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useState, useRef, forwardRef } from 'react'
import * as THREE from 'three'
const FenceMaterial = forwardRef(({ time = 0, borderAlpha = 0.5, strikeAlpha = 0.25 }, ref) => {
    return (
        <shaderMaterial
            ref={ref}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            uniforms={{
                uTime: { value: time },
                uBorderAlpha: { value: borderAlpha },
                uStrikeAlpha: { value: strikeAlpha },
                uStrikeWidth: { value: 0.5 },
                uBorderWidth: { value: 0.05 },  // Border thickness control
                uBandHeight: { value: 0.4 }
            }}
            vertexShader={`
                varying vec3 vPosition;
                varying vec2 vUv;
                varying vec3 vModelPosition;
                
                void main() {
                    vPosition = position;
                    vModelPosition = position;
                    vUv = uv;
                    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
                }
            `}
            fragmentShader={`
                uniform float uTime;
                uniform float uBorderAlpha;
                uniform float uStrikeAlpha;
                uniform float uStrikeWidth;
                uniform float uBorderWidth;
                uniform float uBandHeight;
                
                varying vec3 vPosition;
                varying vec3 vModelPosition;
                varying vec2 vUv;

                void main() {
                    // Hard vertical band boundaries
                    float verticalPosition = abs(vModelPosition.y);
                    if(verticalPosition > uBandHeight) discard;

                    // Animated diagonal stripes
                    float strike = mod(
                        (vPosition.x + vPosition.y - uTime * 0.35 + vPosition.z) / 
                        uStrikeWidth * 0.5, 
                        1.0
                    );
                    float strikeStrength = step(strike, 0.5) * uStrikeAlpha;

                    // Original side borders (left/right)
                    float sideBorder = max(
                        step(1.0 - vUv.x, uBorderWidth), 
                        step(vUv.x, uBorderWidth)
                    ) * uBorderAlpha;

                    // New edge borders (top/bottom of stripe band)
                    float edgeBorder = smoothstep(
                        uBandHeight - uBorderWidth * 2.0,
                        uBandHeight - uBorderWidth * 0.5,
                        verticalPosition
                    ) * uBorderAlpha;

                    // Combine all effects
                    float alpha = max(max(strikeStrength, sideBorder), edgeBorder);
                    
                    gl_FragColor = vec4(vec3(1.0), alpha);
                }
            `}
        />
    )
})


const Fence = ({ active }) => {
    const materialRef = useRef()
    const size = [1.5, 2.0, 0.5] // [width, height, depth]

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
            materialRef.current.uniforms.uBorderAlpha.value = active ? 0.8 : 0  // Control border visibility
            materialRef.current.uniforms.uStrikeAlpha.value = active ? 0.4 : 0
        }
    })

    return (
        <mesh
            position={[-6.6, 1.4, 1.4]}
            scale={[1, 1, 1]}
        >
            <boxGeometry args={size} />
            <FenceMaterial ref={materialRef} />
        </mesh>
    )
}

export const ArrowArea = ({ onIntersection }) => {
    const [isActive, setIsActive] = useState(false)

    return (
        <group>
            <RigidBody type="fixed" sensor>
                <CuboidCollider
                    args={[0.75, 1.0, 0.25]} // Match 3D box size
                    position={[-6.6, 1.4, 1.4]}
                    onIntersectionEnter={() => setIsActive(true)}
                    onIntersectionExit={() => setIsActive(false)}
                />
            </RigidBody>

            {isActive && <Fence active={isActive} />}
        </group>
    )
}