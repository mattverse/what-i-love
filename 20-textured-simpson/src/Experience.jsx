
import { OrbitControls } from '@react-three/drei'
import Homer from './Homer'
import TextureEffect from './Texture'

export default function Experience() {
    return <>
        <OrbitControls />
        <Homer />
        <TextureEffect options={{}} textureUrl="blue-tile.png" />
    </>
}