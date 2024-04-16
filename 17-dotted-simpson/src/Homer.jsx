import { useGLTF } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

import * as THREE from 'three'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default function Homer() {
    const sizes = useThree((state) => state.size);
    const gl = useThree((state) => state.gl);
    const pixelRatio = gl.getPixelRatio();

    const { nodes, materials } = useGLTF('/homer.gltf')


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
            uTime: new THREE.Uniform(0)

        }
    })

    useFrame((state, delta) => {
        if (shaderMaterial) {
            shaderMaterial.uniforms.uTime.value += delta
        }
    }, [shaderMaterial])

    return (
        <group dispose={null}>
            <group scale={0.020}>
                <group >
                    <group position={[0, 30, 0]} rotation={[-Math.PI / 2, -0.4, -Math.PI / 2 - 0.5]} scale={16.879}>
                        <mesh geometry={nodes.Sphere_Material001_0.geometry} material={shaderMaterial} />
                        <mesh geometry={nodes.Sphere_Material001_0_1.geometry} material={shaderMaterial} />
                        <mesh geometry={nodes.Sphere_Material002_0.geometry} material={shaderMaterial} />
                        <mesh geometry={nodes.Sphere_Material003_0.geometry} material={shaderMaterial} />
                        <mesh geometry={nodes.Sphere_Material003_0_1.geometry} material={shaderMaterial} />
                        <mesh geometry={nodes.Sphere_Material004_0.geometry} material={shaderMaterial} />
                        <mesh geometry={nodes.Sphere_Material_0.geometry} material={shaderMaterial} />
                    </group>
                </group>
            </group>
        </group>
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
