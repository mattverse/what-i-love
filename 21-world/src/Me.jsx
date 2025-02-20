import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { useFrame, useThree } from "@react-three/fiber"
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'
import { suspend } from 'suspend-react'


import { DissolveMaterialImpl } from './DissolveMaterial' // The custom material from above
import InstructionBox from './InstructionBox' // Import the InstructionBox component

const createAudio = async (url) => {
    const res = await fetch(url)
    const buffer = await res.arrayBuffer()
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const source = audioContext.createBufferSource()
    const gainNode = audioContext.createGain()
    const audioBuffer = await audioContext.decodeAudioData(buffer)

    source.buffer = audioBuffer
    source.connect(gainNode)
    gainNode.connect(audioContext.destination)

    return { context: audioContext, gain: gainNode, buffer: audioBuffer }
}


export const Me = forwardRef((props, ref) => {
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const robot = useGLTF('./robot-3.glb')
    const robotAnimations = useAnimations(robot.animations, robot.scene)
    const [currentAction, setCurrentAction] = useState(null)
    const characterRef = useRef()
    const characterRigidBodyRef = useRef()
    useImperativeHandle(ref, () => characterRigidBodyRef.current)

    const velocity = useRef(new THREE.Vector3())
    const movementDirection = useRef(new THREE.Vector3())

    // Smoothed camera position and target
    const [smoothedCameraPosition] = useState(() => new THREE.Vector3(0, 7, 8))
    const [smoothedCameraTarget] = useState(() => new THREE.Vector3())

    const [hasInteracted, setHasInteracted] = useState(false)
    const [isInArrowArea, setIsInArrowArea] = useState(false)

    const [showInstruction, setShowInstruction] = useState(true)
    // NEW: Store the initial position to track movement
    const startPositionRef = useRef(null)


    const { context, gain, buffer } = suspend(() => createAudio('./run.mp3'), ['run.mp3'])
    const audioContextRef = useRef()
    const soundSourceRef = useRef(null)
    const [isMoving, setIsMoving] = useState(false)

    useEffect(() => {
        audioContextRef.current = context
        return () => context.close()
    }, [context])



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

        const wasMoving = isMoving
        const nowMoving = forward || backward || leftward || rightward

        // Handle audio context resume on first interaction
        if (nowMoving && context.state === 'suspended') {
            context.resume().catch(console.error)
        }

        // Update movement state
        if (nowMoving !== wasMoving) {
            setIsMoving(nowMoving)

            if (nowMoving) {
                // Start playing sound
                soundSourceRef.current = context.createBufferSource()
                soundSourceRef.current.buffer = buffer
                soundSourceRef.current.connect(gain)
                soundSourceRef.current.loop = true
                soundSourceRef.current.start(0)
            } else {
                // Stop playing sound
                if (soundSourceRef.current) {
                    soundSourceRef.current.stop()
                    soundSourceRef.current = null
                }
            }
        }


        let acceleration = run ? 7.5 : 5. // Increased from 0.2/0.1
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

        const currentPos = new THREE.Vector3(
            currentPosition.x,
            currentPosition.y,
            currentPosition.z - 1.6
        );

        characterRigidBodyRef.current.setLinvel({
            x: velocity.current.x,
            y: characterRigidBodyRef.current.linvel().y, // Maintain Y velocity
            z: velocity.current.z
        })

        // Handle animations
        if (movementDirection.current.length() > 0) {
            const action = 'Walk'
            if (currentAction !== action) {
                transitionToAction(robotAnimations, currentAction, action)
                setCurrentAction(action)
            }
        } else if (velocity.current.length() < 0.01) {
            transitionToAction(robotAnimations, currentAction, 'idle')
            setCurrentAction('idle')
        }


        // Camera follow logic
        // Rotate character mesh based on movement direction
        if (characterRef.current && velocity.current.length() > 0.01) {
            const angle = Math.atan2(velocity.current.x, velocity.current.z)
            characterRef.current.rotation.y = angle
        }
        const cameraOffset = new THREE.Vector3()
        const baseCameraPosition = new THREE.Vector3(-2, 8, 8) // Normal camera offset
        const elevatedCameraPosition = new THREE.Vector3(-0.1, 14, 6) // More elevated offset
        // Smooth transition: when newPosition.x is between 4 and 6, blend from base to elevated
        const startX = 10; // Start blending when X reaches 10
        const endX = 14;   // Finish blending when X reaches 16

        const cameraBlend = THREE.MathUtils.smoothstep(
            (currentPos.x - startX) / (endX - startX),
            0,
            1
        );

        cameraOffset.copy(baseCameraPosition).lerp(elevatedCameraPosition, cameraBlend)

        // Use ACTUAL position for camera target
        const desiredCameraPosition = currentPos.clone().add(cameraOffset)

        // Smoother target tracking using ACTUAL position
        smoothedCameraTarget.lerp(currentPos, 0.25 * delta * 40)
        smoothedCameraPosition.lerp(desiredCameraPosition, 0.25 * delta * 40)

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

        const groundCenterX = 2.5
        const groundCenterZ = 1.4
        const groundHalfWidth = 81.5 / 2  // 40.75
        const groundHalfDepth = 10 / 2    // 5.5

        const minX = groundCenterX - groundHalfWidth
        const maxX = groundCenterX + groundHalfWidth
        const minZ = groundCenterZ - groundHalfDepth
        const maxZ = groundCenterZ + groundHalfDepth

        // Clamp current position
        const clampedX = THREE.MathUtils.clamp(currentPosition.x, minX, maxX)
        const clampedZ = THREE.MathUtils.clamp(currentPosition.z, minZ, maxZ)
        if (clampedX !== currentPosition.x || clampedZ !== currentPosition.z) {
            characterRigidBodyRef.current.setTranslation(
                { x: clampedX, y: currentPosition.y, z: clampedZ },
                true
            )
        }
    })

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
                <CuboidCollider args={[0.2, 0.5, 0.2]} position={[-1.9, 0.9, -1.5]} />
                <group>
                    <primitive
                        ref={characterRef}
                        object={robot.scene}
                        scale={0.2}
                        castShadow
                        position={[-1.9, 1.1, -1.5]}
                    />
                </group>
                {
                    showInstruction &&
                    <InstructionBox
                        textBeforeImage={"Use WASD to move"}
                        canvasWidth={192}
                        canvasHeight={32}
                    />
                }
            </RigidBody>
        </>
    )
})

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
