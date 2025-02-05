
import { useEffect, useRef, useMemo } from 'react';

// components
import Ground from './Environment/Ground';
import Grass from './Environment/Grass/Grass';
import MattText from './Environment/Text/MattText'
import Sign from './Environment/Sign';
import PathRocks from './Environment/Rocks/PathRocks';
import Osmosis from './Portfolio/osmosis';


export default function EnvironmentSettings() {
    return (
        <>
            <Ground />
            <MattText />
            <Sign />
            <PathRocks />
            <Osmosis />
        </>
    );
}
