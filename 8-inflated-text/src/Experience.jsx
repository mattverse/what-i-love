import { OrbitControls, useGLTF, useHelper, Environment } from '@react-three/drei'
import Lights from './Lights.jsx'
import { useControls } from 'leva'
import { useRef } from 'react';
import * as THREE from 'three'
import { Canvas, useFrame } from "@react-three/fiber"

import { BallCollider, Physics, RigidBody, CylinderCollider } from "@react-three/rapier"

import { Attractor } from "@react-three/rapier-addons";

const baubleMaterial = new THREE.MeshLambertMaterial({ color: "#c0a0a0", emissive: "red" })
const capMaterial = new THREE.MeshStandardMaterial({ metalness: 0.75, roughness: 0.15, color: "#8a492f", emissive: "#600000", envMapIntensity: 20 })
const GreenMaterial = () => (
    <meshPhongMaterial
        color={'#1b933f'}
        specular={'#ffffff'}
        shininess={100}
    />
);

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28)

const letters = [...Array(8)].map((_, index) => ({
    id: index, // or any unique identifier
    scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)]
}));


export default function Experience() {
    const { nodes, materials } = useGLTF("/inflated_text_2.glb");
    const light = useRef()

    // useHelper(light, THREE.PointLightHelper, 1, 'black')
    const { lightPosition, lightIntensity } = useControls('lights',
        {
            lightPosition: {
                value: { x: -2, y: 1, z: 2 },
                step: 0.01
            },
            lightIntensity: 10,
        }
    )

    return <>
        <Pointer />
        {letters.map((props) => <Letter nodes={nodes} key={props.id} {...props} />)}
        < OrbitControls makeDefault />

        <Environment preset='park' />
        <pointLight
            position={[lightPosition.x, lightPosition.y, lightPosition.z]}
            intensity={lightIntensity}
            ref={light}
        />
        <pointLight
            position={[2, 1, 2]}
            intensity={lightIntensity}
            ref={light}
        />
        <ambientLight intensity={1.5} />
    </>
}

function Pointer({ vec = new THREE.Vector3() }) {
    const ref = useRef()
    useFrame(({ mouse, viewport }) => {
        vec.lerp({ x: (mouse.x * viewport.width) / 2, y: (mouse.y * viewport.height) / 2, z: 0 }, 0.2)
        ref.current.setNextKinematicTranslation(vec)
    })
    return (
        <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
            <BallCollider args={[2]} />
        </RigidBody>
    )
}

function Letter({ id, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, nodes }) {
    const api = useRef()
    useFrame((state, delta) => {
        delta = Math.min(0.1, delta)
        api.current.applyImpulse(
            vec
                .copy(api.current.translation())
                .normalize()
                .multiply({ x: -50 * delta * scale, y: -150 * delta * scale, z: -50 * delta * scale }),
        )
    })

    const meshName = `Text${String(id).padStart(3, '0')}`; // Text001, Text002, ...
    const geometry = nodes[meshName]?.geometry;

    return (
        <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2} position={[r(20), r(20) - 25, r(20) - 10]} ref={api} colliders={false} dispose={null}>
            <BallCollider args={[scale]} />
            <mesh
                key={id}
                castShadow
                receiveShadow
                geometry={geometry}
                position={[-2.858, 0.035, 0]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <GreenMaterial />
            </mesh>
        </RigidBody>
    );
}



// function Bauble({ id, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread }) {
//     const { nodes } = useGLTF("/cap.glb")
//     const api = useRef()
//     useFrame((state, delta) => {
//         delta = Math.min(0.1, delta)
//         api.current.applyImpulse(
//             vec
//                 .copy(api.current.translation())
//                 .normalize()
//                 .multiply({ x: -50 * delta * scale, y: -150 * delta * scale, z: -50 * delta * scale }),
//         )
//     })
//     return (
//         <RigidBody linearDamping={0.75} angularDamping={0.15} friction={0.2} position={[r(20), r(20) - 25, r(20) - 10]} ref={api} colliders={false} dispose={null}>
//             <BallCollider args={[scale]} />
//             <CylinderCollider rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1.2 * scale]} args={[0.15 * scale, 0.275 * scale]} />
//             <mesh castShadow receiveShadow scale={scale} geometry={sphereGeometry} material={baubleMaterial} />
//             <mesh castShadow scale={2.5 * scale} position={[0, 0, -1.8 * scale]} geometry={nodes.Mesh_1.geometry} material={capMaterial} />
//         </RigidBody>
//     )
// }


{/* <group dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Text001.geometry}
                position={[-2.858, 0.035, 0]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <GreenMaterial />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Text002.geometry}
                position={[-2.858, 0.035, 0]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <GreenMaterial />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Text003.geometry}
                position={[-2.858, 0.035, 0]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <GreenMaterial />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Text004.geometry}
                position={[-2.858, 0.035, 0]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <GreenMaterial />
            </mesh>

            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Text005.geometry}
                position={[-2.858, 0.035, 0]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <GreenMaterial />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Text006.geometry}
                position={[-2.858, 0.035, 0]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <GreenMaterial />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Text007.geometry}
                position={[-2.858, 0.035, 0]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <GreenMaterial />
            </mesh>
        </group> */}
