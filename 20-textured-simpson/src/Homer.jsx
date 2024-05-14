import { useGLTF, useTexture } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

import * as THREE from 'three'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default function Homer() {
    const sizes = useThree((state) => state.size);
    const gl = useThree((state) => state.gl);
    const pixelRatio = gl.getPixelRatio();

    const { nodes, materials } = useGLTF('/homer.gltf')
    const homerScene = useGLTF('/homer.gltf').scene;

    let homerPositions = [];
    homerScene.traverse(child => {
        if (child.isMesh && child.geometry && child.geometry.attributes.position) {
            let posArray = child.geometry.attributes.position.array
            for (let i = 0; i < posArray.length; i++) {
                // we can't use spread operators here since the original array is too big and would cause
                // stack size errors
                homerPositions.push(posArray[i])
            }
        }
    });
    const homerPositionsBufferAttribute = new THREE.Float32BufferAttribute(new Float32Array(homerPositions), 3)

    const homerGeometry = new THREE.BufferGeometry()
    homerGeometry.setAttribute('position', homerPositionsBufferAttribute)
    homerGeometry.setIndex(null)


    const [blue, circle, tiles] = useTexture(['blue-tile.png', 'circle-texture.png', 'tiles.png'])


    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uResolution: new THREE.Uniform(
                new THREE.Vector2(sizes.width * pixelRatio, sizes.height * pixelRatio)
            ),
            uBaseColor: new THREE.Uniform(
                new THREE.Color('blue')
            ),
            uPointColor: new THREE.Uniform(
                new THREE.Color('white')
            ),
            uTime: new THREE.Uniform(0),
            uBlueTexture: new THREE.Uniform(blue),
            uCircleTexture: new THREE.Uniform(circle),
            uTilesTexture: new THREE.Uniform(tiles)
        }
    })

    useFrame((state, delta) => {
        if (shaderMaterial) {
            shaderMaterial.uniforms.uTime.value += delta
        }
    }, [shaderMaterial])

    return (
        <>
            <points
                // position={[-19, 12, -15]}
                scale={0.2}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2 - 0.5]}
                geometry={homerGeometry}
                material={shaderMaterial}
                frustumCulled={false}
            />
        </>
    )
}

useGLTF.preload('/homer.gltf')


// Model Information:
// * title:	HOMER SIMPSONS FREE!
// * source:	https://sketchfab.com/3d-models/homer-simpsons-free-4b9c2389b6af421383887cebb5385943
// * author:	Felipe.Sanches.Alves (https://sketchfab.com/Felipe.Sanches.Alves)

// Model License:
// * license type:	CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
// * requirements:	Author must be credited. Commercial use is allowed.
