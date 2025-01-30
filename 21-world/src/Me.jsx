import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'

export default function Me() {
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const robot = useGLTF('./robot-3.glb')
    const robotAnimations = useAnimations(robot.animations, robot.scene)
    const [currentAction, setCurrentAction] = useState(null)
    const characterRef = useRef()
    const velocity = useRef(new THREE.Vector3()) // Velocity for sliding effect
    const movementDirection = useRef(new THREE.Vector3())

    // Smoothed camera position and target
    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(0, 7, 8))
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3())

    useEffect(() => {
        robot.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
    }, [robot])

    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward, run } = getKeys()
        let acceleration = run ? 0.05 : 0.03 // Acceleration
        let friction = 0.85 // Friction factor for sliding

        // Reset movement direction
        movementDirection.current.set(0, 0, 0)

        // Calculate movement direction based on keys
        if (forward) movementDirection.current.z -= 1
        if (backward) movementDirection.current.z += 1
        if (leftward) movementDirection.current.x -= 1
        if (rightward) movementDirection.current.x += 1

        // Normalize and scale direction
        if (movementDirection.current.length() > 0) {
            movementDirection.current.normalize().multiplyScalar(acceleration)
        }

        // Apply movement to velocity
        velocity.current.add(movementDirection.current)

        // Apply friction to slow down when keys are released
        velocity.current.multiplyScalar(friction)

        // Apply movement and update rotation
        if (characterRef.current) {
            // Apply velocity to character position
            characterRef.current.position.add(velocity.current)

            // Rotate character to face movement direction
            if (velocity.current.length() > 0.01) { // Small threshold to avoid jitter
                const angle = Math.atan2(velocity.current.x, velocity.current.z)
                characterRef.current.rotation.y = angle
            }

            // Transition animations based on movement
            if (movementDirection.current.length() > 0) {
                const action = run ? 'run' : 'Walk'
                if (currentAction !== action) {
                    transitionToAction(robotAnimations, currentAction, action)
                    setCurrentAction(action)
                }
            } else if (velocity.current.length() < 0.01) {
                // Stop movement animation when velocity is negligible
                transitionToAction(robotAnimations, currentAction, 'idle')
                setCurrentAction('idle')
            }

            // Camera follow logic
            const characterPosition = characterRef.current.position

            // Update camera target to the character's position
            const cameraTarget = new THREE.Vector3()
            cameraTarget.copy(characterPosition)

            // Offset the camera to maintain the original view
            const cameraPosition = new THREE.Vector3(
                characterPosition.x,
                characterPosition.y + 7, // Maintain height offset
                characterPosition.z + 8  // Maintain distance behind
            )

            // Smooth camera movements
            smoothedCameraPosition.lerp(cameraPosition, 0.1)
            smoothedCameraTarget.lerp(cameraTarget, 0.1)

            state.camera.position.copy(smoothedCameraPosition)
            state.camera.lookAt(smoothedCameraTarget)
        }
    })

    return <primitive
        ref={characterRef}
        object={robot.scene}
        scale={0.2}
        castShadow
    />
}


function transitionToAction(robotAnimations, currentAction, newActionName) {
    if (currentAction) {
        const current = robotAnimations.actions[currentAction]
        if (current) {
            current.fadeOut(0.5)
        }
    }
    const newAction = robotAnimations.actions[newActionName]
    if (newAction) {
        newAction.reset().fadeIn(0.5).play()
        newAction.timeScale = 2
    }
}
