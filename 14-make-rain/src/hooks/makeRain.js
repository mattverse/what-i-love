import { useCallback, useEffect, useState } from "react";
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import {
    AdditiveBlending,
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    Points,
    ShaderMaterial,
    Spherical,
    Uniform,
    Vector2,
    Vector3,
} from "three";

import * as THREE from 'three'
import gsap from 'gsap'

import wateringVertexShader from '../shaders/vertex.glsl'
import wateringFragmentShader from '../shaders/fragment.glsl'

export default function useRain() {
    const scene = useThree((state) => state.scene);
    const sizes = useThree((state) => state.size);
    const gl = useThree((state) => state.gl);
    const camera = useThree((state) => state.camera);

    const [rainTo, setRainTo] = useState(new THREE.Vector3())

    const textureLoader = new THREE.TextureLoader()
    const particleTexture = textureLoader.load('./particles-2.png')
    particleTexture.flipY = false


    const makeRain = useCallback(
        (count, position, size, texture, radius, color) => {

            const pixelRatio = gl.getPixelRatio();

            const positionsArray = new Float32Array(count * 3);
            const sizessArray = new Float32Array(count);
            const timeMultipliersArray = new Float32Array(count);

            const spherical = new Spherical();
            const sphericalPosition = new Vector3();

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;

                spherical.set(
                    radius * (0.75 + Math.random() * 0.25),
                    Math.random() * Math.PI,
                    Math.random() * Math.PI * 2
                );
                sphericalPosition.setFromSpherical(spherical);

                positionsArray[i3] = sphericalPosition.x;
                positionsArray[i3 + 1] = sphericalPosition.y;
                positionsArray[i3 + 2] = sphericalPosition.z;

                sizessArray[i] = Math.random();
                timeMultipliersArray[i] = 1 + Math.random();
            }

            const geometry = new BufferGeometry();
            geometry.setAttribute(
                "position",
                new Float32BufferAttribute(positionsArray, 3)
            );
            geometry.setAttribute(
                "aSize",
                new Float32BufferAttribute(sizessArray, 1)
            );
            geometry.setAttribute(
                "aTimeMultiplier",
                new Float32BufferAttribute(timeMultipliersArray, 1)
            );

            const material = new ShaderMaterial({
                vertexShader: wateringVertexShader,
                fragmentShader: wateringFragmentShader,
                transparent: true,
                depthWrite: true,
                blending: AdditiveBlending,
                uniforms: {
                    uSize: new Uniform(size),
                    uResolution: new Uniform(
                        new Vector2(sizes.width * pixelRatio, sizes.height * pixelRatio)
                    ),
                    uTexture: new Uniform(texture),
                    uColor: new Uniform(color),
                    uProgress: new Uniform(0),
                },
            });

            const rain = new Points(geometry, material);
            rain.position.copy(position);
            scene.add(rain);

            const destroy = () => {
                rain.removeFromParent();
                geometry.dispose();
                material.dispose();
            };

            gsap
                .timeline()
                .to(material.uniforms.uProgress, {
                    value: 1,
                    duration: 3,
                    ease: "linear",
                    onComplete: destroy,
                })
        },
        [gl, scene, sizes]
    );

    useEffect(() => {

        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Create a vector in 3D space pointing from the camera towards where the mouse points in the scene
            // The 'z' value is set based on how far you want the rain to be from the camera
            const mouse3D = new THREE.Vector3(x, y, 3)
            // const mouse3D = new THREE.Vector3(x, y, 0).unproject(camera);

            // Set the rain position state
            setRainTo(mouse3D);
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup to remove event listener
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [camera]);


    useFrame(() => {
        if (!rainTo.equals(new THREE.Vector3())) { // Checks if rainTo is not the initial vector
            createRainEffect();
        }
    })

    const createRainEffect = useCallback(() => {
        const position = rainTo.clone()
        const color = new Color("#C4D3DF");

        makeRain(5, position, 10, particleTexture, 0.06, color);
    }, [makeRain, rainTo, particleTexture]);
}


useTexture.preload("./particles-2.png")