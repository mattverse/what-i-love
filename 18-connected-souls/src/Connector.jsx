import { useGLTF, Center, Point, useProgress } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three'

import gsap from 'gsap'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default function Connector() {
    const sizes = useThree((state) => state.size);
    const gl = useThree((state) => state.gl);
    const pixelRatio = gl.getPixelRatio();

    let lightbulbScene = useGLTF('/lightbulb.glb').scene
    let humanModelScene = useGLTF('/human.glb').scene

    // traverse all mesh in lightbulb model, converge the position attributes into a single array
    let lightbulbPositions = [];

    lightbulbScene.traverse(child => {
        if (child.isMesh && child.geometry && child.geometry.attributes.position) {
            let posArray = child.geometry.attributes.position.array;
            lightbulbPositions.push(...posArray);
        }
    });

    let humanModelPositions = [];
    humanModelScene.traverse(child => {
        if (child.isMesh && child.geometry && child.geometry.attributes.position) {
            let posArray = child.geometry.attributes.position.array;
            humanModelPositions.push(...posArray);
        }
    });

    // iterate over two models and see which one has more particles. 
    if (lightbulbPositions.length < humanModelPositions.length) {
        const newArray = new Float32Array(humanModelPositions.length)

        for (let i = 0; i < humanModelPositions.length; i++) {
            const i3 = i * 3

            if (i3 < lightbulbPositions.length) {
                newArray[i3 + 0] = lightbulbPositions[i3 + 0]
                newArray[i3 + 1] = lightbulbPositions[i3 + 1]
                newArray[i3 + 2] = lightbulbPositions[i3 + 2]
            } else {
                // divide length by three since we the positions array is for x,y,z
                const randomIndex = Math.floor(lightbulbPositions.length / 3 * Math.random()) * 3
                newArray[i3 + 0] = lightbulbPositions[randomIndex + 0]
                newArray[i3 + 1] = lightbulbPositions[randomIndex + 1]
                newArray[i3 + 2] = lightbulbPositions[randomIndex + 2]
            }
        }

        lightbulbPositions = newArray
    }

    // Convert the regular array to a Float32Array when done
    const lightbulbPositionsBufferAttribute = new THREE.Float32BufferAttribute(new Float32Array(lightbulbPositions), 3)
    const humanmodelPositionsBufferAttribute = new THREE.Float32BufferAttribute(new Float32Array(humanModelPositions), 3)

    let lightbulbGeometry = new THREE.BufferGeometry()
    // always pass on buffer attribute instead of direct arrays :) 
    lightbulbGeometry.setAttribute('position', lightbulbPositionsBufferAttribute)
    lightbulbGeometry.setAttribute('aPositionTarget', humanmodelPositionsBufferAttribute)
    lightbulbGeometry.setIndex(null)


    let humanModelGeometry = new THREE.BufferGeometry()
    humanModelGeometry.setAttribute('position', humanmodelPositionsBufferAttribute)
    humanModelGeometry.setAttribute('aPositionTarget', lightbulbPositionsBufferAttribute)
    humanModelGeometry.setIndex(null)

    let material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uResolution: new THREE.Uniform(
                new THREE.Vector2(sizes.width * pixelRatio, sizes.height * pixelRatio)
            ),
            uProgress: new THREE.Uniform(0)
        },
        blending: THREE.AdditiveBlending,
        depthWrite: false
    })

    gsap.fromTo(
        material.uniforms.uProgress,
        { value: 0 },
        { value: 1, duration: 3, ease: 'linear' }
    )

    return (
        <>
            <points
                scale={32}
                position={[-2.2, -1, 0]}
                geometry={lightbulbGeometry}
                material={material}
                frustumCulled={false}
            />
            {/* <points
                scale={6.3}
                position={[2.2, -1.4, 0]}
                geometry={humanModelGeometry} material={material} /> */}
        </>

    )
}

