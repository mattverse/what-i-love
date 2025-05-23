import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useState, useRef, forwardRef, useMemo, useEffect } from 'react'
import { Text } from "@react-three/drei";
import * as THREE from 'three'

import InstructionBox from "../Character/InstructionBox.jsx"

const FenceMaterial = forwardRef(({ time = 0, borderAlpha = 0.5, strikeAlpha = 0.25, opacity = 1 }, ref) => {
    const uniforms = useMemo(() => ({
        uTime: { value: time },
        uBorderAlpha: { value: borderAlpha },
        uStrikeAlpha: { value: strikeAlpha },
        uStrikeWidth: { value: 0.2 },
        uBorderWidth: { value: 0.05 },
        uBandHeight: { value: 0.2 },
        uOpacity: { value: opacity }
    }), [time, borderAlpha, strikeAlpha, opacity])

    return (
        <shaderMaterial
            ref={ref}
            transparent
            depthWrite={false}
            side={THREE.DoubleSide}
            uniforms={uniforms}
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
          uniform float uOpacity;
          
          varying vec3 vPosition;
          varying vec3 vModelPosition;
  
          void main() {
              // Vertical band boundaries
              float verticalPosition = abs(vModelPosition.y);
              if(verticalPosition > uBandHeight) discard;
  
              // Animated diagonal stripes
              float strike = mod(
                  (vPosition.x + vPosition.y - uTime * 0.35 + vPosition.z) / uStrikeWidth * 0.5, 
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

const BorderPlane = ({ size = [3, 0.8], borderWidthHorizontal = 0.015, borderWidthVertical = 0.05 }) => {
    const materialRef = useRef()
    return (
        <mesh
            position={[-6.2, 0.37, 2.8]}
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
                    uBorderWidthHorizontal: { value: borderWidthHorizontal }, // Left/right
                    uBorderWidthVertical: { value: borderWidthVertical }    // Top/bottom
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
                    uniform float uBorderWidthHorizontal;
                    uniform float uBorderWidthVertical;
                    varying vec2 vUv;

                    void main() {
                        // Calculate borders with separate widths
                        float left = step(vUv.x, uBorderWidthHorizontal);
                        float right = step(1.0 - uBorderWidthHorizontal, vUv.x);
                        float bottom = step(vUv.y, uBorderWidthVertical);
                        float top = step(1.0 - uBorderWidthVertical, vUv.y);
                        
                        float border = min(left + right + bottom + top, 1.0);
                        float alpha = border * uBorderAlpha;
                        
                        gl_FragColor = vec4(vec3(1.0), alpha);
                    }
                `}
            />
        </mesh>
    )
}
const Fence = ({ active, size = [3., 2.0, 0.8] }) => {
    const materialRef = useRef()
    const meshRef = useRef()
    const [visible, setVisible] = useState(false)


    // Animation state
    const targetY = active ? 1.1 : 0
    const targetOpacity = active ? 1 : 0
    const currentY = useRef(0)
    const currentOpacity = useRef(0)

    useFrame((state, delta) => {
        if (!meshRef.current) return

        // Smoothly animate position
        currentY.current = THREE.MathUtils.lerp(currentY.current, targetY, 5 * delta)
        meshRef.current.position.y = currentY.current


        // Control visibility based on activity and position
        if (active && !visible) setVisible(true)
        if (!active && currentY.current < 0.1 && visible) setVisible(false)

        // Smoothly animate opacity
        currentOpacity.current = THREE.MathUtils.lerp(currentOpacity.current, targetOpacity, 5 * delta)

        if (materialRef.current) {
            // Update shader uniforms with interpolated values
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
            materialRef.current.uniforms.uOpacity.value = currentOpacity.current

            // Smoothly interpolate border and strike effects
            materialRef.current.uniforms.uBorderAlpha.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uBorderAlpha.value,
                active ? 0.8 : 0,
                5 * delta
            )
            materialRef.current.uniforms.uStrikeAlpha.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uStrikeAlpha.value,
                active ? 0.4 : 0,
                5 * delta
            )
        }
    })

    return (
        <mesh
            ref={meshRef}
            position={[-6.2, 1., 2.8]} // Start at ground level
            visible={visible}  // Add visibility control

        >
            <boxGeometry args={size} />
            <FenceMaterial ref={materialRef} />
        </mesh>
    )
}

export const ArrowArea = ({
    position,
    link,
    text,
    textPosition,
    textAfterImage,
    isInstructionBox,
    characterRef,
    onSpace,
    fenceSize = [3., 2.0, 0.8],      // Add new prop
    borderPlaneSize = [3., 0.8],      // Add new prop
    borderWidthHorizontal,
    borderWidthVertical,
    instructionBoxOffset = [-1.9, 2.9, 0]
}) => {
    const [isActive, setIsActive] = useState(false)
    const instructionRef = useRef()
    const offset = useMemo(() => new THREE.Vector3(...instructionBoxOffset), [instructionBoxOffset])

    // Update the instruction box position (existing code)
    useFrame(() => {
        if (instructionRef.current && characterRef?.current) {
            const characterPos = characterRef.current.translation()
            instructionRef.current.position.copy(characterPos).add(offset)
        }
    })

    // Listen for the space key only when the area is active
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (typeof onSpace === 'function' && isActive && e.code === 'Space') {
                onSpace() // call the provided dice roll callback
            } else if (e.code === 'Space' && isActive) {
                window.open(link, '_blank')
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isActive, onSpace, link])

    return (
        <group position={position}>
            <BorderPlane size={borderPlaneSize} borderWidthHorizontal={borderWidthHorizontal} borderWidthVertical={borderWidthVertical} />

            <RigidBody type="fixed" sensor>
                <CuboidCollider
                    args={[fenceSize[0] / 2, 0.2, fenceSize[2] / 2]}
                    position={[-6.2, 1.4, 2.8]}
                    onIntersectionEnter={() => setIsActive(true)}
                    onIntersectionExit={() => setIsActive(false)}
                />
            </RigidBody>

            <Fence active={isActive} size={fenceSize} />

            <Text
                font="./fonts/m6x11plus.ttf"
                color={"black"}
                lineHeight={0.8}
                fontSize={0.3}
                rotation={[-Math.PI / 2, 0, 0]}
                position={textPosition}
            >
                {text}
            </Text>

        </group>
    )
}
