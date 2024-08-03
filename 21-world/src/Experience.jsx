import { OrbitControls, useKeyboardControls, useTexture, Sky, Stars } from '@react-three/drei'
import { DepthOfField, EffectComposer } from '@react-three/postprocessing'

import Lights from './Lights.jsx'
import Me from './me.jsx'
import Environment from './Environment.jsx'
import * as THREE from 'three'

export default function Experience() {
    return <>
        <OrbitControls makeDefault />
        <Lights />

        <Sky sunPosition={[0, 1, 0]} inclination={-6} azimuth={0.25} />
        <Me />
        <Environment />
        <EffectComposer disableNormalPass>
            <DepthOfField
                focusDistance={0.025}
                focalLength={0.025}
                bokehScale={6}
            />
        </EffectComposer >
    </>
}