import { ArrowArea } from '../Portfolio/ArrowArea'
import { Text, Text3D, useGLTF } from "@react-three/drei";

export default function Bio({ characterRef }) {
    const handleDownloadResume = () => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = './about-me/resume.pdf'; // Update this path
        link.download = 'Matt(Chagnhyun)_Park_Resume.pdf'; // Set the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


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
                onSpace={handleDownloadResume}

            />
        </group>
    )
}

function SingleLineBio({ bioName,
    bioNamePosition,
    enterancePosition,
    characterRef,
    instructionBoxOffset,
    onSpace
}) {
    return (
        <>
            <BioName name={bioName} position={bioNamePosition} />
            <BioEntrance
                enterancePosition={enterancePosition}
                characterRef={characterRef}
                instructionBoxOffset={instructionBoxOffset}
                onSpace={onSpace}
            />
        </>
    )
}

function BioName({ name, position }) {
    return (
        <Text
            font="./fonts/m6x11plus.ttf"
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

function BioEntrance({ enterancePosition, characterRef, instructionBoxOffset, onSpace }) {
    return (
        <ArrowArea
            position={enterancePosition}
            borderPlaneSize={[1.8, 0.6]}
            fenceSize={[1.8, 2.0, 0.6]}
            borderWidthHorizontal={0.03}
            borderWidthVertical={0.1}
            isInstructionBox={true}
            instructionBoxOffset={instructionBoxOffset}
            characterRef={characterRef}
            onSpace={onSpace}
        />
    )
}