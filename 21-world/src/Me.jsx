import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useEffect, useState, useRef, useMemo } from 'react'
import { useFrame, useThree } from "@react-three/fiber"
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'

import { DissolveMaterialImpl } from './DissolveMaterial' // The custom material from above
import InstructionBox from './InstructionBox' // Import the InstructionBox component



export default function Me({ }) {
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

    const originalMaterialsRef = useRef([])
    const dissolveMaterialsRef = useRef([])
    const instructionBoxRef = useRef()


    const [hasInteracted, setHasInteracted] = useState(false)
    const [isInArrowArea, setIsInArrowArea] = useState(false)

    const [showInstruction, setShowInstruction] = useState(true)
    // NEW: Store the initial position to track movement
    const startPositionRef = useRef(null)


    const handleArrowIntersection = (inside) => {
        setIsInArrowArea(inside)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && isInArrowArea && !hasInteracted) {
            setHasInteracted(true)
        }
    }


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isInArrowArea, hasInteracted])

    useEffect(() => {
        robot.scene.traverse((child) => {
            if (child.isMesh) {
                originalMaterialsRef.current.push(child.material);
                const dissolveMat = new DissolveMaterialImpl();
                dissolveMat.uniforms.uColor.value = new THREE.Color('#70c1ff');
                dissolveMat.skinning = true; // If needed for animations
                dissolveMaterialsRef.current.push(dissolveMat);
            }
        });
    }, [robot]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInstruction(false)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])


    useFrame((state, delta) => {
        if (!characterRigidBodyRef.current) return;

        // getKeys returns boolean field
        const { forward, backward, leftward, rightward, run, teleport } = getKeys()

        const teleportJustPressed = teleport && !prevTeleport.current
        prevTeleport.current = teleport



        let acceleration = run ? 1.5 : 5. // Increased from 0.2/0.1
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
                        revertMaterials()
                    }
                })

                velocity.current.set(0, 0, 0) // Reset velocity after teleport
            }, 1)
        }

        if (!isTeleporting) {
            characterRigidBodyRef.current.setLinvel({
                x: velocity.current.x,
                y: characterRigidBodyRef.current.linvel().y, // Maintain Y velocity
                z: velocity.current.z
            })
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

        // Camera follow logic
        const cameraOffset = new THREE.Vector3(-2, 8, 8) // Fixed offset
        const desiredCameraPosition = new THREE.Vector3().addVectors(newPosition, cameraOffset)

        // Smoother target tracking
        smoothedCameraTarget.lerp(newPosition, 0.25 * delta * 3)
        smoothedCameraPosition.lerp(desiredCameraPosition, 0.25 * delta * 3)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)

        if (startPositionRef.current === null) {
            // Set the initial position once
            startPositionRef.current = new THREE.Vector3(currentPosition.x, currentPosition.y, currentPosition.z)
        } else {
            // Calculate the distance moved from the starting position
            const currentPosVec = new THREE.Vector3(currentPosition.x, currentPosition.y, currentPosition.z)
            const distanceMoved = currentPosVec.distanceTo(startPositionRef.current)
            const movementThreshold = 5 // adjust this threshold as needed
            if (distanceMoved > movementThreshold) {
                setShowInstruction(false)
            }
        }
    })

    useEffect(() => {
        return () => {
            if (teleportTimeout.current) {
                clearTimeout(teleportTimeout.current)
            }
        }
    }, [])

    function triggerDissolveEffect({ onComplete }) {
        setDissolveMaterials();
        characterRef.current.visible = true;

        let startTime = Date.now();
        const duration = 200; // in ms

        function easeOutQuad(t) {
            return 1 - (1 - t) * (1 - t);
        }

        function animate() {
            let elapsed = Date.now() - startTime;
            let t = elapsed / duration;

            // Clamp t to [0, 1]
            if (t > 1) t = 1;

            // Instead of linear, use an ease-out approach:
            //   - We start from progress=1 (fully dissolved) 
            //   - to progress=0 (fully visible).
            // So we can do: progress = 1 - easeOutQuad(t)
            const eased = easeOutQuad(t);
            let progress = 1 - eased;


            dissolveMaterialsRef.current.forEach((mat) => {
                mat.uniforms.uDissolveProgress.value = progress;
                mat.uniforms.uTime.value = (Date.now() - startTime) / 1000;
            });

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                // Once fully visible, call onComplete callback
                if (onComplete) onComplete();
            }
        }

        animate();
    }


    function setDissolveMaterials() {
        let i = 0
        robot.scene.traverse((child) => {
            if (child.isMesh) {
                console.log("applied dissolve material");

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
        <>
            <RigidBody
                type='dynamic'
                ref={characterRigidBodyRef}
                canSleep={false}
                friction={0}
                restitution={0}
                linearDamping={0.5} // Reduced from 1.5
                angularDamping={1.5} // Reduced from 3.5
                colliders={false}
                lockRotations={true}
            >
                <CuboidCollider args={[0.2, 0.5, 0.2]} position={[0.4, 0.9, -1.5]} />
                <group>
                    <primitive
                        ref={characterRef}
                        object={robot.scene}
                        scale={0.2}
                        castShadow
                        position={[0.4, 1.1, -1.5]}
                    />
                </group>
                {showInstruction && <InstructionBox ref={instructionBoxRef} />}
            </RigidBody>
        </>
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
