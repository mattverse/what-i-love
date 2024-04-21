import { useGLTF, Center, Point } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default function LightBulb() {
    const sizes = useThree((state) => state.size);
    const gl = useThree((state) => state.gl);
    const pixelRatio = gl.getPixelRatio();

    const { nodes, scene } = useGLTF('/lightbulb.glb')

    // traverse all mesh in lightbulb model, converge the position attributes into a single array
    let positions = [];  // Use a regular array to gather positions

    scene.traverse(child => {
        if (child.isMesh && child.geometry && child.geometry.attributes.position) {
            let posArray = child.geometry.attributes.position.array;
            positions.push(...posArray);
        }
    });

    // Convert the regular array to a Float32Array when done
    let convergedPosistions = new THREE.Float32BufferAttribute(new Float32Array(positions), 3)

    let particles = {}

    particles.geometry = new THREE.BufferGeometry()
    particles.geometry.setAttribute('position', convergedPosistions)

    particles.material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uResolution: new THREE.Uniform(
                new THREE.Vector2(sizes.width * pixelRatio, sizes.height * pixelRatio)
            ),
        }
    })

    return (
        <Center>
            <points scale={50} geometry={particles.geometry} material={particles.material} />
        </Center>
    )
}

