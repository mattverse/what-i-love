import { useGLTF } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function PathRocks() {
    const { nodes } = useGLTF('./environment/rocks/rocks.glb')
    // const { color } = useControls('Path Rock', { color: '#a7a7a7' })

    // const rockMaterial = useMemo(
    //     () => new THREE.MeshStandardMaterial({ color, roughness: 1 }),
    //     [color]
    // )

    const rockMaterial = new THREE.MeshStandardMaterial({ color: "#a7a7a7", roughness: 1 })
    const rocksGeometryArray = Array.from({ length: 5 }, (_, i) => nodes[`rock-${i + 1}`].geometry)

    // Collect all rock instances
    const instances = useMemo(() => getAllRockInstances(), [])

    // Group instances by geometry index
    const instancesByGeometry = useMemo(() => {
        const groups = [[], [], [], [], []] // indices 0-4
        instances.forEach(instance => {
            groups[instance.geometryIndex].push(instance)
        })
        return groups
    }, [instances])

    // Refs for each instanced mesh
    const refs = useRef(Array(5).fill(null))

    // Update instance matrices
    useEffect(() => {
        instancesByGeometry.forEach((group, geometryIndex) => {
            const ref = refs.current[geometryIndex]
            if (!ref || group.length === 0) return

            const matrix = new THREE.Matrix4()
            group.forEach((instance, i) => {
                matrix.compose(
                    instance.position,
                    new THREE.Quaternion().setFromEuler(instance.rotation),
                    instance.scale
                )
                ref.setMatrixAt(i, matrix)
            })
            ref.instanceMatrix.needsUpdate = true
        })
    }, [instancesByGeometry])

    return (
        <>
            {instancesByGeometry.map((group, geometryIndex) => {
                if (group.length === 0) return null
                const geometry = rocksGeometryArray[geometryIndex]
                return (
                    <instancedMesh
                        key={geometryIndex}
                        ref={el => (refs.current[geometryIndex] = el)}
                        args={[geometry, rockMaterial, group.length]}
                    />
                )
            })}
        </>
    )
}

function getAllRockInstances() {
    const instances = []

    const addInstance = (geometryIndex, position, rotation, scale) => {
        instances.push({
            geometryIndex,
            position: new THREE.Vector3(...position),
            rotation: new THREE.Euler(...rotation),
            scale: new THREE.Vector3().setScalar(scale),
        })
    }

    // Main path rocks
    addInstance(4, [-0.9, 0.4, -1.6], [0, Math.PI / 2, 0], 0.18)
    addInstance(3, [-0.7, 0.4, -0.8], [0, Math.PI / 2 + 0.1, 0], 0.18)
    addInstance(2, [-0.8, 0.4, 0.15], [0, 0, 0], 0.14)
    addInstance(4, [-0.6, 0.4, -0.1], [0, 0, 0], 0.2)
    addInstance(2, [-0.8, 0.4, 1], [0, Math.PI / 2, 0], 0.14)
    addInstance(0, [-0.8, 0.4, 1.9], [0, 0, 0], 0.14)
    addInstance(0, [-0.8, 0.4, 2.7], [0, 0.1, 0], 0.14)
    addInstance(0, [-0.8, 0.4, 2.7], [0, 0.1, 0], 0.14)
    addInstance(0, [0, 0.4, 2.7], [0, 0, 0], 0.14)
    addInstance(1, [0.8, 0.4, 2.7], [0, 0, 0], 0.14)
    addInstance(2, [1.5, 0.4, 2.6], [0, 0, 0], 0.14)
    addInstance(4, [1.7, 0.4, 2.4], [0, 0, 0], 0.14)
    addInstance(0, [2.3, 0.4, 2.55], [0, 0, 0], 0.14)
    addInstance(1, [3.1, 0.4, 2.5], [0, Math.PI / 2 + 0.1, 0], 0.14)
    addInstance(2, [3.8, 0.4, 2.5], [0, -Math.PI / 2 - 0.05, 0], 0.14)
    addInstance(1, [4.6, 0.4, 2.5], [0, Math.PI / 2, 0], 0.14)
    addInstance(0, [5.4, 0.4, 2.5], [0, Math.PI / 2, 0], 0.14)
    addInstance(0, [6.2, 0.4, 2.5], [0, Math.PI / 2, 0], 0.14)
    addInstance(2, [7, 0.4, 2.5], [0, Math.PI / 2, 0], 0.14)

    // OsmosisRiiidPath
    addInstance(1, [16.2, 0.4, 2.5], [0, Math.PI / 2, 0], 0.14)
    addInstance(0, [17, 0.4, 2.55], [0, Math.PI / 2, 0], 0.135)
    addInstance(2, [17.8, 0.4, 2.55], [0, Math.PI / 2, 0], 0.14)
    addInstance(2, [17.8, 0.4, 2.55], [0, Math.PI / 2, 0], 0.14)
    addInstance(4, [18.5, 0.4, 2.38], [0, Math.PI / 2, 0], 0.14)
    addInstance(2, [18.7, 0.4, 2.55], [0, Math.PI / 2, 0], 0.14)

    // RiiidAwakePath
    addInstance(0, [28.5, 0.4, 2.5], [0, Math.PI / 2, 0], 0.14)
    addInstance(0, [29.3, 0.4, 2.5], [0, Math.PI / 2 + 0.05, 0], 0.14)
    addInstance(2, [30.1, 0.4, 2.5], [0, Math.PI / 2, 0], 0.14)
    addInstance(0, [30.9, 0.4, 2.5], [0, Math.PI / 2 - 0.05, 0], 0.14)

    // PortfolioPath
    addInstance(1, [-1.7, 0.4, 2.8], [0, -Math.PI / 2, 0], 0.14)
    addInstance(2, [-2.4, 0.4, 2.8], [0, -Math.PI / 2, 0], 0.14)
    addInstance(0, [-3.2, 0.4, 2.85], [0, -Math.PI / 2, 0], 0.14)

    // PublicSpeakingPath
    addInstance(1, [-8.9, 0.4, 2.9], [0, -Math.PI / 2, 0], 0.14)
    addInstance(2, [-9.6, 0.4, 2.85], [0, -Math.PI / 2, 0], 0.14)
    addInstance(0, [-10.33, 0.4, 2.85], [0, -Math.PI / 2, 0], 0.14)

    // GopherconPath
    addInstance(1, [-15.9, 0.4, 2.9], [0, -Math.PI / 2, 0], 0.14)
    addInstance(0, [-16.6, 0.4, 2.85], [0, -Math.PI / 2, 0], 0.14)
    addInstance(0, [-17.33, 0.4, 2.85], [0, -Math.PI / 2, 0], 0.14)

    // IBCSummitPath
    addInstance(1, [-21.9, 0.4, 2.9], [0, -Math.PI / 2, 0], 0.14)
    addInstance(0, [-22.6, 0.4, 2.85], [0, -Math.PI / 2, 0], 0.14)
    addInstance(2, [-23.33, 0.4, 2.85], [0, -Math.PI / 2, 0], 0.14)

    // PlatePath
    addInstance(1, [-27.9, 0.4, 2.9], [0, -Math.PI / 2, 0], 0.14)
    addInstance(0, [-28.6, 0.4, 2.85], [0, -Math.PI / 2, 0], 0.14)
    addInstance(1, [-29.33, 0.4, 2.85], [0, Math.PI / 2, 0], 0.14)

    return instances
}