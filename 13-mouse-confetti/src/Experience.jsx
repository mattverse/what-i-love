import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Rain from './Rain.jsx'

export default function () {
    return <>
        <OrbitControls makeDefault />
        <Lights />
        <Rain />
    </>
}

