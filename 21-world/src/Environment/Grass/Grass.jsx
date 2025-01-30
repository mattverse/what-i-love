import { useMemo } from 'react';

import GrassShort from './GrassShort';
import GrassTall from './GrassTall';



export default function Grass() {


    // Predefined arrays for short and tall grass positions
    const shortGrassPositions = useMemo(() => [
        [0, 1]
    ], []);

    const tallGrassPositions = useMemo(() => [
        [0, 0]
    ], []);

    // Function to generate short grass
    const generateShortGrass = useMemo(() => {
        return (positionsArray, baseScale = 0.5) => {
            return positionsArray.map(([x, z], i) => (
                <GrassShort
                    key={`short-grass-${x}-${z}-${i}`}
                    position={[x, -0.2, z]}
                    scale={baseScale}
                />
            ));
        };
    }, []);

    // Function to generate tall grass
    const generateTallGrass = useMemo(() => {
        return (positionsArray, baseScale = 0.7) => {
            return positionsArray.map(([x, z], i) => (
                <GrassTall
                    key={`tall-grass-${x}-${z}-${i}`}
                    position={[x, -0.2, z]}
                    scale={baseScale}
                />
            ));
        };
    }, []);


    return <>
        {/* Generate short and tall grass separately */}
        {generateShortGrass(shortGrassPositions, 1)}
        {generateTallGrass(tallGrassPositions, 1)}
    </>
}