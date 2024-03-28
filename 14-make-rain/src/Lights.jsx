import { Environment } from '@react-three/drei'


export default function Lights() {
    return <>
        <Environment preset='park' />
        <ambientLight intensity={2} />

        <spotLight
            position={['4', '4', '4']}
            intensity={100}
            color={'#E5FCFF'}
            angle={Math.PI / 8}
        />
        <spotLight
            position={['1.5', '-0.3', '2']}
            intensity={800}
            power={60.0}
            color={'#FFA530'}
            angle={Math.PI / 4}
        />

    </>
}