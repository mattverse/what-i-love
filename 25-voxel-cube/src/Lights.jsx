import { useRef } from 'react'
import { useHelper } from '@react-three/drei'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

export default function Lights() {
    const rectAreaLight = useRef()
    const rectAreaLight2 = useRef()

    // useHelper(rectAreaLight, RectAreaLightHelper, 2)
    // useHelper(rectAreaLight2, RectAreaLightHelper, 2)


    return <>
        {/* <ambientLight
            intensity={0.2}
            color={"white"}
            position={[0, -10, 0]}
        // rotation={[0, Math.PI * 180]}
        /> */}

        <rectAreaLight
            intensity={4}
            color={"#4C1F7A"}
            ref={rectAreaLight}
            position={[5, 5, 0]}
            rotation={[-Math.PI * 0.5, 0, 0]}
            lookAt={[0, 0, 0]}
        />

        <rectAreaLight
            intensity={4}
            color={"#FF8000"}
            ref={rectAreaLight2}
            position={[0, 5, 5]}
            rotation={[-Math.PI * 0.5, 0, 0]} />

    </>
}