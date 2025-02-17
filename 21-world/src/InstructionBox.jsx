import { forwardRef, useMemo, useEffect, useState, useLayoutEffect } from 'react'
import * as THREE from 'three'

const InstructionBox = forwardRef(({
    localOffset = [0.25, 2, -1.2],
    textBeforeImage = "Press ",
    textAfterImage = "",
    image = null,
    canvasWidth = 512,
    canvasHeight = 64,
    imageSize = [48, 48],
    imagePosition = 'inline',
    fontSize = 32
}, ref) => {
    const [contentReady, setContentReady] = useState(false)
    const [textureSize, setTextureSize] = useState([1, 1])

    const canvasTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        return new THREE.CanvasTexture(canvas)
    }, [canvasWidth, canvasHeight])

    useLayoutEffect(() => {
        const canvas = canvasTexture.image
        const context = canvas.getContext('2d')
        let isMounted = true

        const drawContent = async () => {
            context.clearRect(0, 0, canvas.width, canvas.height)

            // Draw background
            context.fillStyle = 'rgba(0, 0, 0, 0.9)'
            context.fillRect(0, 0, canvas.width, canvas.height)

            // Set text style
            context.fillStyle = 'white'
            context.font = `${fontSize}px "m6x11plus"`
            context.textBaseline = 'middle'

            let textX = 0
            let textY = canvas.height / 2
            let imageX = 0
            let imageY = (canvas.height - imageSize[1]) / 2

            // Measure text components
            const beforeWidth = context.measureText(textBeforeImage).width
            const afterWidth = context.measureText(textAfterImage).width
            const totalTextWidth = beforeWidth + afterWidth
            const imageSpacing = image ? imageSize[0] + 10 : 0
            const totalWidth = totalTextWidth + imageSpacing

            // Calculate positions
            switch (imagePosition) {
                case 'left':
                    textX = imageSize[0] + 20
                    imageX = 10
                    break
                case 'right':
                    textX = 10
                    imageX = canvas.width - imageSize[0] - 10
                    break
                case 'inline':
                default:
                    textX = (canvas.width - totalWidth) / 2
                    imageX = textX + beforeWidth + 5
            }

            // Draw text before image
            context.fillText(textBeforeImage, textX, textY)

            if (image) {
                await new Promise((resolve) => {
                    const img = new Image()
                    img.onload = () => {
                        if (!isMounted) return
                        context.drawImage(img, imageX, imageY, ...imageSize)
                        context.fillText(textAfterImage, imageX + imageSize[0] + 5, textY)
                        resolve()
                    }
                    img.src = image.url
                })
            } else {
                context.fillText(textAfterImage, textX + beforeWidth, textY)
            }

            if (isMounted) {
                canvasTexture.needsUpdate = true
                setTextureSize([canvasWidth, canvasHeight])
                setContentReady(true)
            }
        }

        drawContent()
        return () => { isMounted = false }
    }, [textBeforeImage, textAfterImage, image, canvasTexture, imageSize, imagePosition, fontSize])

    return (
        <mesh
            ref={ref}
            position={localOffset}
            scale={contentReady ? [textureSize[0] / 100, textureSize[1] / 100, 1] : [0, 0, 0]}
        >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={canvasTexture} transparent />
        </mesh>
    )
})

export default InstructionBox