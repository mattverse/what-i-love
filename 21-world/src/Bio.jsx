import { ArrowArea } from './Portfolio/ArrowArea'
import { Text, Text3D, useGLTF } from "@react-three/drei";

export default function Bio({ characterRef }) {
    return (
        <group position={[-0.3, 0, 0.5]}>
            <SingleLineBio
                bioName={"GitHub"} bioNamePosition={[3.5, 0.4, -2.]}
                enterancePosition={[11.5, 0.1, -4.8]}
                characterRef={characterRef}
                instructionBoxOffset={[-13.1, 2., 3.]}
            />
            <SingleLineBio
                bioName={"LinkedIn"} bioNamePosition={[3.6, 0.4, -1.]}
                enterancePosition={[11.5, 0.1, -3.7]}
                characterRef={characterRef}
                instructionBoxOffset={[-13.1, 2., 2.]}
            />
            <SingleLineBio
                bioName={"Download\nResume"} bioNamePosition={[3.65, 0.4, 0]}
                enterancePosition={[11.5, 0.1, -2.6]}
                characterRef={characterRef}
                instructionBoxOffset={[-13.1, 2., 1.]}
            />
        </group>
    )
}

function SingleLineBio({ bioName, bioNamePosition, enterancePosition, characterRef, instructionBoxOffset }) {
    return (
        <>
            <BioName name={bioName} position={bioNamePosition} />
            <BioEntrance
                enterancePosition={enterancePosition}
                characterRef={characterRef}
                instructionBoxOffset={instructionBoxOffset}
            />
        </>
    )
}

function BioName({ name, position }) {
    return (
        <Text
            font="./m6x11plus.ttf"
            color={"black"}
            lineHeight={0.8}
            scale={0.3}
            rotation={[-Math.PI / 2, 0, 0]}
            position={position}
        >
            {name}
        </Text>
    )
}

function BioEntrance({ enterancePosition, characterRef, instructionBoxOffset }) {
    return (
        <ArrowArea
            position={enterancePosition}
            borderPlaneSize={[1.8, 0.6]}
            fenceSize={[1.8, 2.0, 0.6]}
            borderWidthHorizontal={0.03}
            borderWidthVertical={0.1}
            textAfterImage="to enter"
            isInstructionBox={true}
            instructionBoxOffset={instructionBoxOffset}
            characterRef={characterRef}
        />
    )
}