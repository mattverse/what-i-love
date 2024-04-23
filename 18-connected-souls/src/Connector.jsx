import { useGLTF, Center, Point } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three'

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

    // first we need to find out the model with greater particle counts, remap the smaller array to the greater array
    if (lightbulbPositions.length < humanModelPositions.length) {
        const newArray = new Float32Array(humanModelPositions.length)

        for (let i = 0; i < humanModelPositions.length; i++) {
            const i3 = i * 3

            if (i3 < lightbulbPositions.length) {
                newArray[i3 + 0] = lightbulbPositions
                newArray[i3 + 1] = lightbulbPositions
                newArray[i3 + 2] = lightbulbPositions
            } else {
                const randomIndex = Math.floor(lightbulbPositions.count * Math.random()) * 3
                newArray[i3 + 0] = lightbulbPositions[randomIndex + 0]
                newArray[i3 + 1] = lightbulbPositions[randomIndex + 1]
                newArray[i3 + 2] = lightbulbPositions[randomIndex + 2]
            }
        }
    } else {
        const newArray = new Float32Array(lightbulbPositions.length)

        for (let i = 0; i < lightbulbPositions.length; i++) {
            const i3 = i * 3

            if (i3 < humanModelPositions.length) {
                newArray[i3 + 0] = humanModelPositions
                newArray[i3 + 1] = humanModelPositions
                newArray[i3 + 2] = humanModelPositions
            } else {
                const randomIndex = Math.floor(humanModelPositions.count * Math.random()) * 3
                newArray[i3 + 0] = humanModelPositions[randomIndex + 0]
                newArray[i3 + 1] = humanModelPositions[randomIndex + 1]
                newArray[i3 + 2] = humanModelPositions[randomIndex + 2]
            }
        }
    }

    // Convert the regular array to a Float32Array when done
    let convergedPosistions = new THREE.Float32BufferAttribute(new Float32Array(lightbulbPositions), 3)
    let lightbulbGeometry = new THREE.BufferGeometry()
    lightbulbGeometry.setAttribute('position', convergedPosistions)
    lightbulbGeometry.setIndex(null)

    convergedPosistions = new THREE.Float32BufferAttribute(new Float32Array(humanModelPositions), 3)
    let humanModelGeometry = new THREE.BufferGeometry()
    humanModelGeometry.setAttribute('position', convergedPosistions)
    humanModelGeometry.setIndex(null)


    let material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uResolution: new THREE.Uniform(
                new THREE.Vector2(sizes.width * pixelRatio, sizes.height * pixelRatio)
            ),
        },
        blending: THREE.AdditiveBlending,
        depthWrite: false
    })


    return (
        <>
            <points
                scale={32}
                position={[-2.2, -1, 0]}
                geometry={lightbulbGeometry}
                material={material}
            />
            <points
                scale={6.3}
                position={[2.2, -1.4, 0]}
                geometry={humanModelGeometry} material={material} />
        </>

    )
}

