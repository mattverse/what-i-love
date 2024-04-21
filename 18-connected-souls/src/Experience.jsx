import { OrbitControls, useFBO } from '@react-three/drei'
import Connector from './Connector'

export default function Experience() {
    return <>
        <OrbitControls makeDefault />
        <Connector />
    </>
}