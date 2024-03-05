import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF, ScrollControls, useScroll, useHelper } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, forwardRef } from 'react';
import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';


const rsqw = (t, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) => (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)


export default function Experience(props) {
    // light helpers
    const rectLight = useRef()
    // useHelper(rectLight, RectAreaLightHelper, 2)

    const { width, height } = useThree((state) => state.viewport)
    const scroll = useScroll()

    const mac = useRef()
    const macGroup = useRef()

    useFrame((state, delta) => {
        const r1 = scroll.range(0 / 4, 1 / 4)
        const r2 = scroll.range(1 / 4, 3 / 4)
        const r3 = scroll.visible(4 / 5, 1 / 5)

        // Invert the scaling factor by subtracting from the base scale.
        const baseScale = 1;
        mac.current.rotation.x = Math.PI - (Math.PI / 2) * rsqw(r1)
        var scale = baseScale - 0.4 * (1 - rsqw(r1)) + 0.1;

        macGroup.current.scale.x = macGroup.current.scale.y = macGroup.current.scale.z =
            THREE.MathUtils.damp(macGroup.current.scale.x, scale, 4, delta);

        if (r1 < 1) {
            macGroup.current.rotation.y = THREE.MathUtils.damp(macGroup.current.rotation.y, -Math.PI * r1, 4, delta)
        } else {
            const offset = -Math.PI;
            macGroup.current.rotation.y = THREE.MathUtils.damp(macGroup.current.rotation.y, offset + (-Math.PI * r2), 4, delta)
        }
    })

    return <>
        <Environment preset='city' />
        <color args={['#241a1a']} attach="background" />

        <PresentationControls
            global
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
        >
            <Float rotationIntensity={0.4}>

                <group ref={macGroup} >
                    <rectAreaLight
                        ref={rectLight}
                        width={2.5}
                        height={1.65}
                        intensity={75}
                        color={'#ff6900'}
                        rotation={[Math.PI / 2, Math.PI, 0]}
                        // position={[0, 1.55, -1.15]}
                        position={[0, 1, 1]}
                    />
                    <Mac ref={mac} position-y={-0.5} />
                </group>
            </Float>
            {/* <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={1}
                position={[1.5, 0.95, 0.75]}
                rotation-y={-1.25}
                textAlign='center'
            >Osmosis </Text> */}
        </PresentationControls>

        <ContactShadows
            position-y={-1.4}
            opacity={0.4}
            scale={5}
            blur={2.4}
        />

    </>
}

const Mac = forwardRef(({ ...props }, ref) => {
    const { nodes, materials } = useGLTF("/macbook.gltf");
    return <group {...props} dispose={null} scale={0.103}>
        {/* bottom part */}
        <group >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle001.geometry}
                material={materials["Frame.001"]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle001_1.geometry}
                material={materials["Frame.001"]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle001_2.geometry}
                material={materials.HeadPhoneHole}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle001_3.geometry}
                material={materials.USB_C_INSIDE}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle001_4.geometry}
                material={materials["Frame.001"]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle001_5.geometry}
                material={materials.TouchbarBorder}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle001_6.geometry}
                material={materials.Keyboard}
            />
            <group position={[0, -0.509, 0]} scale={5.796}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle006.geometry}
                    material={materials["Frame.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle006_1.geometry}
                    material={materials.USB_C_INSIDE}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.FrontCameraRing001.geometry}
                material={materials["CameraRIngBlack.002"]}
                position={[-0.155, 19.571, -16.151]}
                scale={5.796}
            />
            <group position={[-11.786, -0.15, -8.301]} scale={5.796}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle.geometry}
                    material={materials["Keyboard.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle_1.geometry}
                    material={materials.Key}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle_2.geometry}
                    material={materials.Touchbar}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.KeyboardKeyHole.geometry}
                material={materials["Keyboard.001"]}
                position={[-11.786, -0.152, -8.301]}
                scale={5.796}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.RubberFoot.geometry}
                material={materials.DarkRubber}
                position={[-11.951, -0.751, 7.857]}
                scale={5.796}
            />
            <group position={[0.011, -0.211, -10.559]} scale={5.796}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle012.geometry}
                    material={materials.HingeBlack}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle012_1.geometry}
                    material={materials.HingeMetal}
                />
            </group>
            <group position={[-15.026, 0.031, 0.604]} scale={5.796}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle009.geometry}
                    material={materials["Frame.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle009_1.geometry}
                    material={materials.SpeakerHole}
                />
            </group>
            <group position={[12.204, 0.031, 0.604]} scale={5.796}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle003.geometry}
                    material={materials["Frame.001"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Circle003_1.geometry}
                    material={materials.SpeakerHole}
                />
            </group>
        </group>

        {/* top part */}
        <group
            position={[0.007, -0.472, -10.412]}
            rotation={[1.311, 0, 0]}
            scale={5.796}
            ref={ref}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle002.geometry}
                material={materials["Frame.001"]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle002_1.geometry}
                material={materials.Screen}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle002_2.geometry}
                material={materials.ScreenGlass}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle002_3.geometry}
                material={materials.Rubber}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle002_4.geometry}
                material={materials.DisplayGlass}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.AppleLogo000.geometry}
                material={materials["AppleLogo.004"]}
                position={[0.005, -0.111, -1.795]}
                rotation={[-Math.PI, 0, -Math.PI]}
                scale={0.579}
            />
        </group>
    </group>
})