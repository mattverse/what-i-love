export default function Lights() {
    return <>
        <directionalLight
            position={[4, 4, 1]}
            intensity={20}
        />
        <ambientLight intensity={1.5} />
    </>
}