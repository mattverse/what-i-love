import { OrbitControls, useTexture, useGLTF } from '@react-three/drei'
import Lights from './Lights.jsx'
import { Effect } from 'postprocessing'
import { wrapEffect, EffectComposer } from '@react-three/postprocessing'
import { useFrame } from '@react-three/fiber'
import fragmentShader from './shaders/fragment.glsl'
import * as THREE from 'three'
import { useRef } from 'react'
import { forwardRef } from 'react'


class RetroEffectImpl extends Effect {
    constructor() {
        super("RetroEffect", fragmentShader, {
            uniforms: new Map([
                ["palette", new THREE.Uniform(null)]
            ])
        })

        this.uniforms = this.uniforms
    }

    set palette(value) {
        this.uniforms.get("palette").value = value;
    }

    get palette() {
        return this.uniforms.get("palette").value;
    }
}

const RetroEffect = wrapEffect(RetroEffectImpl)

const MarioKart = forwardRef((_, ref) => {
    const { nodes, materials } = useGLTF('/mario_kart.glb')

    return (
        <group ref={ref} dispose={null}>
            <mesh geometry={nodes.mt_mario.geometry} material={materials.mt_mario} />
            <mesh geometry={nodes.mt_kart_Mario_S.geometry} material={materials.mt_kart_Mario_S} />
            <mesh geometry={nodes.mt_Kart_Mario_Tire_S.geometry} material={materials.mt_Kart_Mario_Tire_S} />
        </group>
    )
})

useGLTF.preload('/mario_kart.glb')


export default function Experience() {
    const effect = useRef()
    const marioKart = useRef()

    useFrame(() => {
        effect.current.palette = palette
    })

    const palette = useTexture("./palette.png")
    return <>
        <OrbitControls makeDefault />
        <Lights />
        <color args={["white"]} attach="background" />

        <MarioKart ref={marioKart} />

        <EffectComposer>
            <RetroEffect ref={effect} />
        </EffectComposer>
    </>
}