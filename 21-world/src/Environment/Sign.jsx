import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

export default function Sign({ position, scale }) {
    const { nodes } = useGLTF('./environment/sign.glb'); // Load as a mesh\

    const meshRef = useRef();
    const sign = useGLTF('./environment/sign.glb')

    // Use Leva to control the color
    // const { color } = useControls('Grass Tall', {
    //     color: '#8dbd35'
    // });


    useEffect(() => {
        console.log(nodes);


    })

    return (
        <>
            <primitive
                object={sign.scene}
                position={[-3, -1.7, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={0.15}
            />
        </>

    );
}
