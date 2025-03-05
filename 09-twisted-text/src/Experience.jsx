import { Environment, OrbitControls, useGLTF, MeshTransmissionMaterial, RandomizedLight, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import Lights from './Lights.jsx'
import { forwardRef, useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'



export default function Experience() {
    const [textColor, setTextColor] = useState("#BCFD55") // default color is midnight purple
    const [backgroundColor, setBackgroundColor] = useState('#FE5D27') // default color is midnight purple

    const ribbon = useRef()
    const ribbon2 = useRef()
    const ribbon3 = useRef()

    useFrame((state, delta) => {
        ribbon.current.rotation.x += delta * 0.5
        ribbon2.current.rotation.x += delta * 0.5
        ribbon3.current.rotation.x += delta * 0.5
    })
    return <>

        <color args={['#000000']} attach="background" />
        <OrbitControls makeDefault />

        <Lights />
        <ambientLight />

        <Ribbon ref={ribbon} position={[10, 4, -10]} textColor={textColor} backgroundColor={backgroundColor} />
        <Ribbon ref={ribbon2} position={[10, 1, -10]} />
        <Ribbon ref={ribbon3} position={[10, -2, -10]} />

        <Button setTextColor={setTextColor} setBackgroundColor={setBackgroundColor} />

    </>
}

// pass in position as props
const Ribbon = forwardRef(({ textColor, backgroundColor, ...props }, ref) => {
    const { nodes, materials } = useGLTF("/twist-blue-orange.glb");

    useEffect(() => {
        if (textColor && materials.Text) {
            materials.Text.color = new THREE.Color(textColor)
        }
    }, [textColor, materials.Text])

    useEffect(() => {
        if (backgroundColor && materials.Base) {
            materials.Base.color = new THREE.Color(backgroundColor)
        }
    }, [backgroundColor, materials.Base])

    const config = useControls({
        roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
        thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
        ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
        chromaticAberration: { value: 1, min: 0, max: 1 },
        anisotropy: { value: 1, min: 0, max: 1, step: 0.01 },
        clearcoat: { value: 1, min: 0, max: 1 },
        attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
        attenuationColor: '#ffffff',
        color: '#b4b4b4',
        bg: '#1600ff'
    })

    return <group dispose={null} scale={[0.8, 0.8, 0.8]}  {...props} ref={ref}>
        <group scale={[6, 1, 1]}>
            <mesh
                geometry={nodes.Cube001.geometry}
            // material={materials.Base}
            >
                <MeshTransmissionMaterial
                    // background={materials.Base.color}
                    background={new THREE.Color(config.bg)}
                    samples={10}
                    resolution={2048}
                    transmission={1}

                    {...config} />
            </mesh>

            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001_1.geometry}
                material={materials.Text}
            // material={textMaterial}
            />
        </group>
    </group>
})

const Button = ({ setTextColor, setBackgroundColor }) => {
    return <Html>
        {/* <button onClick={() => {
            setTextColor("#FE5D27")
            setBackgroundColor("#2A0241")

        }} >
            Midnight Purple
        </button>
        <button onClick={() => {
            setTextColor("#2A0241")
            setBackgroundColor("#BCFD55")
        }
        } >
            Lime
        </button>
        <button onClick={() => {
            setTextColor("#BCFD55")
            setBackgroundColor("#F1008B")
        }
        } >
            Fuchsia
        </button>
        <button onClick={() => {
            setTextColor("#BCFD55")
            setBackgroundColor("#FE5D27")
        }
        } >
            Orange
        </button> */}
    </Html>
}

useGLTF.preload("/twist-blue-orange.glb");

