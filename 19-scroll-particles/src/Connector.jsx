import { useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default function Connector() {
    const pixelRatio = Math.min(window.devicePixelRatio, 2)

    let material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uResolution: new THREE.Uniform(
                new THREE.Vector2(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio)
            ),
            uProgress: new THREE.Uniform(0),
            uColorA: new THREE.Uniform(new THREE.Color('#fff53d')),
            uColorB: new THREE.Uniform(new THREE.Color('#c987ff'))
        },
        blending: THREE.AdditiveBlending,
        depthWrite: false
    })

    const scroll = useScroll()

    useFrame((state, delta) => {
        const r1 = scroll.range(0, 1)

        if (material) {
            material.uniforms.uProgress.value = r1
        }
    }, [material])



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

    // human model positions have more particles, remap light bulb positions to have equal particle count
    // (This is bad code practice, this should instead be simple if / else statement)
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

    // set light bulb offset for the lightbulb geometry attributes
    const lightbulbOffset = new THREE.Vector3(0.06, -0.03, 0);;
    const lightbulbCount = lightbulbPositionsBufferAttribute.count;

    for (let i = 0; i < lightbulbCount; i++) {
        const x = lightbulbPositionsBufferAttribute.getX(i);
        const y = lightbulbPositionsBufferAttribute.getY(i);
        const z = lightbulbPositionsBufferAttribute.getZ(i);

        lightbulbPositionsBufferAttribute.setXYZ(i, x + lightbulbOffset.x, y + lightbulbOffset.y, z + lightbulbOffset.z);
    }

    const lightbulbScale = new THREE.Vector3(32, 32, 32)

    for (let i = 0; i < lightbulbCount; i++) {
        let x = lightbulbPositionsBufferAttribute.getX(i);
        let y = lightbulbPositionsBufferAttribute.getY(i);
        let z = lightbulbPositionsBufferAttribute.getZ(i);

        // Apply the scaling factor
        x *= lightbulbScale.x;
        y *= lightbulbScale.y;
        z *= lightbulbScale.z;

        lightbulbPositionsBufferAttribute.setXYZ(i, x, y, z);
    }

    lightbulbPositionsBufferAttribute.needsUpdate = true; // Mark the attribute to be updated on the GPU

    const humanmodelPositionsBufferAttribute = new THREE.Float32BufferAttribute(new Float32Array(humanModelPositions), 3)

    // Human model Offset
    const offset = new THREE.Vector3(-0.2, -0.85, 0);
    const count = humanmodelPositionsBufferAttribute.count;

    for (let i = 0; i < count; i++) {
        const x = humanmodelPositionsBufferAttribute.getX(i);
        const y = humanmodelPositionsBufferAttribute.getY(i);
        const z = humanmodelPositionsBufferAttribute.getZ(i);

        humanmodelPositionsBufferAttribute.setXYZ(i, x + offset.x, y + offset.y, z + offset.z);
    }

    const scale = new THREE.Vector3(8, 8, 8)

    for (let i = 0; i < count; i++) {
        let x = humanmodelPositionsBufferAttribute.getX(i);
        let y = humanmodelPositionsBufferAttribute.getY(i);
        let z = humanmodelPositionsBufferAttribute.getZ(i);

        // Apply the scaling factor
        x *= scale.x;
        y *= scale.y;
        z *= scale.z;

        humanmodelPositionsBufferAttribute.setXYZ(i, x, y, z);
    }

    humanmodelPositionsBufferAttribute.needsUpdate = true; // Mark the attribute to be updated on the GPU


    let lightbulbGeometry = new THREE.BufferGeometry()
    // always pass on buffer attribute instead of direct arrays :) 
    lightbulbGeometry.setAttribute('position', lightbulbPositionsBufferAttribute)
    lightbulbGeometry.setAttribute('aPositionTarget', humanmodelPositionsBufferAttribute)
    lightbulbGeometry.setIndex(null)


    let humanModelGeometry = new THREE.BufferGeometry()
    humanModelGeometry.setAttribute('position', humanmodelPositionsBufferAttribute)
    humanModelGeometry.setAttribute('aPositionTarget', lightbulbPositionsBufferAttribute)
    humanModelGeometry.setIndex(null)


    return (
        <>
            <points
                geometry={lightbulbGeometry}
                material={material}
                frustumCulled={false}
            />
        </>

    )
}

