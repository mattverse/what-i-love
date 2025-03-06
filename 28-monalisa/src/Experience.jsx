import { OrbitControls, useGLTF, PresentationControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Lights from './Lights.jsx'
import { wrapEffect, EffectComposer } from '@react-three/postprocessing'
import { Effect } from 'postprocessing'
import { forwardRef, useRef } from 'react'

import fragmentShader from './shaders/fragment.glsl'

class PixelEffectImpl extends Effect {

    constructor() {
        super("PixelEffect", fragmentShader, {
            uniforms: new Map([])
        })
    }
}

const PixelEffect = wrapEffect(PixelEffectImpl)


export default function Experience() {
    const monalisa = useRef()
    useFrame((state, delta) => {
        monalisa.current.rotation.y += delta
    })
    return <>
        <Lights />
        <color args={["black"]} attach="background" />

        <PresentationControls
            global
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
        >
            <Monalisa ref={monalisa} />
        </PresentationControls>

        <EffectComposer>
            <PixelEffect />
        </EffectComposer>

    </>
}

const Monalisa = forwardRef((_, ref) => {
    const { nodes, materials } = useGLTF('./monalisa.glb')
    return (
        <group dispose={null} ref={ref}>
            <mesh geometry={nodes.Object_4.geometry} material={materials.Material_27} scale={0.1} rotation={[0, 0, -Math.PI]} />
        </group>
    )
})

useGLTF.preload('/monalisa.glb')