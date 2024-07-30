import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'

export default function Me() {
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const me = useGLTF('./me2.glb')
    const animations = useAnimations(me.animations, me.scene)
    const [currentAction, setCurrentAction] = useState(null)
    const [isJumping, setIsJumping] = useState(false)
    const characterRef = useRef()
    const movementDirection = useRef(new THREE.Vector3())

    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward, run, jump } = getKeys()
        let speed = run ? 0.02 : 0.015 // Adjust speed values as needed

        // Reset movement direction
        movementDirection.current.set(0, 0, 0)

        // Calculate movement direction based on keys
        if (forward) movementDirection.current.z -= 1
        if (backward) movementDirection.current.z += 1
        if (leftward) movementDirection.current.x -= 1
        if (rightward) movementDirection.current.x += 1

        // Normalize and scale direction
        if (movementDirection.current.length() > 0) {
            movementDirection.current.normalize().multiplyScalar(speed)
        }

        // Handle jumping
        if (jump && !isJumping) {
            setIsJumping(true)
            transitionToAction(animations, currentAction, 'jump')
            setCurrentAction('jump')

            // Apply initial upward movement (simulate jump start)
            characterRef.current.position.y += 0.1

            // Reset jumping state after animation duration
            setTimeout(() => {
                setIsJumping(false)
            }, 1000) // Adjust based on your jump animation length
        }

        // Apply movement and update rotation
        if (characterRef.current) {
            // Apply movement even during jump
            characterRef.current.position.add(movementDirection.current)

            // Rotate character to face movement direction
            if (movementDirection.current.length() > 0) {
                const angle = Math.atan2(movementDirection.current.x, movementDirection.current.z)
                characterRef.current.rotation.y = angle
            }

            // Handle landing or transitioning to other actions
            if (!isJumping) {
                if (movementDirection.current.length() > 0) {
                    const action = run ? 'run' : 'walk'
                    if (currentAction !== action) {
                        transitionToAction(animations, currentAction, action)
                        setCurrentAction(action)
                    }
                } else {
                    if (currentAction !== 'idle') {
                        transitionToAction(animations, currentAction, 'idle')
                        setCurrentAction('idle')
                    }
                }
            }
        }
    })

    return <primitive
        ref={characterRef}
        object={me.scene}
        scale={0.02}
    />
}

function transitionToAction(animations, currentAction, newActionName) {
    if (currentAction) {
        const current = animations.actions[currentAction]
        if (current) {
            current.fadeOut(0.5)
        }
    }
    const newAction = animations.actions[newActionName]
    if (newAction) {
        newAction.reset().fadeIn(0.5).play()
    }
}
