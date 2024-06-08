import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience() {
    const canvasInfo = useRef({
        canvas: null,
        context: null,
        canvasCursorX: 0,
        canvasCursorY: 0,
        displacementTexture: null,
    });

    useEffect(() => {
        // Create the 2D canvas
        const newCanvas = document.createElement("canvas");
        newCanvas.width = window.innerWidth;
        newCanvas.height = window.innerHeight;

        // Style the canvas
        newCanvas.style.position = "fixed";
        newCanvas.style.width = "100%";
        newCanvas.style.height = "100%";
        newCanvas.style.top = "0";
        newCanvas.style.left = "0";
        newCanvas.style.zIndex = 1000;

        // Add the canvas to the DOM
        document.body.append(newCanvas);

        // Initialize canvas with black background and blend mode
        const canvasContext = newCanvas.getContext("2d");
        canvasContext.fillRect(0, 0, newCanvas.width, newCanvas.height);

        canvasInfo.current.canvas = newCanvas;
        canvasInfo.current.context = canvasContext;

        // Create the displacement texture that is sent to the shader
        canvasInfo.current.displacementTexture = new THREE.CanvasTexture(
            canvasInfo.current.canvas
        );

        console.log("texture when created", canvasInfo.current.displacementTexture);

        const handleResize = () => {
            newCanvas.width = window.innerWidth;
            newCanvas.height = window.innerHeight;
            canvasContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
        };

        window.addEventListener('resize', handleResize);

        const handleMouseMove = (e) => {
            // Calculate the canvas coordinates from mouse position
            const newCanvasCursorX = e.clientX;
            const newCanvasCursorY = e.clientY;

            // Save the canvas cursor position inside the canvas Info ref object
            canvasInfo.current.canvasCursorX = newCanvasCursorX;
            canvasInfo.current.canvasCursorY = newCanvasCursorY;
        };

        const handleTouchMove = (e) => {
            // Prevent scrolling
            e.preventDefault();

            // Calculate the canvas coordinates from touch position
            const touch = e.touches[0];
            const newCanvasCursorX = touch.clientX;
            const newCanvasCursorY = touch.clientY;

            // Save the canvas cursor position inside the canvas Info ref object
            canvasInfo.current.canvasCursorX = newCanvasCursorX;
            canvasInfo.current.canvasCursorY = newCanvasCursorY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            // Remove the canvas from the DOM
            document.body.removeChild(newCanvas);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    const brushTexture = new Image();
    brushTexture.src = "./glow.png";

    useFrame((state, delta) => {
        // Check if context and canvas are available
        if (!canvasInfo.current.context || !canvasInfo.current.canvas) return;

        // Displacement
        canvasInfo.current.context.globalCompositeOperation = "source-over";
        canvasInfo.current.context.globalAlpha = 0.02;
        canvasInfo.current.context.fillRect(
            0,
            0,
            canvasInfo.current.canvas.width,
            canvasInfo.current.canvas.height
        );

        // Draw glow
        const glowSize = canvasInfo.current.canvas.width * 0.05;
        canvasInfo.current.context.globalCompositeOperation = "lighten";
        canvasInfo.current.context.globalAlpha = 1;
        canvasInfo.current.context.drawImage(
            brushTexture,
            canvasInfo.current.canvasCursorX - glowSize * 0.5,
            canvasInfo.current.canvasCursorY - glowSize * 0.5,
            glowSize,
            glowSize
        );

        // Update the canvas texture that it is sent to the shader
        canvasInfo.current.displacementTexture.needsUpdate = true;
    });

    return (
        <>
            <OrbitControls makeDefault />
            <Lights />

        </>
    );
}
