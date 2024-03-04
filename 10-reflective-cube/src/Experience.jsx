
import { useLoader, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import { Environment, Center, MeshTransmissionMaterial, Text, } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


export default function Experience() {

    return <>
        <color args={['white']} attach={"background"} />
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr" blur={10} />

        <mesh
            position={[0, 0, -5]}
            scale={20}
        >
            <meshBasicMaterial color={"white"} />
            <planeGeometry />
        </mesh>

        <EffectComposer disableNormalPass >
            <Bloom
                luminanceThreshold={14}
                intensity={6.5}
            />
            <Suspense fallback={null}>
                <FBXModel position={[2, -0.6, 0]} rotation={[Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2]} url="chamfercube.fbx" />
                <FBXModel position={[-2, 0.6, 0]} rotation={[Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2]} url="chamfercube.fbx" />
            </Suspense>
        </EffectComposer>


        {/* we can't use underlay here since we need the reflection to happen based on our material */}
        <CustomText position={[-4.7, 3, -5]} bold >MATT</CustomText>
        <CustomText position={[-2.2, 1.8, -5]} bold>PARK ARCHIVE</CustomText>
        <CustomText position={[2.5, 0.2, -5]} >STANDARD</CustomText>
        <CustomText position={[2.96, -1, -5]}>MIXTURE OF</CustomText>
        <CustomText position={[3.07, -2.2, -5]}>EXPRESSION</CustomText>

        <mesh position={[-3.4, -1.2, -5]}>
            <circleGeometry args={[2.1, 60]} />
            <meshBasicMaterial color={'#2400FF'} />
        </mesh>
    </>
}

function CustomText({ position, children, bold = false }) {
    // Use ternary operator to determine the font style
    const fontWeight = bold ? '/bold.ttf' : '/regular.ttf';

    return (
        <Text
            position={position}
            color={"black"}
            font={fontWeight}
            scale={1}
        >
            {children}
        </Text>
    );
}


function FBXModel({ url, position, rotation }) {
    const fbx = useLoader(FBXLoader, url);
    const modelRef = useRef(); // Reference to the mesh/group

    const targetRotation = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        modelRef.current.rotation.y += delta * 0.5
        const { x, y } = state.pointer;
        modelRef.current.rotation.y = x * Math.PI; // Rotate around Y axis based on mouse X
        modelRef.current.rotation.x = -y * Math.PI;


        // Dampen the rotation by interpolating towards the target rotation
        modelRef.current.rotation.y += (targetRotation.current.y - modelRef.current.rotation.y) * delta * 5; // Adjust the 5 for more/less damping
        modelRef.current.rotation.x += (targetRotation.current.x - modelRef.current.rotation.x) * delta * 5; // Adjust the 5 for more/less damping
    })


    // This function will be called for each mesh in the FBX model
    const applyMaterial = (child) => {
        return (
            <>
                <Center>
                    <mesh
                        ref={modelRef}
                        key={child.id}
                        scale={[0.035, 0.035, 0.035]}
                    >
                        <boxGeometry />
                        <MeshTransmissionMaterial
                            roughness={0}
                            transmission={1}
                            thickness={0.8}
                            iridescence={1}
                            clearcoat={1}
                            clearcoatRoughness={0.1}
                            iridescenceIOR={0.7}
                            chromaticAberration={0.1}
                            background={"white"}
                        />
                    </mesh>
                </Center>
            </>
        );
    };

    return (
        <group scale={50}
            position={position}
            rotation={rotation}
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

// useEffect(() => {
//     const handleMouseMove = (event) => {
//         // Update cursor position state
//         const x = (event.clientX / window.innerWidth) * 2 - 1;
//         const y = -(event.clientY / window.innerHeight) * 2 + 1;

//         console.log(x)
//     }

//     window.addEventListener('mousemove', handleMouseMove);

//     // Clean up
//     return () => {
//         window.removeEventListener('mousemove', handleMouseMove);
//     };
// }, []);