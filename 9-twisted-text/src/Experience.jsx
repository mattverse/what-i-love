import { Environment, OrbitControls, useGLTF, MeshTransmissionMaterial, RandomizedLight, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import Lights from './Lights.jsx'
import { forwardRef, useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'



export default function Experience() {
    const ribbon = useRef()
    const ribbon2 = useRef()
    const ribbon3 = useRef()



    useFrame((state, delta) => {
        // console.log(ribbon);
        ribbon.current.rotation.x += delta * 0.5
        ribbon2.current.rotation.x += delta * 0.5
        ribbon3.current.rotation.x += delta * 0.5

        // ribbon.current.x += delta * 0.2
        // ribbon.current.z += delta * 0.2
    })


    return <>

        <color args={['#000000']} attach="background" />
        <OrbitControls makeDefault />

        <Lights />
        <ambientLight />
        <RandomizedLight radius={10} ambient={0.5} intensity={1} position={[2.5, 8, -2.5]} bias={0.001} />


        {/* <Environment preset='sunset' /> */}

        <Ribbon ref={ribbon} position={[10, 4, -10]} />
        <Ribbon ref={ribbon2} position={[10, 1, -10]} />
        <Ribbon ref={ribbon3} position={[10, -2, -10]} />


        <Button />

    </>
}

// pass in position as props
const Ribbon = forwardRef(({ ...props }, ref) => {
    const { nodes, materials } = useGLTF("/twist-blue-orange.glb");

    const config = useControls({
        meshPhysicalMaterial: false,
        transmissionSampler: false,
        backside: false,
        samples: { value: 10, min: 1, max: 32, step: 1 },
        resolution: { value: 2048, min: 256, max: 2048, step: 256 },
        transmission: { value: 1, min: 0, max: 1 },
        roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
        thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
        ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
        chromaticAberration: { value: 1, min: 0, max: 1 },
        anisotropy: { value: 1, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
        distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
        temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
        clearcoat: { value: 1, min: 0, max: 1 },
        attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
        attenuationColor: '#ffffff',
        color: '#804d4d',
        bg: '#1600ff'
    })

    return <group dispose={null} scale={[0.8, 0.8, 0.8]}  {...props} ref={ref}>
        <group scale={[6, 1, 1]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
            // material={materials.Base}
            >
                <MeshTransmissionMaterial background={new THREE.Color(config.bg)} {...config} />
            </mesh>

            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001_1.geometry}
                material={materials.Text}
            />
        </group>
    </group>
})

const Button = () => {
    return <Html>
        <div class='button -flower center'>Where the figs lie</div>

    </Html>
}

useGLTF.preload("/twist-blue-orange.glb");

