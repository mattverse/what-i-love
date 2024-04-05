import { Center, Text3D } from '@react-three/drei';
import * as THREE from 'three'
import { useEffect, useState } from 'react';

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default function Text() {
    const [lightPosition, setLightTo] = useState(new THREE.Vector3())

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1
            const y = -(event.clientY / window.innerHeight) * 2 + 1

            const mousePosition = new THREE.Vector3(x, y, 0.3)

            setLightTo(mousePosition)
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    })

    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            uLightDirection: new THREE.Uniform(lightPosition),
        }
    })

    return <>
        <Center>
            < Text3D curveSegments={32}
                bevelEnabled
                bevelSize={0.02}
                bevelThickness={0.01}
                height={0.5}
                lineHeight={0.5}
                font="/Workbench_Regular.json"
                material={shaderMaterial}
                scale={0.7}
                rotation={[0.1, -0.6, 0]}
                position={[-0.2, 0.2, 0]}
            >
                {`hello\nworld`}
            </Text3D >
        </Center >

    </>
}
