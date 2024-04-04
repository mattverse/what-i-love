import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Cat from './Cat.jsx'

export default function Experience() {
    return <>
        <OrbitControls makeDefault />
        <Cat />
    </>
}