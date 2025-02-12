import * as THREE from 'three';
import { useLayoutEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Image, ScrollControls, useScroll, Billboard, Text } from '@react-three/drei';
import { easing, geometry } from 'maath';
import './util'


extend(geometry);

const PortfolioCards = () => (
    <Scene position={[0, 1.5, 0]} scale={0.2} />
);

function Scene(props) {
    const ref = useRef();
    const scroll = useScroll();
    const [hovered, setHovered] = useState(null);


    return (
        <group ref={ref} {...props}>
            <Cards
                count={14}
                radius={3}
                hovered={hovered}
                setHovered={setHovered}
            />
            <ActiveCard hovered={hovered} />
        </group>
    );
}

function Cards({ count, radius, hovered, setHovered }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => {
                const angle = (i / count) * Math.PI * 2;
                return (
                    // <Card
                    //     key={i}
                    //     onPointerOver={() => setHovered(i)}
                    //     onPointerOut={() => setHovered(null)}
                    //     position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
                    //     rotation={[0, Math.PI / 2 + angle, 0]}
                    //     active={hovered !== null}
                    //     hovered={hovered === i}
                    //     url={`/portfolio/${i + 1}.png`}
                    // />
                    <Card
                        key={i}
                        url={`/portfolio/${i + 1}.png`}
                        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
                        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
                    />
                );
            })}
        </>
    );
}

function Card({ url, ...props }) {
    const ref = useRef()
    const [hovered, hover] = useState(false)
    const pointerOver = (e) => (e.stopPropagation(), hover(true))
    const pointerOut = () => hover(false)
    useFrame((state, delta) => {
        easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
        easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
        easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
    })
    return (
        <Image ref={ref} url={url} transparent side={THREE.DoubleSide} onPointerOver={pointerOver} onPointerOut={pointerOut} {...props}>
            <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
        </Image>
    )
}

// function Card({ url, active, hovered, ...props }) {
//     const ref = useRef();
//     useFrame((_, delta) => {
//         const f = hovered ? 1.4 : active ? 1.25 : 1;
//         easing.damp3(ref.current.position, [0, hovered ? 0.25 : 0, 0], 0.1, delta);
//         easing.damp3(ref.current.scale, [1.618 * f, 1 * f, 1], 0.15, delta);
//     });

//     return (
//         <group {...props}>
//             <Image ref={ref} transparent radius={0.075} url={url} scale={[1.618, 1, 1]} side={THREE.DoubleSide} />
//         </group>
//     );
// }

function ActiveCard({ hovered }) {
    const ref = useRef();

    useLayoutEffect(() => {
        if (ref.current) {
            ref.current.material.zoom = 0.8;
        }
    }, [hovered]);

    useFrame((_, delta) => {
        if (!ref.current) return;
        easing.damp(ref.current.material, 'zoom', 1, 0.5, delta);
        easing.damp(ref.current.material, 'opacity', hovered !== null ? 1 : 0, 0.3, delta);
    });

    return (
        <Billboard>
            {hovered !== null && (
                <Image
                    ref={ref}
                    transparent
                    radius={0.3}
                    position={[0, 1.5, 0]}
                    scale={[3.5, 1.618 * 3.5, 0.2, 1]}
                    url={`/portfolio/${hovered + 1}.png`}
                />
            )}
        </Billboard>
    );
}

export default PortfolioCards;