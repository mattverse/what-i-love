import { Physics } from '@react-three/rapier'

import Lights from './WorldSettings/Lights.jsx'
import { Robot } from './Character/Robot.jsx'
import * as THREE from 'three'
import { Suspense, useState, useRef } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber';


import Background from './WorldSettings/Background.jsx'
import { Computer } from './Portfolio/Computer.jsx'

import { OrbitControls } from '@react-three/drei'

// components
import Ground from './Environment/Ground';
import Flowers from './Environment/Flowers';
import Trees from './Environment/Trees';
import MattText from './AboutMe/MattText'
import Sign from './AboutMe/Sign';
import PathRocks from './Environment/Rocks/PathRocks';
import Osmosis from './WorkExperience/osmosis';
import Riiid from './WorkExperience/Riiid';
import Awake from './WorkExperience/Awake';
import Bio from './AboutMe/Bio.jsx'

import SingleSign from './Portfolio/SingleSign'
import PublicSpeaking from './Portfolio/PublicSpeaking'
import Dice from './Dice/Dice'

export default function Experience() {
    const [showPortfolio, setShowPortfolio] = useState(false)
    const cameraTarget = useRef(new THREE.Vector3());
    const cameraPosition = useRef(new THREE.Vector3());
    const characterRef = useRef()



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
                <Bio characterRef={characterRef} />
                <Ground />
                <Trees />
                <Flowers />
                <MattText />
                <Sign />
                <PathRocks />
                <group position={[2, 0, 0]}>
                    <Osmosis />
                    <Riiid />
                    <Awake />
                </group>
                <Computer characterRef={characterRef} />
                <SingleSign />
                <PublicSpeaking />
                <Dice />
                <Robot ref={characterRef} />
            </Physics>
        </Suspense>


    </>
}