
import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useFrame } from "@react-three/fiber"

// import { useControls } from 'leva'

export default function Me() {
    const [subscribeKeys, getKeys] = useKeyboardControls()

    const me = useGLTF('./me.glb')
    const animations = useAnimations(me.animations, me.scene)
    const [currentAction, setCurrentAction] = useState(null)

    useFrame((state, delta) => {
        const { forward, backward, leftward, rightward, run } = getKeys()

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
                setCurrentAction('idle3000')
            }
        }
    })

    return <primitive
        object={me.scene}
        // scale={0.02}
        // position={[-2.5, 0, 2.5]}
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