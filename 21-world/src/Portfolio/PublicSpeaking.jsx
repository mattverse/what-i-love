import { Suspense } from 'react'
import YoutubeSign from './YoutubeSign'
import { ArrowArea } from './ArrowArea'
import { useVideoTexture, useTexture, Text } from '@react-three/drei'


export default function PublicSpeaking({ }) {
    return (
        <>
            <Osmocon />
            <Gophercon />
            <IBCSummit />
        </>

    )
}
export function Osmocon({ }) {
    return (
        <>
            <group position={[0, 0, 1.]}>
                <YoutubeSign position={[-13.7, 2, -2]} />

                <VideoPlayer
                    position={[-13.7, 2., -1.9]}
                    fallBackPicture={"./portfolio/osmocon-fallback.png"}
                    videoLink={"./portfolio/osmocon.mov"}
                />
                <Text
                    font="./fonts/m6x11plus.ttf"
                    color={"black"}
                    lineHeight={0.8}
                    fontSize={0.5}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[-14.05, 0.4, -0.4]}
                >
                    {"OSMOCON 2023"}
                </Text>
                <Text
                    font="./fonts/m6x11plus.ttf"
                    color={"black"}
                    fontSize={0.3}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[-13.3, 0.4, 0.4]}
                >
                    {"\"ICNS (Interchain Name Service)\n and Off-chain signature verification\""}
                </Text>
            </group>

            <ArrowArea
                position={[-7.5, 0, 0]}
                link="https://www.youtube.com/watch?v=TQgHfYMTZ4A"
                text="VIEW FULL VIDEO"
                isInstructionBox={false}
                textPosition={[-6.7, 0.38, 3.]}
            />
        </>

    )
}

export function Gophercon({ }) {
    return (
        <>
            <group position={[0, 0, 1.]}>
                <YoutubeSign position={[-19.7, 2, -2]} />

                <VideoPlayer
                    position={[-19.7, 2., -1.9]}
                    fallBackPicture={"./portfolio/gophercon-fallback.png"}
                    videoLink={"./portfolio/gophercon.mov"}
                />
                <Text
                    font="./fonts/m6x11plus.ttf"
                    color={"black"}
                    lineHeight={0.8}
                    fontSize={0.5}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[-19.45, 0.4, -0.4]}
                >
                    {"GOPHERCON KOREA 2023"}
                </Text>
                <Text
                    font="./fonts/m6x11plus.ttf"
                    color={"black"}
                    fontSize={0.3}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[-19.5, 0.4, 0.4]}
                >
                    {"\"Creating Software Without Bugs\""}
                </Text>
            </group>

            <ArrowArea
                position={[-13.5, 0, 0]}
                link="https://www.youtube.com/live/8AUVKh0qJgU?t=15153s"
                text="VIEW FULL VIDEO"
                isInstructionBox={false}
                textPosition={[-6.7, 0.38, 3.]}
            />
        </>

    )
}

export function IBCSummit({ }) {
    return (
        <>
            <group position={[0, 0, 1.]}>
                <YoutubeSign position={[-25.7, 2, -2]} />

                <VideoPlayer
                    position={[-25.7, 2., -1.9]}
                    fallBackPicture={"./portfolio/ibc-summit-fallback.png"}
                    videoLink={"./portfolio/ibc-summit.mov"}
                />
                <Text
                    font="./fonts/m6x11plus.ttf"
                    color={"black"}
                    lineHeight={0.8}
                    fontSize={0.5}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[-25.85, 0.4, -0.4]}
                >
                    {"IBC SUMMIT 2022"}
                </Text>
                <Text
                    font="./fonts/m6x11plus.ttf"
                    color={"black"}
                    fontSize={0.3}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[-26.1, 0.4, 0.4]}
                >
                    {"\"Intro to COSMOS SDK\""}
                </Text>
            </group>

            <ArrowArea
                position={[-19.5, 0, 0]}
                link="https://www.youtube.com/watch?v=HKQ_f2gDyec"
                text="VIEW FULL VIDEO"
                isInstructionBox={false}
                textPosition={[-6.7, 0.38, 3.]}
            />
        </>

    )
}

export function VideoPlayer({ fallBackPicture, videoLink, ...props }) {
    return (
        <mesh {...props} scale={[3.9, 1.9, 1]}>
            <planeGeometry />
            <Suspense fallback={<FallbackMaterial url={fallBackPicture} />}>
                <VideoMaterial url={videoLink} />
            </Suspense>
        </mesh>
    )
}

function VideoMaterial({ url }) {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false} />
}

function FallbackMaterial({ url }) {
    const texture = useTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false} />
}
