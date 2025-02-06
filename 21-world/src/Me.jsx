import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import { useFrame } from "@react-three/fiber"
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'

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

    useEffect(() => {
        robot.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
    }, [robot])


    const handleCollision = (e) => {
        console.log("here");
        // velocity.current.set(0, 0, 0)
        if (e.other.rigidBody.userData?.isSign) {
            // Stop movement when colliding with sign
            velocity.current.set(0, 0, 0)
        }
    }

    useFrame((state, delta) => {
        if (!characterRigidBodyRef.current) return;


        const { forward, backward, leftward, rightward, run } = getKeys()
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

        const smoothFactor = 0.9; // Adjust for smoother motion
        const interpolatedPosition = new THREE.Vector3().lerpVectors(
            currentPosition,
            newPosition,
            smoothFactor
        );

        characterRigidBodyRef.current.setNextKinematicTranslation(interpolatedPosition)

        // Handle animations
        if (movementDirection.current.length() > 0) {
            const action = run ? 'run' : 'Walk'
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

        // smoothedCameraPosition.lerp(
        //     new THREE.Vector3(newPosition.x - 2, newPosition.y + 8, newPosition.z + 8),
        //     0.1
        // )
        // smoothedCameraTarget.lerp(newPosition, 0.1)

        // state.camera.position.copy(smoothedCameraPosition)
        // state.camera.lookAt(smoothedCameraTarget)

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

    return (
        <RigidBody
            type='kinematicPosition'
            ref={characterRigidBodyRef}
            colliders={false}
            canSleep={false}
            friction={0}
            onCollisionEnter={handleCollision} // Add collision handler
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
