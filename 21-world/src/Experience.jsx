import { OrbitControls, } from '@react-three/drei'
import { Physics } from '@react-three/rapier'

import Lights from './Lights.jsx'
import Me from './me.jsx'
import Environment from './Environment.jsx'
import * as THREE from 'three'
import { Suspense } from 'react'

export default function Experience() {
    return <>
        {/* <color args={['#464646']} attach={"background"} /> */}

        <OrbitControls makeDefault />
        <Lights />
        <Suspense >
            <Physics gravity={[0, -9.81, 0]} debug timeStep={"vary"}>
                <Me />
                <Environment />
            </Physics>
        </Suspense>
    </>
}