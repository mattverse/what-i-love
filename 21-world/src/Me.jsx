import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import { useFrame } from "@react-three/fiber"
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'

import { DissolveMaterialImpl } from './DissolveMaterial' // The custom material from above


export default function Me() {
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const robot = useGLTF('./robot-3.glb')
    const robotAnimations = useAnimations(robot.animations, robot.scene)
    const [currentAction, setCurrentAction] = useState(null)
    const characterRef = useRef()
    const characterRigidBodyRef = useRef()
    const velocity = useRef(new THREE.Vector3())
    const movementDirection = useRef(new THREE.Vector3())

    // Smoothed camera position and target
    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(0, 7, 8))
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3())


    const prevTeleport = useRef(false)
    const teleportTimeout = useRef(null)
    const [isTeleporting, setIsTeleporting] = useState(false);

    // We'll keep references to the original materials so we can restore them if desired
    const originalMaterialsRef = useRef([])
    // We'll keep references to the custom dissolve materials
    const dissolveMaterialsRef = useRef([])

    useEffect(() => {
        robot.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                // Store the original material so we can revert later
                originalMaterialsRef.current.push(child.material)

                // Create a new DissolveMaterial for each mesh
                // We'll copy the map (texture) if it exists
                const dissolveMat = new DissolveMaterialImpl()
                if (child.material.map) {
                    dissolveMat.uniforms.uMap.value = child.material.map
                }
                dissolveMat.transparent = true

                dissolveMaterialsRef.current.push(dissolveMat)
            }
        })
    }, [robot])

    useFrame((state, delta) => {
        if (!characterRigidBodyRef.current) return;

        // getKeys returns boolean field
        const { forward, backward, leftward, rightward, run, teleport } = getKeys()

        const teleportJustPressed = teleport && !prevTeleport.current
        prevTeleport.current = teleport



        let acceleration = run ? 0.2 : 0.1
        let friction = 0.69

        // Reset movement direction
        movementDirection.current.set(0, 0, 0)

        if (forward) movementDirection.current.z -= 1
        if (backward) movementDirection.current.z += 1
        if (leftward) movementDirection.current.x -= 1
        if (rightward) movementDirection.current.x += 1

        if (movementDirection.current.length() > 0) {
            movementDirection.current.normalize().multiplyScalar(acceleration)
        }

        velocity.current.add(movementDirection.current)
        velocity.current.multiplyScalar(friction)

        // Get current rigid body position
        const currentPosition = characterRigidBodyRef.current.translation()
        const newPosition = new THREE.Vector3(
            currentPosition.x + velocity.current.x,
            currentPosition.y,
            currentPosition.z + velocity.current.z
        )


        // const maxX = 4.5;  // Half of 10
        // const maxZ = 5;  // Half of 8
        // newPosition.x = THREE.MathUtils.clamp(newPosition.x, -maxX, maxX);
        // newPosition.z = THREE.MathUtils.clamp(newPosition.z, -maxZ, maxZ);


        if (teleportJustPressed && !isTeleporting) {
            setIsTeleporting(true);

            // Hide character
            characterRef.current.visible = false;

            const forwardVector = new THREE.Vector3()
            characterRef.current.getWorldDirection(forwardVector)
            forwardVector.y = 0
            forwardVector.normalize()

            const teleportDistance = 3
            const teleportTarget = new THREE.Vector3()
                .copy(currentPosition)
                .add(forwardVector.multiplyScalar(teleportDistance))

            teleportTimeout.current = setTimeout(() => {
                characterRigidBodyRef.current.setNextKinematicTranslation(teleportTarget)
                // Time to reappear with the effect:
                triggerDissolveEffect({
                    onComplete: () => {
                        setIsTeleporting(false)
                        // Optionally revert to original materials if you only want a brief effect
                        revertMaterials()
                    }
                })


                velocity.current.set(0, 0, 0) // Reset velocity after teleport
            }, 50)
        }

        if (!isTeleporting) {
            // Normal movement logic
            const smoothFactor = 0.9;
            const interpolatedPosition = new THREE.Vector3().lerpVectors(
                currentPosition,
                newPosition,
                smoothFactor
            );

            characterRigidBodyRef.current.setNextKinematicTranslation(interpolatedPosition);
        }


        // Handle animations
        if (!isTeleporting && movementDirection.current.length() > 0) {
            const action = run ? 'run' : 'Walk';
            if (currentAction !== action) {
                transitionToAction(robotAnimations, currentAction, action);
                setCurrentAction(action);
            }
        } else if (!isTeleporting && velocity.current.length() < 0.01) {
            transitionToAction(robotAnimations, currentAction, 'idle');
            setCurrentAction('idle');
        }

        // Camera follow logic
        // Rotate character mesh based on movement direction
        if (characterRef.current && velocity.current.length() > 0.01) {
            const angle = Math.atan2(velocity.current.x, velocity.current.z)
            characterRef.current.rotation.y = angle
        }

        const cameraOffset = new THREE.Vector3()
        const baseCameraPosition = new THREE.Vector3(-2, 8, 8) // Normal camera offset
        const elevatedCameraPosition = new THREE.Vector3(0, 14, 6) // More elevated offset

        // Blend between camera positions based on X position
        const cameraBlend = THREE.MathUtils.clamp((newPosition.x - 4) / 2, 0, 1) // Smooth transition between 4-6 X position
        cameraOffset.copy(baseCameraPosition).lerp(elevatedCameraPosition, cameraBlend)

        smoothedCameraPosition.lerp(
            new THREE.Vector3().addVectors(newPosition, cameraOffset),
            0.1
        )


        smoothedCameraTarget.lerp(newPosition, 0.1)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)

    })

    useEffect(() => {
        return () => {
            if (teleportTimeout.current) {
                clearTimeout(teleportTimeout.current)
            }
        }
    }, [])

    function triggerDissolveEffect({ onComplete }) {
        // Swap to dissolve materials
        setDissolveMaterials()

        // Make the character visible again (it starts invisible right after teleport)
        characterRef.current.visible = true

        // Animate the uniform from 0 -> 1 with a small library or a simple approach
        // For a quick example, let's just do a simple manual approach in a useFrame or setInterval:
        let progress = 0
        const steps = 2
        const interval = setInterval(() => {
            progress += 1 / steps
            dissolveMaterialsRef.current.forEach((mat) => {
                mat.uniforms.uDissolveProgress.value = progress
                mat.uniforms.uTime.value += 0.1
            })
            if (progress >= 1.0) {
                clearInterval(interval)
                if (onComplete) onComplete()
            }
        }, 30)
    }

    function setDissolveMaterials() {
        let i = 0
        robot.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = dissolveMaterialsRef.current[i]
                i++
            }
        })
    }

    function revertMaterials() {
        // Swap back to the original materials if you only want a brief effect
        let i = 0
        robot.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = originalMaterialsRef.current[i]
                i++
            }
        })
    }

    return (
        <RigidBody
            type='kinematicPosition'
            ref={characterRigidBodyRef}
            colliders={false}
            canSleep={false}
            friction={0}
            restitution={0}
            linearDamping={1.5}
            angularDamping={3.5}
        >
            <CuboidCollider args={[0.2, 0.5, 0.2]} position={[0.4, 0.9, -1.5]} />
            <primitive
                ref={characterRef}
                object={robot.scene}
                scale={0.2}
                castShadow
                position={[0.4, 0.5, -1.5]}
            />
        </RigidBody>
    )
}

function transitionToAction(robotAnimations, currentAction, newActionName) {
    if (currentAction) {
        const current = robotAnimations.actions[currentAction]
        if (current) current.fadeOut(0.5)
    }
    const newAction = robotAnimations.actions[newActionName]
    if (newAction) {
        newAction.reset().fadeIn(0.5).play()
        newAction.timeScale = 2
    }
}
