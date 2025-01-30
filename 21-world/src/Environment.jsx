
import { useEffect, useRef, useMemo } from 'react';

// components
import Ground from './Environment/Ground';
import Grass from './Environment/Grass/Grass';
import Matt from './Environment/Text/Matt'


export default function Environment() {
    return (
        <>
            <Ground />
            <Matt />
        </>
    );
}
