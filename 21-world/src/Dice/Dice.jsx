/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 21-world/public/dice/dice.glb --transform --simplify 
Files: 21-world/public/dice/dice.glb [776.58KB] > /Users/matt/Desktop/code/what-i-love/dice-transformed.glb [42.16KB] (95%)
*/

import {
    useRef,
    useImperativeHandle,
    forwardRef,
    useEffect,
    useState,
    useMemo
} from 'react'
import { useGLTF, Text } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { ArrowArea } from '../Portfolio/ArrowArea'
import { suspend } from 'suspend-react'

const createAudio = async (url) => {
    const context = new (window.AudioContext || window.webkitAudioContext)()
    const gain = context.createGain()
    gain.connect(context.destination)

    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = await context.decodeAudioData(arrayBuffer)

    return { context, gain, buffer }
}
function DiceModel() {
    const { nodes, materials } = useGLTF('/dice/dice.glb')
    return (
        <group dispose={null} scale={0.2}>
            <mesh geometry={nodes.Cube_1.geometry} material={materials.Dot} />
            <mesh geometry={nodes.Cube_2.geometry} material={materials.Dice} />
            <mesh geometry={nodes.Cube_3.geometry} material={materials['Red Dot']} />
        </group>
    )
}

useGLTF.preload('/dice/dice.glb')

function getDieValue(rigidBody) {
    const rapierQuat = rigidBody.rotation();
    const rotation = new THREE.Quaternion(rapierQuat.x, rapierQuat.y, rapierQuat.z, rapierQuat.w);

    const faces = [
        new THREE.Vector3(0, 0, -1),  // Back face (11)
        new THREE.Vector3(0, 0, 1),   // Front face (66)
        new THREE.Vector3(0, -1, 0),  // Bottom face (26)
        new THREE.Vector3(0, 1, 0),   // Top face (55)
        new THREE.Vector3(-1, 0, 0),  // Left face (3)
        new THREE.Vector3(1, 0, 0)     // Right face (4)
    ];

    const faceValues = [1, 6, 2, 5, 3, 4];
    const worldUp = new THREE.Vector3(0, 1, 0);

    let maxDot = -Infinity;
    let maxIndex = 0;

    faces.forEach((face, index) => {
        const normal = face.clone().applyQuaternion(rotation);
        const dot = normal.dot(worldUp);
        if (dot > maxDot) {
            maxDot = dot;
            maxIndex = index;
        }
    });

    return faceValues[maxIndex];
}


// ─── DICE ROLLER (Two Dice with Physics) ─────────────────────────
// We wrap our two dice in Rapier RigidBodies and expose a rollDice() method.
export const DiceRoller = forwardRef((props, ref) => {
    const dice1 = useRef()
    const dice2 = useRef()
    const [isResting, setIsResting] = useState(false)
    const restingCounter = useRef(0)
    const lastTotal = useRef(0)
    const { context, gain, buffer } = suspend(
        () => createAudio('./dice/dice-jackpot.mp3'),
        ['dice/dice-jackpot.mp3']
    )
    const audioContextRef = useRef()
    const rollSourceRef = useRef(null);

    const { context: rollContext, gain: rollGain, buffer: rollBuffer } = suspend(
        () => createAudio('./dice/dice-roll.mp3'),
        ['dice/dice-roll.mp3']
    );


    // Define safe spawn positions outside the component for better control
    const SAFE_SPAWN1 = useMemo(() => new THREE.Vector3(-32.6, 2, 0), [])
    const SAFE_SPAWN2 = useMemo(() => new THREE.Vector3(-31.1, 2, 0), [])


    useEffect(() => {
        audioContextRef.current = context;
        return () => {
            context.close();
            rollContext.close();
        }
    }, [context, rollContext]);
    // Velocity check parameters
    const VELOCITY_THRESHOLD = 0.1
    const ANGULAR_THRESHOLD = 0.1
    const REQUIRED_REST_FRAMES = 15

    // Helper function to calculate vector magnitude
    const vectorMagnitude = (vec) => {
        return Math.sqrt(vec.x ** 2 + vec.y ** 2 + vec.z ** 2)
    }

    useFrame(() => {
        if (!dice1.current || !dice2.current) return
        const resetDiePosition = (dieRef, safePosition) => {
            if (dieRef.current.translation().y < -5) {
                dieRef.current.setTranslation(safePosition, true)
                dieRef.current.setLinvel({ x: 0, y: 0, z: 0 })
                dieRef.current.setAngvel({ x: 0, y: 0, z: 0 })
            }
        }
        // Get current velocities
        const linvel1 = dice1.current.linvel()
        const angvel1 = dice1.current.angvel()
        const linvel2 = dice2.current.linvel()
        const angvel2 = dice2.current.angvel()

        // Calculate movement magnitudes
        const isDice1Resting =
            vectorMagnitude(linvel1) < VELOCITY_THRESHOLD &&
            vectorMagnitude(angvel1) < ANGULAR_THRESHOLD

        const isDice2Resting =
            vectorMagnitude(linvel2) < VELOCITY_THRESHOLD &&
            vectorMagnitude(angvel2) < ANGULAR_THRESHOLD
        if (isDice1Resting && isDice2Resting) {
            restingCounter.current += 1
            if (restingCounter.current >= REQUIRED_REST_FRAMES && !isResting) {
                const value1 = getDieValue(dice1.current)
                const value2 = getDieValue(dice2.current)
                const total = value1 + value2

                if (total !== lastTotal.current) {
                    lastTotal.current = total

                    if (total > 8) {
                        const source = context.createBufferSource()
                        source.buffer = buffer
                        source.connect(gain)
                        source.start(0)
                    }
                }
                setIsResting(true)
            }
        } else {
            restingCounter.current = 0
            setIsResting(false)
        }

        resetDiePosition(dice1, SAFE_SPAWN1)
        resetDiePosition(dice2, SAFE_SPAWN2)

    })

    useImperativeHandle(ref, () => ({
        rollDice: () => {
            if (audioContextRef.current?.state === 'suspended') {
                audioContextRef.current.resume()
            }
            // Stop any existing rolling sound
            if (rollSourceRef.current) {
                rollSourceRef.current.stop();
                rollSourceRef.current = null;
            }

            // Play new rolling sound
            const source = rollContext.createBufferSource();
            source.buffer = rollBuffer;
            source.connect(rollGain);
            source.start(0);
            rollSourceRef.current = source;


            restingCounter.current = 0
            setIsResting(false)
            lastTotal.current = 0

            // Replace the original impulse/torque definitions with these:
            const impulse1 = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(0.1),  // Horizontal impulse: from -0.1 to 0.1
                THREE.MathUtils.randFloat(0.2, 0.4),     // Vertical impulse: between 0.2 and 0.3
                THREE.MathUtils.randFloatSpread(0.1)
            )
            const torque1 = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(0.1),
                THREE.MathUtils.randFloatSpread(0.1),
                THREE.MathUtils.randFloatSpread(0.1)
            )
            const impulse2 = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(0.1),
                THREE.MathUtils.randFloat(0.2, 0.4),
                THREE.MathUtils.randFloatSpread(0.1)
            )
            const torque2 = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(0.1),
                THREE.MathUtils.randFloatSpread(0.1),
                THREE.MathUtils.randFloatSpread(0.1)
            )

            // Apply the impulses to each dice.
            dice1.current.applyImpulse(impulse1, true)
            dice1.current.applyTorqueImpulse(torque1, true)
            dice2.current.applyImpulse(impulse2, true)
            dice2.current.applyTorqueImpulse(torque2, true)
        }
    }))

    return (
        <>
            <RigidBody
                ref={dice1}
                colliders="cuboid"
                position={[-32.6, 2, 0]} // adjust starting positions as needed
                restitution={0.05}
                rotation={[Math.PI / 2, 0, 0]}
                friction={2.}

            >
                <DiceModel />
            </RigidBody>
            <RigidBody
                ref={dice2}
                colliders="cuboid"
                position={[-31.1, 2, 0]}
                rotation={[0., Math.PI / 2, Math.PI / 2]}
                restitution={0.05}
                friction={2.}
            >
                <DiceModel />
            </RigidBody>
        </>
    )
})


export function DiceSign(props) {
    const { nodes, materials } = useGLTF('/dice/dice-sign.glb')
    return (
        <RigidBody
            colliders="cuboid"
            restitution={0.1}
            friction={1.}
            type='fixed'
        >
            <group {...props} dispose={null}>
                <mesh geometry={nodes.Sign11_1.geometry} material={materials['Dark Wood.002']} />
                <mesh geometry={nodes.Sign11_2.geometry} material={materials.wood} />
            </group>
        </RigidBody>
    )
}

useGLTF.preload('/dice/dice-sign.glb')


export function Plate(props) {
    const { nodes, materials } = useGLTF('./dice/plate.glb')
    return (
        <RigidBody
            colliders="trimesh"
            position={[-32., 0.8, -0.3]} // adjust starting positions as needed
            restitution={0.1}
            friction={1.}
            type='fixed'
        >
            <group {...props} dispose={null}>
                <mesh geometry={nodes.asiete__0.geometry} material={materials['Scene_-_Root']} rotation={[-Math.PI / 2, 0, 0]} scale={0.6} />
            </group>

        </RigidBody>
    )
}

useGLTF.preload('./dice/plate.glb')


// ─── OPTIONAL: If you want this file to be the dice entry point ───
export default function Dice() {
    const diceRef = useRef()

    return (
        <>
            <DiceRoller ref={diceRef} />
            <ArrowArea
                position={[-25.5, 0, 0]}
                onSpace={() => diceRef.current.rollDice()}  // trigger dice roll
                text="ROLL IT"
                isInstructionBox={false}
                textPosition={[-6.2, 0.38, 2.8]}
                borderPlaneSize={[1.5, 1.5]}
                fenceSize={[1.5, 2.0, 1.5]}
            />
            <Plate scale={1.5} />
            <DiceSign position={[-35.5, -0.5, 1.5]} scale={120} rotation={[0, 0.3, 0]} />
            <Text
                font="./fonts/m6x11plus.ttf"
                fontSize={0.2}
                color="black"
                position={[-35.4, 1.65, 1.56]}
                letterSpacing={-0.04}
                anchorX="center"
                anchorY="middle"
                rotation={[0, 0.3, 0]}
            >

                {"ROLL 8 OR HIGHER\n (WITH SOUND ON)"}
            </Text>

        </>

    )


}