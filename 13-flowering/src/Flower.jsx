import { useGLTF } from '@react-three/drei'

export default function Flower() {
    const flowerModel = useGLTF("/flower.glb");

    return <primitive
        object={flowerModel.scene}
        scale={0.029}
        rotation-y={Math.PI * 0.7}
        position-y={-1.7}
    ></primitive>
}
useGLTF.preload('./flower.glb')