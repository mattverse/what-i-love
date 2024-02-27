
import Lights from './Lights.jsx'
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { useEffect, Suspense } from 'react';
import { useControls } from 'leva'
import * as THREE from 'three'

import { OrbitControls, AccumulativeShadows, RandomizedLight, Environment, Center, MeshTransmissionMaterial, Html, Text, useGLTF, PresentationControls } from '@react-three/drei'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


export default function Experience() {
    const bgTexture = new THREE.TextureLoader().load("texture.jpg");


    return <>
        {/* <OrbitControls makeDefault enablePan={false} enableZoom={false} /> */}

        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr" background blur={1} />

        <Underlay />
        <PresentationControls>
            <Suspense fallback={null}>
                <FBXModel url="chamfercube.fbx" />
            </Suspense>
        </PresentationControls>


        <Text
            position={[0, 0, -5]}
            color={"black"}
        >
            Hello world
        </Text>
    </>
}

function FBXModel({ url }) {
    const fbx = useLoader(FBXLoader, url);



    const config = useControls({
        meshPhysicalMaterial: false,
        transmissionSampler: false,
        backside: false,
        samples: { value: 10, min: 1, max: 32, step: 1 },
        resolution: { value: 2048, min: 256, max: 2048, step: 256 },
        transmission: { value: 1, min: 0, max: 1 },
        roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
        thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
        ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
        chromaticAberration: { value: 0.06, min: 0, max: 1 },
        anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
        distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
        temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
        clearcoat: { value: 1, min: 0, max: 1 },
        attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
        attenuationColor: '#ffffff',
        color: '#c9ffa1',
        bg: '#839681'
    })

    // This function will be called for each mesh in the FBX model
    const applyMaterial = (child) => {
        return (
            <>
                <mesh
                    key={child.id}
                    geometry={child.geometry}
                    // material={child.material}
                    position={[0, 0, 0]} // Adjust position as needed
                    scale={[0.035, 0.035, 0.035]} // Adjust scale as needed
                >
                    <MeshTransmissionMaterial
                        roughness={0}
                        transmission={1}
                        thickness={0.5}
                    // chromaticAberration={0.5}
                    // {...config}
                    // background={new THREE.Color(config.bg)}
                    />
                </mesh>

            </>
        );
    };

    return (
        <group scale={50}>
            {fbx.children.map((child) => {
                if (child.isMesh) {
                    return applyMaterial(child);
                }
                return null;
            })}
        </group>
    );
}


const Underlay = () => {
    return (
        <Html>
            <div className="container">
                <div className="topLeftContent">
                    <p>MATT</p>
                    <p>PARK ARCHIVE</p>
                </div>
                <div className="bottomRightContent">
                    <p>STANDARD</p>
                    <p>MIXTURE OF</p>
                </div>
            </div>
        </Html>

    );
};
