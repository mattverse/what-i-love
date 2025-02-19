import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useState, useEffect } from 'react'


// components
import Ground from './Environment/Ground';
import Grass from './Environment/Grass/Grass';
import Trees from './Environment/Trees';
import MattText from './Environment/Text/MattText'
import Sign from './Environment/Sign';
import PathRocks from './Environment/Rocks/PathRocks';
import Osmosis from './WorkExperience/osmosis';
import Riiid from './WorkExperience/Riiid';
import Awake from './WorkExperience/Awake';

import { Computer } from './Portfolio/Computer';
import SingleSign from './Environment/SingleSign'
import PublicSpeaking from './Portfolio/PublicSpeaking'
import Dice from './Portfolio/Dice'
import Bio from './Bio';

export default function EnvironmentSettings({ characterRef, onSpacePressed }) {
    return (
        <>
            <Bio characterRef={characterRef} />
            <Ground />
            <Trees />
            <MattText />
            <Sign />
            <PathRocks />
            <group position={[2, 0, 0]}>
                <Osmosis />
                <Riiid />
                <Awake />
            </group>
            <Computer characterRef={characterRef} />
            <SingleSign />
            <PublicSpeaking />
            <Dice />
        </>
    );
}
