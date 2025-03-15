import { forwardRef, useMemo, useEffect, useState, useRef } from 'react'
import * as THREE from 'three'

const InstructionBox = forwardRef(({
    localOffset = [-1.85, 2.6, -1.2],
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
                    // Split text into lines
                    const beforeLines = textBeforeImage.split('\n');
                    const afterLines = textAfterImage.split('\n');

                    // Set up left alignment parameters
                    const leftMargin = 20;
                    const lineHeight = fontSize * 1.2;

                    // Reset alignment properties for left-aligned layout
                    context.textAlign = 'left';
                    context.textBaseline = 'top'; // Changed from 'middle'
                    const topPadding = 15; // Added padding to push first line down

                    // Calculate vertical start position
                    let yPosition = ((canvas.height -
                        (beforeLines.length * lineHeight + imageSize[1])) / 2 + topPadding);

                    // Draw textBefore lines
                    beforeLines.forEach((line, i) => {
                        context.fillText(
                            line,
                            leftMargin,
                            yPosition + (i * lineHeight)
                        );
                    });

                    // Update Y position for image+text line
                    yPosition += beforeLines.length * lineHeight;

                    // Draw image (moved up slightly)
                    const imageY = yPosition - 19; // Adjust this value to move image up/down
                    context.drawImage(img, leftMargin - 13, imageY, imageSize[0], imageSize[1]);

                    // Draw textAfter (positioned relative to image)
                    context.fillText(
                        afterLines.join(' '),
                        leftMargin + imageSize[0] - 12,
                        imageY + imageSize[1] / 3.5  // Adjust these values for fine-tuning
                    );
                }
                else {
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