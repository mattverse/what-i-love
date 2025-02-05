import { Physics } from '@react-three/rapier'

import Lights from './Lights.jsx'
import Me from './me.jsx'
import EnvironmentSettings from './Environment.jsx'
import * as THREE from 'three'
import { Suspense } from 'react'

import Background from './Background.jsx'

import { Environment, Float, ContactShadows, OrbitControls } from '@react-three/drei'
import { LayerMaterial, Color, Depth, Noise } from 'lamina'


export default function Experience() {
    return <>

        <Background />
        {/* <color args={['#464646']} attach={"background"} /> */}

        {/* <Environment
            background // Renders the background
            lighting="" // Disables environment lighting
            environment={null} // Prevents environment map generation
            resolution={64}
        >
            <mesh scale={100}>
                <sphereGeometry args={[1, 64, 64]} />
                <LayerMaterial side={THREE.BackSide}>
                    <Color color="blue" alpha={10} mode="normal" />
                    <Depth colorA="#00fcfc" colorB="#26feff" alpha={1} mode="normal" near={1} far={100} origin={[100, 100, 100]} />
                    <Noise mapping="local" type="cell" scale={1} mode="softlight" />
                </LayerMaterial>
            </mesh>
        </Environment> */}

        <OrbitControls makeDefault />
        <Lights />
        <Suspense >
            <Physics gravity={[0, -9.81, 0]} debug timeStep={"vary"}>
                <Me />
                <EnvironmentSettings />
            </Physics>
        </Suspense>
    </>
}