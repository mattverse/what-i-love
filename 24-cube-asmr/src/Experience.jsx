import { OrbitControls } from '@react-three/drei';
import Lights from './Lights';
import { useMemo, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export default function Experience() {
    const audioContextRef = useRef(null);
    const [audioBuffer, setAudioBuffer] = useState(null);

    useEffect(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;

        fetch('./bubble-sound.mp3')
            .then(response => response.arrayBuffer())
            .then(data => audioContext.decodeAudioData(data))
            .then(decodedBuffer => setAudioBuffer(decodedBuffer));

        return () => audioContext.close();
    }, []);

    const playSound = () => {
        if (audioBuffer && audioContextRef.current) {
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);
            source.start();
        }
    };

    const boxes = useMemo(() => {
        const items = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                items.push({ x: i * 1.1 - 5, z: j * 1.1 - 5 });
            }
        }
        return items;
    }, []);

    const meshRefs = useRef([]);

    const handleHover = (index) => {
        if (meshRefs.current[index]) {
            gsap.to(meshRefs.current[index].scale, {
                duration: 0.2,
                x: 0.3,
                y: 0.3,
                z: 0.3,
                ease: "power2.out"
            });
            playSound();
        }
    };

    const handleHoverOut = (index) => {
        if (meshRefs.current[index]) {
            gsap.to(meshRefs.current[index].scale, {
                duration: 0.2,
                x: 1,
                y: 1,
                z: 1,
                ease: "power2.out"
            });
        }
    };

    return (
        <>
            <color args={['black']} attach="background" />

            <OrbitControls makeDefault />
            <Lights />

            {boxes.map((position, index) => (
                <mesh
                    key={index}
                    position={[position.x, 0, position.z]}
                    ref={(el) => (meshRefs.current[index] = el)}
                    onPointerOver={() => handleHover(index)}
                    onPointerOut={() => handleHoverOut(index)}
                >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial color="white" roughness={0.75} flatShading />
                </mesh>
            ))}
        </>
    );
}
