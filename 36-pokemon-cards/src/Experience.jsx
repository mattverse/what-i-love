import { OrbitControls, Shape, Extrude } from "@react-three/drei";
import Lights from "./Lights.jsx";
import * as THREE from "three";

export default function Experience() {
  const width = 3.5;
  const height = 2.5;
  const radius = 0.2;
  const shape = new THREE.Shape()
    .moveTo(-width / 2, -height / 2 + radius)
    .lineTo(-width / 2, height / 2 - radius)
    .quadraticCurveTo(-width / 2, height / 2, -width / 2 + radius, height / 2)
    .lineTo(width / 2 - radius, height / 2)
    .quadraticCurveTo(width / 2, height / 2, width / 2, height / 2 - radius)
    .lineTo(width / 2, -height / 2 + radius)
    .quadraticCurveTo(width / 2, -height / 2, width / 2 - radius, -height / 2)
    .lineTo(-width / 2 + radius, -height / 2)
    .quadraticCurveTo(
      -width / 2,
      -height / 2,
      -width / 2,
      -height / 2 + radius
    );

  return (
    <>
      <OrbitControls makeDefault />

      <Lights />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <Extrude
          args={[
            shape,
            {
              depth: 0.05,
              bevelEnabled: false,
            },
          ]}
        >
          {/* Material with texture */}
          <meshStandardMaterial color="white" roughness={0.3} metalness={0.1} />
        </Extrude>
      </mesh>
    </>
  );
}
