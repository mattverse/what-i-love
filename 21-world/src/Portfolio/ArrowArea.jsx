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

// Add new shader material for the border plane
const BorderPlaneMaterial = forwardRef(({ borderAlpha = 0.8 }, ref) => {
    return (
        <shaderMaterial
            ref={ref}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            uniforms={{
                uBorderAlpha: { value: borderAlpha },
                uBorderWidth: { value: 0.1 }
            }}
            vertexShader={`
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `}
            fragmentShader={`
                uniform float uBorderAlpha;
                uniform float uBorderWidth;
                varying vec2 vUv;

                void main() {
                    // Calculate border areas
                    float border = smoothstep(0.0, uBorderWidth, vUv.x) *
                                  smoothstep(1.0, 1.0 - uBorderWidth, vUv.x) *
                                  smoothstep(0.0, uBorderWidth, vUv.y) *
                                  smoothstep(1.0, 1.0 - uBorderWidth, vUv.y);
                    
                    // Invert to get outline
                    float alpha = 1.0 - border;
                    alpha = step(0.5, alpha) * uBorderAlpha;
                    
                    gl_FragColor = vec4(vec3(1.0), alpha);
                }
            `}
        />
    )
});

// Updated Fence component
const Fence = ({ active }) => {
    const materialRef = useRef()
    const planeMaterialRef = useRef()
    const size = [1.5, 2.0, 0.5] // [width, height, depth]
    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
            materialRef.current.uniforms.uBorderAlpha.value = active ? 0.8 : 0
            materialRef.current.uniforms.uStrikeAlpha.value = active ? 0.4 : 0
        }
    })

    return (
        <group>
            {/* Main Fence Body */}
            <mesh position={[-6.6, 1.4, 1.4]}>
                <boxGeometry args={size} />
                <FenceMaterial ref={materialRef} />
            </mesh>

            {/* Border Plane */}
            <mesh
                position={[-6.6, 0.5, 1.4]} // Slightly above ground
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <planeGeometry args={[1.5, 0.5]} />
                <BorderPlaneMaterial ref={planeMaterialRef} />
            </mesh>
        </group>
    )
}


export const ArrowArea = ({ onIntersection }) => {
    const [isActive, setIsActive] = useState(false)

    return (
        <group>
            {/* Always visible border plane */}
            <BorderPlane />

            <RigidBody type="fixed" sensor>
                <CuboidCollider
                    args={[0.75, 1.0, 0.25]}
                    position={[-6.6, 1.4, 1.4]}
                    onIntersectionEnter={() => setIsActive(true)}
                    onIntersectionExit={() => setIsActive(false)}
                />
            </RigidBody>

            {/* Only show animated fence when active */}
            {isActive && <Fence active={isActive} />}
        </group>
    )
}

const BorderPlane = () => {
    const materialRef = useRef()
    const size = [1.5, 0.5]

    useFrame(() => {
        if (materialRef.current) {
            // Standard conditional check instead of optional chaining assignment
            if (materialRef.current.uniforms.uTime) {
                materialRef.current.uniforms.uTime.value = performance.now() / 1000
            }
        }
    })


    return (
        <mesh
            position={[-6.6, 0.01, 1.4]}
            rotation={[-Math.PI / 2, 0, 0]}
        >
            <planeGeometry args={size} />
            <shaderMaterial
                ref={materialRef}
                transparent
                depthWrite={false}
                side={THREE.DoubleSide}
                uniforms={{
                    uBorderAlpha: { value: 0.8 },
                    uBorderWidth: { value: 0.1 },
                    uTime: { value: 0 }
                }}
                vertexShader={`
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `}
                fragmentShader={`
                    uniform float uBorderAlpha;
                    uniform float uBorderWidth;
                    varying vec2 vUv;

                    void main() {
                        // Calculate border mask
                        float border = 
                            smoothstep(0.0, uBorderWidth, vUv.x) *
                            smoothstep(1.0, 1.0 - uBorderWidth, vUv.x) *
                            smoothstep(0.0, uBorderWidth, vUv.y) *
                            smoothstep(1.0, 1.0 - uBorderWidth, vUv.y);
                        
                        // Invert to get outline effect
                        float alpha = (1.0 - border) * uBorderAlpha;
                        gl_FragColor = vec4(vec3(1.0), alpha);
                    }
                `}
            />
        </mesh>
    )
}
