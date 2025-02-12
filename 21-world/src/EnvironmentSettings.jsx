// components
import Ground from './Environment/Ground';
import Grass from './Environment/Grass/Grass';
import MattText from './Environment/Text/MattText'
import Sign from './Environment/Sign';
import PathRocks from './Environment/Rocks/PathRocks';
import Osmosis from './WorkExperience/osmosis';
import Riiid from './WorkExperience/Riiid';
import Awake from './WorkExperience/Awake';
import Arrow from './Portfolio/Arrow';

import { Computer } from './Portfolio/Computer';

export default function EnvironmentSettings({ showCards }) {
    return (
        <>
            <Ground />
            <MattText />
            <Sign />
            <PathRocks />
            <Osmosis />
            <Riiid />
            <Awake />
            <Computer showCards={showCards} />
            <Arrow />
        </>
    );
}
