import { Physics } from '@react-three/rapier'

import Lights from './Lights.jsx'
import Me from './Me.jsx'
import EnvironmentSettings from './EnvironmentSettings.jsx'
import * as THREE from 'three'
import { Suspense, useState, useRef } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber';


import Background from './Background.jsx'
import { Computer } from './Portfolio/Computer.jsx'

import { OrbitControls } from '@react-three/drei'

export default function Experience() {
    const [showPortfolio, setShowPortfolio] = useState(false)
    const [cameraState, setCameraState] = useState('follow');
    const cameraTarget = useRef(new THREE.Vector3());
    const cameraPosition = useRef(new THREE.Vector3());



    useFrame((state) => {
        // console.log(state.camera.position);

        if (cameraState === 'transition') {
            // Animate camera to computer screen
            cameraTarget.current.lerp(new THREE.Vector3(-6.1, 1.75, 1.2), 0.1);
            cameraPosition.current.lerp(new THREE.Vector3(-6.1, 1.75, 1.3), 0.1);

            // state.camera.lookAt(cameraTarget.current);
            // state.camera.position.copy(cameraPosition.current);

            // // Complete transition when close enough
            // if (state.camera.position.distanceTo(new THREE.Vector3(-6.1, 1.75, 1.3)) < 0.1) {
            //     setCameraState('screen-view');
            // }

            setCameraState('screen-view');

        }
    });


    return <>
        <Background />
        <OrbitControls makeDefault />
        <Lights />
        <Suspense >
            <Physics
                gravity={[0, -9.81, 0]}
                timeStep={"vary"}
            // debug
            >
                <EnvironmentSettings
                    showCards={cameraState === 'screen-view'}
                />
                <Me />
            </Physics>
        </Suspense>


    </>
}