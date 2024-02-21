import * as THREE from 'three'
import { useRef, forwardRef, useDeferredValue, useState, useEffect, useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import {
    Clouds, MotionPathControls, useMotion, useTexture, OrbitControls, MeshWobbleMaterial, Gltf, Float, Environment, CameraControls,
    ScrollControls, useScroll, Scroll, AsciiRenderer, Html
} from '@react-three/drei'

import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

import { EffectComposer, TiltShift2, HueSaturation, DotScreen } from '@react-three/postprocessing'
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';

// import { createGlobalStyle } from 'styled-components';

// import AsciiRenderer from "./AsciiRender";

import { useControls } from 'leva'

export default function Experience() {
    const [offSet, setOffSet] = useState(0)

    const data = useScroll()
    useFrame((state, delta) => {
        // scrolling animation
        const newYPosition = -data.offset * 30;
        state.camera.position.setY(newYPosition)
        setOffSet(data.offset)
        // console.log(data.offset);
        // state.camera.updateProjectionMatrix()
    })

    const currentPage = useMemo(() => {
        // Assuming you have two pages. Adjust this logic based on your actual number of pages and their layout.
        // This calculation assumes each page takes up the same amount of vertical space.
        return Math.round(data.offset * 3); // Adjust the multiplier (2 in this case) based on your total number of pages.
    }, [offSet]);

    return (
        <>
            {/* <OrbitControls /> */}
            <color args={['black']} attach="background" />

            <ambientLight intensity={10} />
            <FirstPage position={[0, 0, 0]} />
            <SecondPage position={[0, -8, 0]} animate={currentPage === 1} />
        </>
    )
}


const FirstPage = ({ ...props }) => {
    const { float } = useControls({
        float: false,
    })

    return (
        <group {...props}>
            <Html
                position={[-5, 2.5, 0]}
            >
                <div>
                    <img src="./yukiha.png" alt="hello" style={{ width: '1800px', height: 'auto' }} />
                </div>
            </Html>
            {/* <Float floatIntensity={20} rotationIntensity={25} speed={float ? 1 : 0}>
                <Sticker scale={1} />
                <AsciiRenderer />
                <AsciiRenderer fgColor="white" bgColor="black" />
            </Float> */}
        </group>

    )
}

const Sticker = ({ ...props }) => {
    const { textureLoader } = useThree();

    // const [smiley, invert] = useTexture(['Hair_1.png', 'Hair_1.png'])
    const [smiley, invert] = useTexture(['Sticjer_1024x1024@2x.png', 'Sticjer_1024x1024@2x.png'])
    console.log(smiley)
    console.log(invert)

    return (
        <group {...props}>
            {/* <mesh position={[1, 0, 1]} {...props}>
                <planeGeometry args={[3, 1, 32, 32]} />
                <MeshWobbleMaterial
                    factor={2}
                    speed={1}
                />
            </mesh> */}
            {/* <mesh position={[3, 0, 1]} {...props}>
                <planeGeometry args={[1, 3, 32, 32]} />
                <MeshWobbleMaterial
                    factor={2}
                    speed={2}
                />
            </mesh> */}
            {/* <mesh position={[5, 0, -3]} {...props}>
                <planeGeometry args={[2, 1, 32, 32]} />
                <MeshWobbleMaterial
                    factor={2}
                    speed={1}
                />
            </mesh> */}

            <mesh
                position={[-3, 0, 0]}
            >
                <planeGeometry args={[1, 2, 32, 32]} />
                <MeshWobbleMaterial
                    factor={4}
                    depthTest={false}
                    transparent
                    map={smiley}
                    map-flipY={false}
                    roughness={1}
                    roughnessMap={invert}
                    roughnessMap-flipY={false}
                    map-anisotropy={16}
                    metalness={0.8}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
}


const SecondPage = ({ animate, ...props }) => {
    const [animatedText, setAnimatedText] = useState(`we're in 2070, where everyone has the "brain-chip" that they install in their own brain. Chips are installed once in the lifetime and cannot be removed throughout one's life.  the chip is kind of a booster that dramatically improves your intellecutal ability. Rich people buy themselves high-spec, privacy secured chips which are of course expensive. Poor people cannot afford ones, so they used to be much less intelligent than high-class aristocrats until government got them ones free. Why would governments affords poors the expensive brain chips? actually High-class bureaucrats were unsatisfied with the rich people prospering with their power grows day by day cause their own enormous capital goes bigger either. As their power got bigger, they started to refuse conforming with the government policy and rebel against centralized power of a dictator.`);
    const [titleText, setTitleText] = useState("2222Y"); // Initial state for the title text

    useEffect(() => {

        if (!animate) {
            return; // Exit if not the active page   
        }

        // Animation for the main text
        const originalText = animatedText;
        const array = originalText.split('');
        const special = ['~', '@', '!', '#', '$', '%', '^', '&', '*'];
        const exception = [' ', '\n', '.', ','];
        const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

        const numArray = array.map(() => random(5, 40));

        const textTimer = setInterval(() => {
            let completeCount = 0;
            let newText = '';
            numArray.forEach((num, i) => {
                if (exception.includes(array[i]) || numArray[i] === 0) {
                    newText += array[i];
                    completeCount += 1;
                } else {
                    newText += special[numArray[i] % special.length];
                    numArray[i] -= 1;
                }
            });

            setAnimatedText(newText);
            if (completeCount === numArray.length) clearInterval(textTimer);
        }, 100);

        // Animation for the title "2222Y"
        const titleOriginal = "2222Y".split('');
        let titleIndex = 0;

        const titleTimer = setInterval(() => {
            if (titleIndex < titleOriginal.length) {
                setTitleText(titleText => titleText.substr(0, titleIndex) + titleOriginal[titleIndex] + special[random(0, special.length - 1)]);
                titleIndex++;
            } else {
                clearInterval(titleTimer);
                setTitleText("2222Y"); // Reset to the original title after the animation
            }
        }, 150);

        return () => {
            clearInterval(textTimer);
            clearInterval(titleTimer); // Cleanup on component unmount
        };
    }, [animate]); // Empty dependency array means this effect runs once on mount

    return (
        <Html
            center
            // gets position as props
            {...props}
            style={{
                width: '800px', // This controls the width of the container
                height: '100%', // This ensures the container takes the full height it can
                display: 'flex',
                flexDirection: 'column', // This should align children (title and text) in a column
                alignItems: 'center', // This centers the items horizontally in the flex container
                justifyContent: 'center', // This centers the items vertically, but with 'flexDirection: column', it might not be needed
                position: 'absolute', // Ensure the Html container is positioned as intended
                top: '50%', // Adjust as necessary to position the container
                left: '50%',
                transform: 'translate(-50%, -50%)', // Centers the container both vertically and horizontally
            }}
            scale={10}
        >
            <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
            <div
                style={{
                    fontSize: '3em', // Ensures the title is larger
                    fontFamily: `'VT323', monospace`,
                    color: '#05d1e1',
                    letterSpacing: '0.1em',
                    filter: `drop-shadow(0 0 2px #e4d808)`,
                    marginBottom: '20px', // Creates space between the title and the main text
                }}
            >
                {titleText}
            </div>
            <h1
                style={{
                    textAlign: 'center',
                    fontFamily: `'VT323', monospace`,
                    color: '#05d1e1',
                    whiteSpace: 'pre-line',
                    letterSpacing: '0.1em',
                    fontSize: '1.5em',
                    filter: `drop-shadow(0 0 2px #e4d808)`

                }}
            >
                {animatedText}
            </h1>
        </Html >
    )
}