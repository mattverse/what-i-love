import { OrbitControls } from '@react-three/drei'

import Text from './text.jsx'

export default function Experience() {
    return <>
        <OrbitControls makeDefault />
        <Text />
    </>
}

