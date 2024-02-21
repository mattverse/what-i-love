import { Icosahedron, OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useRapier, Physics, RigidBody, InstancedRigidBodies } from '@react-three/rapier'
import * as THREE from 'three'
import { useState, useEffect, useRef, useMemo, Fragment } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Hand from './Hand';
import Envmaps from './EnvMaps';
import { gsap } from 'gsap'
import TextSection from './Text';



export default function Experience() {
    const [sceneReady, setSceneReady] = useState(false)


    // Bowl
    const bowlModel = useGLTF('./Bowl/bowl.gltf')
    const bowlNodes = bowlModel.nodes
    const bowlMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.05,
        metalness: 0.54,
        flatShading: true,
    })
    const bowlRef = useRef()

    const getRandomPosition = () => {
        const x = (Math.random() - 0.5) * 8;
        const y = 6 + (Math.random() - 0.5) * 0.2;
        const z = (Math.random() - 0.5) * 8;
        return [x, y, z];
    };

    const icoGeom = new THREE.IcosahedronGeometry(1, 0)

    /**
     * Loaders
     */
    const loadingBarElement = document.querySelector('.loading-bar')
    const loadingManager = new THREE.LoadingManager(
        // Loaded
        () => {
            // Wait a little
            window.setTimeout(() => {
                // Animate overlay
                gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

                // Update loadingBarElement
                loadingBarElement.classList.add('ended')
                loadingBarElement.style.transform = ''
            }, 500)

            window.setTimeout(() => {
                setSceneReady(true)
            }, 2000)
        },

        // Progress
        (itemUrl, itemsLoaded, itemsTotal) => {
            // Calculate the progress and update the loadingBarElement
            const progressRatio = itemsLoaded / itemsTotal
            loadingBarElement.style.transform = `scaleX(${progressRatio})`
        }
    )

    const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)

    const overlayMaterial = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
            uAlpha: { value: 1 }
        },
        vertexShader: `
        void main() {
            // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            gl_Position = vec4(position, 1.0);
        }
    `,

        fragmentShader: `
        uniform float uAlpha;
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
    })

    const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

    // Get envmaps 
    // WARNING: This causes alot of perf overhead atm. To Refactor
    const envMaps = Envmaps(cubeTextureLoader)

    return <>
        <color args={['black']} attach="background" />

        {/* <Perf position="top-left" /> */}

        {sceneReady && (
            <>
                <OrbitControls makeDefault />
                {/* <TextSection /> */}
                <mesh geometry={overlayGeometry} material={overlayMaterial} />

                <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
                <ambientLight intensity={1.5} />
                <Physics gravity={[0, -19.81, 0]} debug >
                    {/* Objects */}
                    {envMaps.map((envMap, index) => (
                        <Fragment key={index}>
                            <RigidBody
                                position={getRandomPosition()}
                                colliders="hull"
                                friction={1}
                                restitution={0.2}
                                scale={0.6}
                                canSleep={false}
                            >
                                <mesh castShadow geometry={icoGeom}>
                                    <meshBasicMaterial envMap={envMap} />
                                </mesh>
                            </RigidBody>
                            <RigidBody
                                position={getRandomPosition()}
                                colliders="hull"
                                friction={1}
                                restitution={0.2}
                                scale={0.6}
                                canSleep={false}
                            >
                                <mesh castShadow geometry={icoGeom}>
                                    <meshBasicMaterial envMap={envMap} />
                                </mesh>
                            </RigidBody>
                        </Fragment>
                    ))}

                    {/* Attempt to use Instanced bodies */}
                    {/* <InstancedRigidBodies
        instances={instances}
        friction={1}
        restitution={0.2}
        scale={0.4}
        canSleep={false}
        colliders="hull"
    >
        <instancedMesh castShadow args={[null, null, 10]}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial envMap={randomEnvMap} />
        </instancedMesh>
    </InstancedRigidBodies> */}

                    {/* bowl */}
                    <RigidBody
                        type="fixed"
                        colliders="trimesh"
                        friction={1}
                        restitution={0.2}
                        linearDamping={5.0}
                        angularDamping={5.0}
                        canSleep={false}
                    >
                        <mesh
                            geometry={bowlNodes.carved_wooden_plate.geometry}
                            scale={50}
                            material={bowlMaterial}
                            position={[0, -0.5, 1]}
                            receiveShadow
                            ref={bowlRef}
                        />
                    </RigidBody>

                    <Hand bowlRef={bowlRef} />

                </Physics>
            </>
        )}
    </>
}

useGLTF.preload('./Bowl/bowl.gltf')