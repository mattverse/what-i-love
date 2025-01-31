
import { useEffect, useRef, useMemo } from 'react';

// components
import Ground from './Environment/Ground';
import Grass from './Environment/Grass/Grass';
import MattText from './Environment/Text/MattText'


export default function Environment() {
    return (
        <>
            <Ground />
            <MattText />
        </>
    );
}
