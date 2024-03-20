import { useCallback } from "react";
import * as THREE from 'three'
import gsap from 'gsap'

import wateringVertexShader from './shaders/vertex.glsl'
import wateringFragmentShader from './shaders/fragment.glsl'

export default function useRain() {
    const scene = useThree((state) => state.scene);
    const sizes = useThree((state) => state.size);
    const gl = useThree((state) => state.gl);

    const particleTexture = textureLoader.load('./particles.png')

    const makeRain = useCallback(
        (count = 1) => {
            const position = new THREE.Vector3((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, Math.random() - 0.5)
            const positionsArray = new Float32Array(count * 3)

            for (let i = 0; i < count; i++) {
                const i3 = i * 3

                positionsArray[i3] = position.x
                positionsArray[i3 + 1] = position.y
                positionsArray[i3 + 2] = position.z
            }

            const geometry = new THREE.BufferGeometry()
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))

            const material = new THREE.ShaderMaterial({
                vertexShader: wateringVertexShader,
                fragmentShader: wateringFragmentShader,
                uniforms: {
                    uColor: new THREE.Uniform(new THREE.Color('#70c1ff')),
                    uTexture: new THREE.Uniform(particleTexture)
                },
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            })


            const rain = new THREE.Points(geometry, material)
            rain.position.copy(position)

            scene.add(rain)

            const destroy = () => {
                rain.removeFromParent()
                geometry.dispose()
                material.dispose()
            }

            // Animate
            gsap.to(
                material.uniforms.uProgress,
                { value: 1, ease: 'linear', duration: 3, onComplete: destroy },
            )
        },
        [gl, scene]
    );

    // useEffect(() => {
    //     if 
    // })
}

