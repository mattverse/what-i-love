import { useCallback, useEffect, useState } from "react";
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import {
    AdditiveBlending,
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    PointLight,
    Points,
    PointsMaterial,
    PlaneGeometry,
    ShaderMaterial,
    Spherical,
    Texture,
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

    const [isRaining, setIsRaining] = useState(false);

    const textureLoader = new THREE.TextureLoader()
    const particleTexture = textureLoader.load('./particles-2.png')
    const flagTexture = textureLoader.load('./flag-french.jpg')

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
                depthWrite: false,
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

            const firework = new Points(geometry, material);
            firework.position.copy(position);
            scene.add(firework);

            const destroy = () => {
                firework.removeFromParent();
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
        const handleMouseClick = () => {
            setIsRaining(true); // Update state to trigger rain
        };

        window.addEventListener('click', handleMouseClick);

        // Cleanup to remove event listener
        return () => {
            window.removeEventListener('click', handleMouseClick);
        };
    }, []);


    const createRandomFirework = useCallback(() => {
        console.log("inside random firework")
        let count = Math.random() * 10;
        const position = new Vector3(
            Math.random(),
            Math.random() + 1,
            Math.random()
        );
        const size = Math.random() * 0.5;
        const radius = Math.random();
        const color = new Color('#595bf0');

        console.log(position)

        makeRain(30, position, 10, particleTexture, 0.5, color);
    }, [makeRain]);

    useEffect(() => {
        if (isRaining) {
            console.log("make rain ")
            createRandomFirework()
            setIsRaining(false)
        }
    }, [createRandomFirework, isRaining])
}


useTexture.preload("./particles.png")