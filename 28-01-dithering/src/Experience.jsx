import { OrbitControls, useTexture } from '@react-three/drei'
import Lights from './Lights.jsx'
import { Effect } from 'postprocessing'
import { wrapEffect, EffectComposer } from '@react-three/postprocessing'
import { useFrame } from '@react-three/fiber'
import fragmentShader from './shaders/fragment.glsl'
import * as THREE from 'three'
import { useRef } from 'react'


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



export default function Experience() {
    const effect = useRef()
    useFrame(() => {
        effect.current.palette = palette
    })

    const palette = useTexture("./palette.png")
    return <>
        <OrbitControls makeDefault />
        <Lights />

        <color args={["black"]} attach="background" />
        <mesh receiveShadow castShadow>
            <torusKnotGeometry args={[1, 0.25, 128, 100]} />
            <meshStandardMaterial color="#58A4FE" />
        </mesh>

        <EffectComposer>
            <RetroEffect ref={effect} />
        </EffectComposer>
    </>
}