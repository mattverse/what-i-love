import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function TextureRenderer({
    renderIndex = 1,
    textureUrl,
    resolution = 0.15,
    scale = 1,
    color = false,
    invert = false,
}) {
    const { size, gl, scene, camera } = useThree();
    const effectRef = useRef(null);
    const textureRef = useRef(null);

    useEffect(() => {
        // Load texture
        const textureImg = new Image();
        textureImg.src = textureUrl;
        textureImg.onload = () => {
            textureRef.current = textureImg;
        };

        // Create custom effect
        const effect = new THREE.WebGLRenderer({ canvas: gl.domElement });
        effectRef.current = effect;

        return () => {
            if (effect) {
                effect.dispose();
            }
        };
    }, [textureUrl, gl]);

    useEffect(() => {
        const effect = effectRef.current;
        if (effect) {
            effect.setSize(size.width, size.height);
        }
    }, [size]);

    useFrame(() => {
        const effect = effectRef.current;
        if (effect && textureRef.current) {
            const canvas = effect.domElement;
            const context = canvas.getContext('2d');
            if (!context) return;

            // Render the scene
            effect.render(scene, camera);

            // Apply the texture effect
            const width = size.width * resolution;
            const height = size.height * resolution;
            context.clearRect(0, 0, width, height);
            context.drawImage(gl.domElement, 0, 0, width, height);

            const imgData = context.getImageData(0, 0, width, height).data;
            const textureCanvas = document.createElement('canvas');
            const textureContext = textureCanvas.getContext('2d');
            textureCanvas.width = textureRef.current.width;
            textureCanvas.height = textureRef.current.height;
            textureContext.drawImage(textureRef.current, 0, 0);

            const textureData = textureContext.getImageData(0, 0, textureRef.current.width, textureRef.current.height).data;

            context.clearRect(0, 0, width, height);

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const offset = (y * width + x) * 4;

                    const r = imgData[offset];
                    const g = imgData[offset + 1];
                    const b = imgData[offset + 2];
                    const a = imgData[offset + 3];

                    let brightness = (0.3 * r + 0.59 * g + 0.11 * b) / 255;
                    if (a === 0) brightness = 1;

                    const tx = Math.floor(brightness * (textureRef.current.width - 1));
                    const ty = Math.floor(brightness * (textureRef.current.height - 1));

                    const textureOffset = (ty * textureRef.current.width + tx) * 4;

                    context.fillStyle = `rgba(${textureData[textureOffset]},${textureData[textureOffset + 1]},${textureData[textureOffset + 2]},${textureData[textureOffset + 3] / 255})`;
                    context.fillRect(x * scale, y * scale, scale, scale);
                }
            }
        }
    }, renderIndex);

    return null;
}

export default TextureRenderer;
