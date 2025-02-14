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
                uStrikeWidth: { value: 0.2 },
                uBorderWidth: { value: 0.05 },
                uBandHeight: { value: 0.2 }
            }}
            vertexShader={`
                varying vec3 vPosition;
                varying vec3 vModelPosition;
                
                void main() {
                    vPosition = position;
                    vModelPosition = position;
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

                void main() {
                    // Vertical band boundaries
                    float verticalPosition = abs(vModelPosition.y);
                    if(verticalPosition > uBandHeight) discard;

                    // Animated diagonal stripes
                    float strike = mod(
                        (vPosition.x + vPosition.y - uTime * 0.35 + vPosition.z) / 
                        uStrikeWidth * 0.5, 
                        1.0
                    );
                    float strikeStrength = step(strike, 0.5) * uStrikeAlpha;

                    // Top and bottom edge borders
                    float edgeBorder = smoothstep(
                        uBandHeight - uBorderWidth * 2.0,
                        uBandHeight,
                        verticalPosition
                    ) * uBorderAlpha;

                    // Combine effects
                    float alpha = max(strikeStrength, edgeBorder);
                    
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