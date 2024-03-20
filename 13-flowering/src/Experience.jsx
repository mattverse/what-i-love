import { useGLTF, PresentationControls, OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Flower from './Flower.jsx';

export default function () {
    return <>
        <OrbitControls makeDefault />
        <Lights />
        <Flower />
    </>
}

