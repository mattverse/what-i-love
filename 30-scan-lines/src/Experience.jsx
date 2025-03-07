import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'

import { Effect } from ''

export default function Experience() {
    return <>
        <OrbitControls makeDefault />
        <Lights />

    </>
}