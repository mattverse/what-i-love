
import { useLoader, useFrame } from '@react-three/fiber';
import { useEffect, Suspense, useRef } from 'react';
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

import { Environment, Center, MeshTransmissionMaterial, Html, Text, useGLTF, PresentationControls } from '@react-three/drei'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


export default function Experience() {
    return <>
        {/* <OrbitControls makeDefault enablePan={false} enableZoom={false} /> */}

        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr" background blur={10} />
        <color args={['white']} attach={"background"} />

        <PresentationControls>
            <mesh position={[1, 1, 1]}>
                <boxGeometry />
                <meshBasicMaterial />
            </mesh>
        </PresentationControls>

        {/* <Suspense fallback={null}>
            <FBXModel position={[2, -0.6, 0]} url="chamfercube.fbx" />
            <FBXModel position={[-2, 0.6, 0]} url="chamfercube.fbx" />
        </Suspense> */}

        <CustomText position={[-5, 3.5, -5]}>MOMENT</CustomText>
        <CustomText position={[-5, 2, -5]}>OF</CustomText>
        <CustomText position={[-3.5, 0.5, -5]}>EXPRESSION</CustomText>
        <CustomText position={[3.5, -1, -5]}>MATT PARK</CustomText>
        <CustomText position={[4.5, -2.5, -5]}>ARCHIVE</CustomText>
    </>
}

function CustomText({ position, children }) {
    return (
        <Text
            position={position}
            color={"black"}
            font='/bold.ttf'
            fontWeight={"700"}
            scale={1.2}
        >
            {children}
        </Text>
    );
}


function FBXModel({ url, position }) {
    const fbx = useLoader(FBXLoader, url);

    const rgbeLoader = new RGBELoader()

    const hdrEquirect = rgbeLoader.load(
        "gradient.jpeg",
        () => {
            hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
        }
    );

    const cube1 = useRef()

    useFrame((state, delta) => {
        cube1.current.rotation.y += delta * 0.5
    })

    // This function will be called for each mesh in the FBX model
    const applyMaterial = (child) => {
        return (
            <>
                <Center>
                    <mesh
                        ref={cube1}
                        key={child.id}
                        geometry={child.geometry}
                        // position={position} // Adjust position as needed
                        scale={[0.035, 0.035, 0.035]} // Adjust scale as needed
                    >
                        <MeshTransmissionMaterial
                            roughness={0}
                            transmission={1}
                            thickness={0.8}
                            iridescence={1}
                            iridescenceIOR={0.7}
                            envMap={hdrEquirect}
                            envMapIntensity={1.5}
                            // map={hdrEquirect}
                            chromaticAberration={0.2}
                        />
                    </mesh>
                </Center>


            </>
        );
    };

    return (
        <group scale={30}
            position={position}
        >
            {fbx.children.map((child) => {
                if (child.isMesh) {
                    return applyMaterial(child);
                }
                return null;
            })}
        </group>
    );
}
