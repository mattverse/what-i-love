import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Flower() {
    const { nodes, materials } = useGLTF('/flower.glb')
    return (
        <group
            dispose={null}
            scale={0.015}
            position-x={-0.2}
            position-y={-1.4}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Box013.geometry}
                material={materials['01___Default']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere001_1.geometry}
                material={materials['08___Default']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere001_1_1.geometry}
                material={materials['04___Default']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.GeoSphere002_1.geometry}
                material={materials['01___Default']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.GeoSphere002_1_1.geometry}
                material={materials['02___Default']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.GeoSphere002_1_2.geometry}
                material={materials['03___Default']}
            />
        </group>
    )
}

useGLTF.preload('./flower.glb');