import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useState, useEffect } from 'react'


// components
import Ground from './Environment/Ground';
import Grass from './Environment/Grass/Grass';
import MattText from './Environment/Text/MattText'
import Sign from './Environment/Sign';
import PathRocks from './Environment/Rocks/PathRocks';
import Osmosis from './WorkExperience/osmosis';
import Riiid from './WorkExperience/Riiid';
import Awake from './WorkExperience/Awake';
import { ArrowArea } from './Portfolio/ArrowArea';

import { Computer } from './Portfolio/Computer';
import PortfolioCards from './Portfolio/PortfolioCards';

export default function EnvironmentSettings({ characterRef, onSpacePressed }) {
    return (
        <>
            <Ground />
            <MattText />
            <Sign />
            <PathRocks />
            <Osmosis />
            <Riiid />
            <Awake />
            <Computer />
            <ArrowArea
                characterRef={characterRef}
                onSpacePressed={onSpacePressed}
            />
            {/* <PortfolioCards /> */}
        </>
    );
}
