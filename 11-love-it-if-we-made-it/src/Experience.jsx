import * as THREE from 'three'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Text, TrackballControls } from '@react-three/drei'

export default function Experience() {
    return <>
        <fog attach="fog" args={['#252324', 70, 120]} />

        <Suspense fallback={null}>
            <group
                rotation={[10, 10.5, 10]}
                position={[0, -20, 0]}
            >
                <World count={8} radius={20} />
                <TrackballControls
                    target={[0, -20, 0]}
                />
            </group>
        </Suspense>

    </>
}

const disappearing = ['information', 'honesty', 'books', 'conversation', 'tears', 'happiness', 'depth', 'repetition', 'trust'];
const appearing = ['religion', 'masturbation', 'dopamine', 'pandemic', 'individualism', 'degradation', 'controversion', 'heroin', 'racism', 'shorts', 'reels'];
function World({ count = 4, radius = 20 }) {
    const words = useMemo(() => {
        const combinedWords = [...disappearing.map(word => ({ word, type: 'disappearing' })), ...appearing.map(word => ({ word, type: 'appearing' }))];
        const temp = [];
        const spherical = new THREE.Spherical();
        const phiSpan = Math.PI / (count + 1);
        const thetaSpan = (Math.PI * 2) / count;
        for (let i = 1; i < count + 1; i++)
            for (let j = 0; j < count; j++) {
                const wordIndex = (i - 1) * count + j;
                const wordInfo = combinedWords[wordIndex % combinedWords.length];
                temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), wordInfo.word, wordInfo.type]);
            }
        return temp;
    }, [count, radius]);
    return words.map(([pos, word, type], index) => <Word key={index} position={pos} word={word} type={type} />)
}

function Word({ word, type, ...props }) {
    const color = new THREE.Color();
    const fontProps = { font: '/Inter-Bold.woff', fontSize: 1.7, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false };
    const ref = useRef();
    const [hovered, setHovered] = useState(false);
    const over = (e) => (e.stopPropagation(), setHovered(true));

    useEffect(() => {
        if (hovered) document.body.style.cursor = 'pointer';
        else document.body.style.cursor = 'auto';
    }, [hovered]);
    useFrame(() => {
        ref.current.material.color.lerp(color.set(hovered ? (type === 'disappearing' ? '#fb41c7' : '#83fb9e') : '#252324'), 0.1);
    });
    return (
        <Billboard {...props}>
            <Text ref={ref} onPointerOver={over} onClick={() => console.log(`${word} clicked`)} {...fontProps} children={word} />
        </Billboard>
    )
}