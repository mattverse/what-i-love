import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useFrame } from "@react-three/fiber"

export default function Me() {
    const [subscribeKeys, getKeys] = useKeyboardControls()

    const me = useGLTF('./me2.glb')
    const animations = useAnimations(me.animations, me.scene)
    const [currentAction, setCurrentAction] = useState(null)
    const [isJumping, setIsJumping] = useState(false)

    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward, run, jump } = getKeys()

        if (jump && !isJumping) {
            setIsJumping(true)
            transitionToAction(animations, currentAction, 'jump')
            setCurrentAction('jump')

            // Set a timeout for the duration of the jump animation
            setTimeout(() => {
                setIsJumping(false)
            }, 1000) // Adjust this time based on your jump animation duration
        } else if (!jump && isJumping) {
            // This block can handle the logic when the character lands (if needed)
        } else if (!isJumping) {
            if (forward || backward || leftward || rightward) {
                if (run) {
                    if (currentAction !== 'run') {
                        transitionToAction(animations, currentAction, 'run')
                        setCurrentAction('run')
                    }
                } else {
                    if (currentAction !== 'walk') {
                        transitionToAction(animations, currentAction, 'walk')
                        setCurrentAction('walk')
                    }
                }
            } else {
                if (currentAction !== 'idle') {
                    transitionToAction(animations, currentAction, 'idle')
                    setCurrentAction('idle')
                }
            }
        }
    })

    return <primitive
        object={me.scene}
        scale={0.02}
        rotation-y={0.3}
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
