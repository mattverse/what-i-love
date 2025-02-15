import { forwardRef, useMemo } from 'react'
import * as THREE from 'three'

const InstructionBox = forwardRef(({ localOffset = [0.25, 2, -1.2], text = "Press Enter" }, ref) => {
    const canvasTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 192
        canvas.height = 32
        const context = canvas.getContext('2d')

        // Draw background
        context.fillStyle = 'rgba(0, 0, 0, 0.9)'
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Draw the instruction text
        context.fillStyle = 'white'
        context.font = '24px "m6x11plus"'
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(text, canvas.width / 2, canvas.height / 2)

        const texture = new THREE.CanvasTexture(canvas)
        texture.needsUpdate = true
        return texture
    }, [text])

    return (
        <mesh ref={ref} position={localOffset}>
            <planeGeometry args={[1.5, 0.25]} />
            <meshBasicMaterial map={canvasTexture} transparent />
        </mesh>
    )
})

export default InstructionBox

