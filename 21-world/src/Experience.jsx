import { Physics } from '@react-three/rapier'

import Lights from './Lights.jsx'
import { Me } from './Me.jsx'
import EnvironmentSettings from './EnvironmentSettings.jsx'
import * as THREE from 'three'
import { Suspense, useState, useRef } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber';


import Background from './Background.jsx'
import { Computer } from './Portfolio/Computer.jsx'

import { OrbitControls } from '@react-three/drei'

export default function Experience() {
    const [showPortfolio, setShowPortfolio] = useState(false)
    const cameraTarget = useRef(new THREE.Vector3());
    const cameraPosition = useRef(new THREE.Vector3());
    const characterRef = useRef()



    return <>
        <Background />
        {/* <OrbitControls makeDefault /> */}
        <Lights />
        <Suspense >
            <Physics
                gravity={[0, -9.81, 0]}
                timeStep={"vary"}
            // debug
            >
                <EnvironmentSettings
                    characterRef={characterRef}
                    onSpacePressed={() => setCameraMode('portfolio')}
                />
                <Me ref={characterRef} />
            </Physics>
        </Suspense>


    </>
}