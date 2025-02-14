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
                uStrikeWidth: { value: 0.5 },
                uBorderWidth: { value: 0.1 }
            }}
            vertexShader={`
          varying vec3 vPosition;
          varying vec2 vUv;
          varying vec3 vModelPosition;
          
          void main() {
            vPosition = position;
            vModelPosition = position; // Local position
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
          
          varying vec3 vPosition;
          varying vec3 vModelPosition;
          varying vec2 vUv;
  
          void main() {
            // Diagonal stripe pattern using 3D coordinates
             float strike = mod(
                (vPosition.x + vPosition.y - uTime * 0.35 + vPosition.z) / // 1000x faster
                uStrikeWidth * 0.5, 
                1.0
            );
            float strikeStrength = step(strike, 0.5) * uStrikeAlpha;
  
            // Border effect using UV coordinates
            float borderStrength = max(
              step(1.0 - vUv.y, uBorderWidth), 
              step(vUv.y, uBorderWidth)
            ) * uBorderAlpha;
  
            // Combine effects
            float alpha = max(strikeStrength, borderStrength);
            
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
            materialRef.current.uniforms.uBorderAlpha.value = active ? 0.8 : 0
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