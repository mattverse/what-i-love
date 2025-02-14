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
            uniforms={{
                uTime: { value: time },
                uBorderAlpha: { value: borderAlpha },
                uStrikeAlpha: { value: strikeAlpha },
            }}
            vertexShader={`
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        
        void main() {
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          vNormal = normalMatrix * normal;
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
        }
      `}
            fragmentShader={`
        uniform float uTime;
        uniform float uBorderAlpha;
        uniform float uStrikeAlpha;
        
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        
        void main() {
          // 3D Stripes - Vertical animation
          float stripe = mod(vWorldPosition.y * 2.0 - uTime * 0.5, 1.0);
          float stripeAlpha = step(0.5, stripe) * uStrikeAlpha;
          
          // Edge detection using normals
          float edge = smoothstep(0.85, 0.9, 
            max(
              max(abs(vNormal.x), abs(vNormal.y)),
              abs(vNormal.z)
            )
          ) * uBorderAlpha;
          
          // Depth effect using normals
          float depth = 1.0 - smoothstep(-0.2, 0.2, vNormal.y);
          
          gl_FragColor = vec4(
            1.0,  // R
            1.0,  // G
            1.0,  // B
            max(stripeAlpha * depth, edge) // A
          );
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
            materialRef.current.uniforms.uBorderAlpha.value = active ? 0.8 : 0
            materialRef.current.uniforms.uStrikeAlpha.value = active ? 0.4 : 0
        }
    })

    return (
        <mesh
            position={[-6.6, 1.4, 1.4]} // Center position
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