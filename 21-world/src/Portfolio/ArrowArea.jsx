// ArrowArea.jsx
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useState, useRef, forwardRef } from 'react'
import Arrow from './Arrow'
import * as THREE from 'three'

// Fence Material with forwardRef
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
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
        }
      `}
            fragmentShader={`
        uniform float uTime;
        uniform float uBorderAlpha;
        uniform float uStrikeAlpha;
        
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          float strikeStrength = mod((vPosition.x + vPosition.y - uTime * 0.00035 + vPosition.z) * 2.0, 1.0);
          strikeStrength = step(strikeStrength, 0.5) * uStrikeAlpha;
          
          float borderStrength = max(step(1.0 - vUv.y, 0.1), step(vUv.y, 0.1)) * uBorderAlpha;
          float alpha = max(strikeStrength, borderStrength);
          
          gl_FragColor = vec4(vec3(1.0), alpha);
        }
      `}
        />
    )
})

// Fence Component
const Fence = ({ position, active }) => {
    const materialRef = useRef()

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
            materialRef.current.uniforms.uBorderAlpha.value = active ? 0.8 : 0
            materialRef.current.uniforms.uStrikeAlpha.value = active ? 0.4 : 0
        }
    })

    return (
        <mesh position={position} visible={active}>
            <planeGeometry args={[2, 2]} />
            <FenceMaterial ref={materialRef} />
        </mesh>
    )
}
// ArrowArea Component
export const ArrowArea = ({ onIntersection, onEnter }) => {
    const [isActive, setIsActive] = useState(false)

    const handleIntersection = (enter) => {
        setIsActive(enter)
        onIntersection?.(enter)
        if (enter && onEnter) onEnter()
    }

    return (
        <group position={[-6.6, 0.4, 1.4]}>
            {/* Collider positioned at character height */}
            <RigidBody type="fixed" sensor>
                <CuboidCollider
                    args={[0.75, 0.1, 0.35]}  // Increased height to match character
                    position={[0, 0.1, 0]}     // Center at 1m height
                    onIntersectionEnter={() => handleIntersection(true)}
                    onIntersectionExit={() => handleIntersection(false)}
                />
            </RigidBody>

            {/* Fence only visible when active */}
            <Fence position={[0, 0.1, 0]} active={isActive} />

            {/* Optional debug visual */}
            < Arrow />
        </group>
    )
}