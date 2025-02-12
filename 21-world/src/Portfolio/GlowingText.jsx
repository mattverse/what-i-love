import * as THREE from 'three'
import { React, useRef } from 'react'
import { useGLTF, Merged, RenderTexture, PerspectiveCamera, Text } from '@react-three/drei'
import { useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom, Select, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'


/* Screen Component */
export default function FloatingText() {
    const textRef = useRef()
    const offset = useRef(Math.random() * 10000)

    useFrame((state) => {
        if (!textRef.current) return
        textRef.current.position.x = Math.sin(offset.current + state.clock.elapsedTime / 2) * 15.
    })


    return (
        <Text
            ref={textRef}
            font="./m6x11plus.ttf"
            fontSize={9}
            color="black"
            position={[0, 1, 0]}
            letterSpacing={-0.04}
            anchorX="center"
            anchorY="middle"
        >
            PORTFOLIO
        </Text>
    )
}
