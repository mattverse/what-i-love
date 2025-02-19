import { useAnimations, useGLTF, useKeyboardControls } from '@react-three/drei'
import { useControls } from 'leva';
import * as THREE from 'three'


export default function Trees({ props }) {
    const { nodes, materials } = useGLTF('./environment/tree.glb')


    const { lightGreen, darkGreen, treeTrunk } = useControls('Tree color', {
        lightGreen: '#789d00',
        darkGreen: '#8ead00',
        treeTrunk: '#5c392f'
    });

    const lightGreenMaterial = new THREE.MeshStandardMaterial({ color: lightGreen })
    const darkGreenMaterial = new THREE.MeshStandardMaterial({ color: darkGreen })
    const treeTrunkMaterial = new THREE.MeshStandardMaterial({ color: treeTrunk })

    return (
        <group scale={0.5} position={[0, 1.2, -3.]} dispose={null}>
            <group >
                <mesh geometry={nodes.Cube029.geometry} material={darkGreenMaterial} />
                <mesh geometry={nodes.Cube029_1.geometry} material={lightGreenMaterial} />
                <mesh geometry={nodes.Cube029_2.geometry} material={treeTrunkMaterial} />
            </group>
        </group>
    )
}