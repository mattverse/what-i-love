
import { useEffect, useRef, useMemo } from 'react';

// components
import Ground from './Environment/Ground';
import Grass from './Environment/Grass/Grass';
import MattText from './Environment/Text/MattText'
import Sign from './Environment/Sign';


export default function EnvironmentSettings() {
    return (
        <>
            <Ground />
            <MattText />
            <Sign />
        </>
    );
}
