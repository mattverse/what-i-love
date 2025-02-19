import { forwardRef, useMemo, useEffect, useState, useRef } from 'react'
import * as THREE from 'three'

const InstructionBox = forwardRef(({
    localOffset = [-1.85, 2, -1.2],
    textBeforeImage = "",
    textAfterImage = "",
    image,
    imagePosition = "inline",
    canvasWidth = 600,
    canvasHeight = 80,
    fontSize = 22,
    imageSize = [60, 60]
}, ref) => {
    const [texture, setTexture] = useState(null)
    const canvasRef = useRef(document.createElement('canvas'))
    const contextRef = useRef(null)

    // Initialize canvas and base texture
    useMemo(() => {
        const canvas = canvasRef.current
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        contextRef.current = canvas.getContext('2d')
        setTexture(new THREE.CanvasTexture(canvas))
    }, [canvasWidth, canvasHeight])

    // Update canvas content when props change
    useEffect(() => {
        const context = contextRef.current
        const canvas = canvasRef.current
        if (!context || !canvas) return

        const draw = (img) => {
            // Clear canvas
            context.clearRect(0, 0, canvas.width, canvas.height)

            // Draw background
            context.fillStyle = 'rgba(0, 0, 0, 0.9)'
            context.fillRect(0, 0, canvas.width, canvas.height)

            // Set text style
            context.fillStyle = 'white'
            context.font = `${fontSize}px "m6x11plus"`
            context.textAlign = 'center'
            context.textBaseline = 'middle'

            if (image?.url && img) {
                if (imagePosition === 'inline') {
                    // Calculate positions for inline layout
                    const textBeforeWidth = context.measureText(textBeforeImage).width
                    const textAfterWidth = context.measureText(textAfterImage).width
                    const totalWidth = textBeforeWidth + imageSize[0] + textAfterWidth

                    let xPosition = (canvas.width - totalWidth) / 2

                    // Draw text before image
                    context.fillText(textBeforeImage, xPosition + textBeforeWidth / 2, canvas.height / 2)
                    xPosition += textBeforeWidth

                    // Draw image
                    context.drawImage(
                        img,
                        xPosition,
                        (canvas.height - imageSize[1]) / 2,
                        imageSize[0],
                        imageSize[1]
                    )
                    xPosition += imageSize[0]

                    // Draw text after image
                    context.fillText(textAfterImage, xPosition + textAfterWidth / 2, canvas.height / 2)
                } else {
                    // Block layout (image above text)
                    const totalHeight = imageSize[1] + fontSize + 10
                    let yPosition = (canvas.height - totalHeight) / 2

                    // Draw image
                    context.drawImage(
                        img,
                        (canvas.width - imageSize[0]) / 2,
                        yPosition,
                        imageSize[0],
                        imageSize[1]
                    )
                    yPosition += imageSize[1] + 10

                    // Draw combined text
                    context.fillText(
                        textBeforeImage + textAfterImage,
                        canvas.width / 2,
                        yPosition + fontSize / 2
                    )
                }
            } else {
                // Fallback: Just draw combined text
                context.fillText(
                    textBeforeImage + textAfterImage,
                    canvas.width / 2,
                    canvas.height / 2
                )
            }

            // Update texture
            texture.needsUpdate = true
        }

        if (image?.url) {
            const img = new Image()
            img.onload = () => draw(img)
            img.src = image.url
        } else {
            draw()
        }
    }, [textBeforeImage, textAfterImage, image, imagePosition, fontSize, imageSize, texture])

    return (
        <mesh ref={ref} position={localOffset}>
            <planeGeometry args={[canvasWidth / 100, canvasHeight / 100]} />
            <meshBasicMaterial map={texture} transparent />
        </mesh>
    )
})

export default InstructionBox