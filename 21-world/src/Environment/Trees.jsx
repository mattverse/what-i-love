import { useMemo, useRef, useEffect, Fragment } from 'react'
import { useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'
import { RigidBody, CuboidCollider } from '@react-three/rapier'


export default function Trees({
    scale = 0.14
}) {
    const positions = TreePositions()
    // Load all three tree models
    const short = useGLTF('./environment/trees/tree-short.glb')
    const medium = useGLTF('./environment/trees/tree-medium.glb')
    const tall = useGLTF('./environment/trees/tree-tall.glb')

    const yOffsets = [
        .8, // y for short tree
        1., // y for medium tree
        1.18  // y for tall tree
    ];

    // Leva color controls
    const { lightGreen, darkGreen, treeTrunk } = useControls('Tree color', {
        lightGreen: '#789d00',
        darkGreen: '#8ead00',
        treeTrunk: '#73523b'
    })

    // Create materials
    const materials = useMemo(() => ({
        darkGreen: new THREE.MeshStandardMaterial({ color: darkGreen }),
        lightGreen: new THREE.MeshStandardMaterial({ color: lightGreen }),
        trunk: new THREE.MeshStandardMaterial({ color: treeTrunk })
    }), [darkGreen, lightGreen, treeTrunk])

    // Create refs at the top level (fixes Hook violation)
    const darkLeavesRefs = [useRef(), useRef(), useRef()]
    const lightLeavesRefs = [useRef(), useRef(), useRef()]
    const trunksRefs = [useRef(), useRef(), useRef()]

    // Prepare model data and random assignments
    const { transforms, modelData } = useMemo(() => {
        const modelData = [
            { // Short tree
                dark: short.nodes.Cube131.geometry,
                light: short.nodes.Cube131_1.geometry,
                trunk: short.nodes.Cube131_2.geometry
            },
            { // Medium tree
                dark: medium.nodes.Cube129.geometry,
                light: medium.nodes.Cube129_1.geometry,
                trunk: medium.nodes.Cube129_2.geometry
            },
            { // Tall tree
                dark: tall.nodes.Cube132_1.geometry,
                light: tall.nodes.Cube132_2.geometry,
                trunk: tall.nodes.Cube132.geometry
            }
        ]

        // Assign random model type to each position
        const transforms = positions.map(([x, z]) => {
            const modelIndex = Math.floor(Math.random() * 3)
            return {
                modelIndex,
                position: new THREE.Vector3(x, yOffsets[modelIndex], z),
                rotation: new THREE.Euler(0),
                scale: new THREE.Vector3(scale, scale, scale)
            }
        })

        return { transforms, modelData }
    }, [positions, scale])

    // Group transforms by model type
    const modelTransforms = useMemo(() => {
        return transforms.reduce((acc, t) => {
            acc[t.modelIndex].push(t)
            return acc
        }, [[], [], []])
    }, [transforms])

    // Update instance matrices for each model type
    useEffect(() => {
        const matrix = new THREE.Matrix4()

        modelTransforms.forEach((transforms, modelIndex) => {
            if (!transforms.length) return

            // Get references for this model type
            const darkRef = darkLeavesRefs[modelIndex]
            const lightRef = lightLeavesRefs[modelIndex]
            const trunkRef = trunksRefs[modelIndex]

            transforms.forEach((t, i) => {
                matrix.compose(
                    t.position,
                    new THREE.Quaternion().setFromEuler(t.rotation), // Use stored rotation
                    t.scale
                )

                darkRef.current?.setMatrixAt(i, matrix)
                lightRef.current?.setMatrixAt(i, matrix)
                trunkRef.current?.setMatrixAt(i, matrix)
            })

            darkRef.current && (darkRef.current.instanceMatrix.needsUpdate = true)
            lightRef.current && (lightRef.current.instanceMatrix.needsUpdate = true)
            trunkRef.current && (trunkRef.current.instanceMatrix.needsUpdate = true)
        })
    }, [modelTransforms])
    return (
        <>
            {modelData.map((model, modelIndex) => {
                const transforms = modelTransforms[modelIndex]
                const count = transforms.length

                if (count === 0) return null

                return (
                    <Fragment key={modelIndex}>
                        <group>
                            <instancedMesh
                                ref={darkLeavesRefs[modelIndex]}
                                args={[model.dark, materials.darkGreen, count]}
                            />
                            <instancedMesh
                                ref={lightLeavesRefs[modelIndex]}
                                args={[model.light, materials.lightGreen, count]}
                            />
                            <instancedMesh
                                ref={trunksRefs[modelIndex]}
                                args={[model.trunk, materials.trunk, count]}
                            />
                        </group>
                        <Rocks />
                        <TreeColliders />
                    </Fragment>
                )
            })}
        </>
    )
}

function Rocks({ positions = [
    [-3, -3],
    [5.0, -3],
    [18.8, -3],
    [-28.9, -4],
], y = .6, rockScale = 0.15, ...props }) {
    const { nodes, materials } = useGLTF('./environment/rocks/square-rock.glb')
    const count = positions.length
    const meshRef = useRef()

    // Create a dummy Object3D to set transformation (position and scale)
    const dummy = useMemo(() => new THREE.Object3D(), [])

    useEffect(() => {
        positions.forEach((pos, i) => {
            // Set the position: pos[0] = x, constant y, pos[1] = z
            dummy.position.set(pos[0], y, pos[1])
            // Set the scale using the provided rockScale prop
            dummy.scale.set(rockScale, rockScale, rockScale)
            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        })
        meshRef.current.instanceMatrix.needsUpdate = true
    }, [positions, y, rockScale, dummy])

    return (
        <instancedMesh
            ref={meshRef}
            args={[nodes.Cube072.geometry, materials.rock, count]}
            {...props}
        />
    )
}

function TreeColliders() {
    return (
        <group>
            <RigidBody
                type="fixed"
                colliders={false}
                linearDamping={5}
                angularDamping={5}
            >
                <CuboidCollider args={[16.4, 0.3, 1.2]} position={[-11.2, 0.9, -3.8]} />
                {/* behind bowl */}
                <CuboidCollider args={[3.6, 0.3, 0.3]} position={[-31.5, 0.9, -3.8]} />
                <CuboidCollider args={[0.3, 0.3, 0.5]} position={[-34.5, 0.9, -3.]} />
                <CuboidCollider args={[0.3, 0.3, 0.5]} position={[-35.3, 0.9, -2.1]} />
                <CuboidCollider args={[0.3, 0.3, 0.5]} position={[-36.1, 0.9, -1.3]} />
                <CuboidCollider args={[0.3, 0.3, 0.5]} position={[-36.9, 0.9, -0.2]} />
                <CuboidCollider args={[0.3, 0.3, 1.5]} position={[-37.7, 0.9, 1.6]} />
                <CuboidCollider args={[0.3, 0.3, 0.5]} position={[-36.9, 0.9, 3.8]} />
                <CuboidCollider args={[0.3, 0.3, 0.5]} position={[-36.1, 0.9, 5.]} />

                {/* right side of middle */}
                <CuboidCollider args={[0.3, 0.3, 0.3]} position={[5.8, 0.9, -3.8]} />

                {/* osmosis-riiid */}
                <CuboidCollider args={[2.3, 0.3, 0.3]} position={[17.6, 0.9, -3.8]} />
                <CuboidCollider args={[1.5, 0.3, 0.2]} position={[17.5, 0.9, -3.]} />

                {/* riiid-awake */}
                <CuboidCollider args={[1.9, 0.3, 0.3]} position={[29.5, 0.9, -3.8]} />
                <CuboidCollider args={[1.2, 0.3, 0.2]} position={[29.5, 0.9, -3.]} />
            </RigidBody>
        </group>
    )
}

function TreePositions() {
    return (
        [
            // middle 
            [-3.8, -3],
            [-2.2, -3],
            [-1.4, -3],
            [-0.6, -3],
            [0.2, -3],
            [1.0, -3],
            [1.8, -3],
            [2.6, -3],
            [3.4, -3],
            [4.2, -3],

            [-3.8, -4],
            [-3, -4],
            [-2.2, -4],
            [-1.4, -4],
            [-0.6, -4],
            [0.2, -4],
            [1.0, -4],
            [1.8, -4],
            [2.6, -4],
            [3.4, -4],
            [4.2, -4],
            [5.0, -4],
            [5.8, -4],

            //osmosis-riid
            [15.6, -4],
            [16.4, -4],
            [17.2, -4],
            [18.0, -4],
            [18.8, -4],
            [19.6, -4],
            [16.4, -3],
            [17.2, -3],
            [18.0, -3],

            //riiid-awake
            [27.9, -4],
            [28.7, -4],
            [29.5, -4],
            [30.3, -4],
            [31.1, -4],
            [28.7, -3],
            [29.5, -3],
            [30.3, -3],

            // public speaking
            [-27.3, -3],
            [-26.5, -3],
            [-25.7, -3],
            [-24.9, -3],
            [-24.1, -3],
            [-23.3, -3],
            [-22.5, -3],
            [-21.7, -3],
            [-20.9, -3],
            [-20.1, -3],
            [-19.3, -3],
            [-18.5, -3],
            [-17.7, -3],
            [-16.9, -3],
            [-16.1, -3],
            [-15.3, -3],
            [-14.5, -3],
            [-13.7, -3],
            [-12.9, -3],
            [-12.1, -3],
            [-11.3, -3],
            [-10.5, -3],
            [-9.7, -3],
            [-8.9, -3],
            [-8.1, -3],
            [-7.3, -3],
            [-6.5, -3],
            [-5.5, -3],
            [-4.6, -3],

            [-28.1, -4],
            [-27.3, -4],
            [-26.5, -4],
            [-25.7, -4],
            [-24.9, -4],
            [-24.1, -4],
            [-23.3, -4],
            [-22.5, -4],
            [-21.7, -4],
            [-20.9, -4],
            [-20.1, -4],
            [-19.3, -4],
            [-18.5, -4],
            [-17.7, -4],
            [-16.9, -4],
            [-16.1, -4],
            [-15.3, -4],
            [-14.5, -4],
            [-13.7, -4],
            [-12.9, -4],
            [-12.1, -4],
            [-11.3, -4],
            [-10.5, -4],
            [-9.7, -4],
            [-8.9, -4],
            [-8.1, -4],
            [-7.3, -4],
            [-6.5, -4],
            [-5.5, -4],
            [-4.6, -4],

            // after bowl
            [-39.3, -4],
            [-38.5, -4],
            [-37.7, -4],
            [-36.9, -4],
            [-36.1, -4],
            [-35.3, -4],
            [-34.5, -4],
            [-33.7, -4],
            [-32.9, -4],
            [-32.1, -4],
            [-31.3, -4],
            [-30.5, -4],
            [-29.7, -4],

            [-39.3, -3],
            [-38.5, -3],
            [-37.7, -3],
            [-36.9, -3],
            [-36.1, -3],
            [-35.3, -3],
            [-34.5, -3],

            [-39.3, -2],
            [-38.5, -2],
            [-37.7, -2],
            [-36.9, -2],
            [-36.1, -2],
            [-35.3, -2],

            [-39.3, -1],
            [-38.5, -1],
            [-37.7, -1],
            [-36.9, -1],
            [-36.1, -1],

            [-39.3, 0],
            [-38.5, 0],
            [-37.7, 0],
            [-36.9, 0],

            [-39.3, 0],
            [-38.5, 0],
            [-37.7, 0],
            [-36.9, 0],

            [-39.3, 0],
            [-38.5, 0],
            [-37.7, 0],
            [-36.9, 0],

            [-39.3, 1],
            [-38.5, 1],
            [-37.7, 1],

            [-39.3, 2],
            [-38.5, 2],
            [-37.7, 2],

            [-39.3, 3],
            [-38.5, 3],
            [-37.7, 3],
            [-39.3, 4],
            [-38.5, 4],
            [-37.7, 4],
            [-36.9, 4],

            [-39.3, 5],
            [-38.5, 5],
            [-37.7, 5],
            [-36.9, 5],
            [-36.1, 5],
        ]
    )
}