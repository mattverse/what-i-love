import { OrbitControls, useKeyboardControls, useTexture, Sky, Stars } from '@react-three/drei'
import Lights from './Lights.jsx'
import Me from './me.jsx'
import Environment from './Environment.jsx'
import * as THREE from 'three'

export default function Experience() {
    return <>
        <OrbitControls makeDefault />
        <Lights />

        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
        <Me />
        <Environment />
    </>
}