import { useFrame } from '@react-three/fiber'
import React, { useMemo, forwardRef } from 'react'
import * as THREE from 'three'

const InstructionBox = forwardRef(({ localOffset = [0, 0, 0] }, ref) => {

    useFrame((state, delta) => {
        console.log(ref.current.position);

    })


    const canvasTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 192
        canvas.height = 32
        const context = canvas.getContext('2d')

        // Draw a semi-transparent black background with 0.9 opacity.
        context.fillStyle = 'rgba(0, 0, 0, 0.9)'
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Draw the instruction text using the custom font.
        context.fillStyle = 'white'
        context.font = '24px "m6x11plus"'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText('Use WASD to move', canvas.width / 2, canvas.height / 2)

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        return texture
    }, [])

    return (
        // The mesh’s initial position is set to the localOffset,
        // but this will be overwritten by the parent’s update.
        <mesh ref={ref}>
            <planeGeometry args={[1.5, 0.25]} />
            <meshBasicMaterial map={canvasTexture} transparent />
        </mesh>
    )
})

export default InstructionBox
